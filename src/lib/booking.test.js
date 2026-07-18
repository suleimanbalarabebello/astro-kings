/* booking.test.js — availability logic + deposit calculation */

import { describe, it, expect, beforeEach } from 'vitest';
import { resetState, getState, update, currentUser } from './store.js';
import { PITCHES } from './data.js';
import {
  quote, canStart, startReservation, payReservation, releaseExpiredHolds,
  cancelBooking, extendBooking, signUp,
  prepayPolicy, joinWaitlist, confirmAttendance, markNoShow,
} from './booking.js';
import { DEPOSIT_PERCENT, NO_SHOW_FEE } from './config.js';
import { todayKey } from './dates.js';

const classic = PITCHES.find(p => p.id === 'classic');   // £60/hr
const DAY = '2099-06-15';   // a clean far-future day (never seeded)

beforeEach(() => { resetState(); signUp({ name: 'Test', email: 'a@b.com' }); });

describe('deposit calculation (20%, deducted from total)', () => {
  it('1 hour: 20% deposit, balance is the remainder', () => {
    const q = quote(classic, 1);
    expect(q.total).toBe(60);
    expect(q.depositDue).toBe(12);                 // 20% of 60
    expect(q.balanceDue).toBe(48);                 // deducted, not added
    expect(q.depositDue + q.balanceDue).toBe(q.total);
  });

  it('multi-hour recalculates total and deposit', () => {
    expect(quote(classic, 2).total).toBe(120);
    expect(quote(classic, 2).depositDue).toBe(24);
    expect(quote(classic, 3).total).toBe(180);
    expect(quote(classic, 3).depositDue).toBe(36);
  });

  it('includes add-ons and keeps deposit = round(20% of total)', () => {
    const q = quote(classic, 1, [{ t: 'Referee', p: 18 }]);
    expect(q.total).toBe(78);
    expect(q.depositDue).toBe(Math.round(78 * DEPOSIT_PERCENT));   // 16
    expect(q.depositDue + q.balanceDue).toBe(q.total);
  });
});

describe('availability (atomic holds + consecutive slots)', () => {
  it('a free slot can be reserved, then is no longer free', () => {
    expect(canStart('classic', DAY, '19:00', 1)).toBe(true);
    const r = startReservation({ pitchId: 'classic', day: DAY, startTime: '19:00', hours: 1, userId: currentUser().id });
    expect(r.ok).toBe(true);
    expect(canStart('classic', DAY, '19:00', 1)).toBe(false);
  });

  it('two reservations cannot grab the same slot', () => {
    const a = startReservation({ pitchId: 'classic', day: DAY, startTime: '20:00', hours: 1, userId: currentUser().id });
    const b = startReservation({ pitchId: 'classic', day: DAY, startTime: '20:00', hours: 1, userId: currentUser().id });
    expect(a.ok).toBe(true);
    expect(b.ok).toBe(false);
  });

  it('a multi-hour booking blocks every overlapping slot', () => {
    startReservation({ pitchId: 'classic', day: DAY, startTime: '19:00', hours: 2, userId: currentUser().id });
    expect(canStart('classic', DAY, '20:00', 1)).toBe(false);   // 20:00 is inside the 2h run
    expect(canStart('classic', DAY, '19:30', 1)).toBe(false);
    expect(canStart('classic', DAY, '21:00', 1)).toBe(true);    // after it ends → still free
  });

  it('a booking that would run past closing (22:00) is rejected', () => {
    expect(canStart('classic', DAY, '21:00', 2)).toBe(false);   // 21:00 + 2h = 23:00
  });

  it('seeded slots show as taken', () => {
    expect(canStart('classic', todayKey(), '18:00', 1)).toBe(false);
    expect(canStart('classic', todayKey(), '17:30', 1)).toBe(false);   // overlaps the 18:00 cell
  });

  it('an expired hold auto-releases the slot', () => {
    startReservation({ pitchId: 'classic', day: DAY, startTime: '19:00', hours: 1, userId: currentUser().id });
    expect(canStart('classic', DAY, '19:00', 1)).toBe(false);
    update((s) => { for (const h of Object.values(s.holds)) h.expiresAt = Date.now() - 1000; });
    releaseExpiredHolds();
    expect(canStart('classic', DAY, '19:00', 1)).toBe(true);
  });
});

describe('payment confirms the reservation', () => {
  it('paying a deposit confirms the booking and records the balance', () => {
    const r = startReservation({ pitchId: 'classic', day: DAY, startTime: '19:00', hours: 1, userId: currentUser().id });
    const paid = payReservation(r.booking.id, { mode: 'deposit', card: '4242424242424242' });
    expect(paid.ok).toBe(true);
    expect(paid.booking.status).toBe('confirmed');
    expect(paid.booking.amountPaid).toBe(12);
    expect(paid.booking.balanceDue).toBe(48);
  });

  it('paying in full leaves nothing on arrival', () => {
    const r = startReservation({ pitchId: 'classic', day: DAY, startTime: '19:00', hours: 1, userId: currentUser().id });
    const paid = payReservation(r.booking.id, { mode: 'full', card: '4242424242424242' });
    expect(paid.booking.amountPaid).toBe(60);
    expect(paid.booking.balanceDue).toBe(0);
  });

  it('a declined card does not confirm the booking', () => {
    const r = startReservation({ pitchId: 'classic', day: DAY, startTime: '19:00', hours: 1, userId: currentUser().id });
    const paid = payReservation(r.booking.id, { mode: 'deposit', card: '4000000000000002' });
    expect(paid.ok).toBe(false);
    expect(getState().bookings[r.booking.id].status).toBe('pending_deposit');
  });
});

describe('cancellation and extend', () => {
  it('venue cancellation refunds to account credit', () => {
    const r = startReservation({ pitchId: 'classic', day: DAY, startTime: '19:00', hours: 1, userId: currentUser().id });
    payReservation(r.booking.id, { mode: 'full', card: '4242424242424242' });
    const c = cancelBooking(r.booking.id, { byVenue: true });
    expect(c.refundCredit).toBe(60);
    expect(currentUser().accountCredit).toBe(60);
  });

  it('extend adds consecutive hours and re-prices', () => {
    const r = startReservation({ pitchId: 'classic', day: DAY, startTime: '19:00', hours: 1, userId: currentUser().id });
    payReservation(r.booking.id, { mode: 'full', card: '4242424242424242' });
    const e = extendBooking(r.booking.id, 1);
    expect(e.ok).toBe(true);
    expect(e.booking.hours).toBe(2);
    expect(e.booking.endTime).toBe('21:00');
    expect(e.booking.total).toBe(120);
  });

  it('escalating prepayment: deposit → full → full+fee with no-show history', () => {
    expect(prepayPolicy({ noShowCount: 0 }).requireFull).toBe(false);
    expect(prepayPolicy({ noShowCount: 1 }).requireFull).toBe(true);
    expect(prepayPolicy({ noShowCount: 1 }).fee).toBe(0);
    expect(prepayPolicy({ noShowCount: 2 }).fee).toBe(NO_SHOW_FEE);
  });

  it('a repeat offender’s no-show fee is folded into the total', () => {
    const r = startReservation({ pitchId: 'classic', day: DAY, startTime: '19:00', hours: 1, userId: currentUser().id, fee: NO_SHOW_FEE });
    expect(r.booking.total).toBe(60 + NO_SHOW_FEE);
    expect(r.booking.noShowFee).toBe(NO_SHOW_FEE);
  });

  it('markNoShow forfeits the slot and increments the user’s no-show count', () => {
    const r = startReservation({ pitchId: 'classic', day: DAY, startTime: '20:00', hours: 1, userId: currentUser().id });
    payReservation(r.booking.id, { mode: 'full', card: '4242424242424242' });
    markNoShow(r.booking.id);
    expect(getState().bookings[r.booking.id].status).toBe('no_show');
    expect(currentUser().noShowCount).toBe(1);
  });

  it('cancelling a waitlisted slot reports it was offered to the queue', () => {
    const r = startReservation({ pitchId: 'classic', day: DAY, startTime: '19:00', hours: 1, userId: currentUser().id });
    payReservation(r.booking.id, { mode: 'full', card: '4242424242424242' });
    joinWaitlist({ pitchId: 'classic', day: DAY, startTime: '19:00', hours: 1, userId: 'other' });
    expect(cancelBooking(r.booking.id, { byVenue: true }).waitlistOffered).toBe(1);
  });

  it('confirmAttendance flags the booking', () => {
    const r = startReservation({ pitchId: 'classic', day: DAY, startTime: '19:00', hours: 1, userId: currentUser().id });
    payReservation(r.booking.id, { mode: 'full', card: '4242424242424242' });
    confirmAttendance(r.booking.id);
    expect(getState().bookings[r.booking.id].attendanceConfirmed).toBe(true);
  });

  it('cannot extend beyond the 3-hour maximum', () => {
    const r = startReservation({ pitchId: 'classic', day: DAY, startTime: '18:00', hours: 3, userId: currentUser().id });
    payReservation(r.booking.id, { mode: 'full', card: '4242424242424242' });
    const e = extendBooking(r.booking.id, 1);
    expect(e.ok).toBe(false);
    expect(e.maxed).toBe(true);
  });

  it('extend is blocked when the next slot is taken', () => {
    const a = startReservation({ pitchId: 'classic', day: DAY, startTime: '19:00', hours: 1, userId: currentUser().id });
    payReservation(a.booking.id, { mode: 'full', card: '4242424242424242' });
    const b = startReservation({ pitchId: 'classic', day: DAY, startTime: '20:00', hours: 1, userId: currentUser().id });
    payReservation(b.booking.id, { mode: 'full', card: '4242424242424242' });
    const e = extendBooking(a.booking.id, 1);
    expect(e.ok).toBe(false);
  });
});
