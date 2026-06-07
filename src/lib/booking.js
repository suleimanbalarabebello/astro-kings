/* booking.js — the booking engine (client-side stand-in for the backend).

   Availability is tracked at 30-minute resolution so multi-hour bookings and
   overlapping start times are handled correctly. Every reserve/extend does a
   synchronous "check all cells free, then claim them" — which is atomic in a
   single-threaded browser, so two reservations can't grab the same slot. */

import { getState, update, nextId } from './store.js';
import { PITCHES } from './data.js';
import {
  DEPOSIT_PERCENT, HOLD_MINUTES, CANCEL_WINDOW_HRS, NO_SHOW_LIMIT,
  STUDENT_DOMAIN_RE, TEST_CARDS,
} from './config.js';

const pitchPrice = (pitchId) => (PITCHES.find((x) => x.id === pitchId) || PITCHES[0]).price;

const OPEN_MIN  = 8 * 60;   // 08:00
const CLOSE_MIN = 22 * 60;  // 22:00

/* ---------------------------------------------------------------- time utils */
export const toMin   = (t) => { const [h, m] = t.split(':').map(Number); return h * 60 + m; };
export const fromMin = (m) => String(Math.floor(m / 60)).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0');
export const endTimeOf = (start, hours) => fromMin(toMin(start) + hours * 60);
const slotKey = (pitchId, day, min) => `${pitchId}|${day}|${fromMin(min)}`;

/* every 30-min cell a [start, start+hours) booking occupies */
export function cellsFor(pitchId, day, start, hours){
  const s = toMin(start), e = s + hours * 60, keys = [];
  for (let m = s; m < e; m += 30) keys.push(slotKey(pitchId, day, m));
  return keys;
}

/* parse a 'Fri 06' day label into a ms timestamp (prototype base: June 2026) */
function startAtOf(day, start){
  const dd = Number((day.match(/\d+/) || ['6'])[0]);
  return new Date(2026, 5, dd, ...start.split(':').map(Number)).getTime();
}

/* ---------------------------------------------------------------- availability */
function holdActive(h){ return h && h.expiresAt > Date.now(); }

function cellFree(s, key, ignoreBookingId){
  if (s.booked[key] && s.booked[key] !== ignoreBookingId) return false;
  const h = s.holds[key];
  if (holdActive(h) && h.bookingId !== ignoreBookingId) return false;
  return true;
}

/* can an `hours`-long booking start at `start`? (cells free + inside opening hours) */
export function canStart(pitchId, day, start, hours, ignoreBookingId){
  const s = getState();
  const begin = toMin(start), end = begin + hours * 60;
  if (begin < OPEN_MIN || end > CLOSE_MIN) return false;
  return cellsFor(pitchId, day, start, hours).every((k) => cellFree(s, k, ignoreBookingId));
}

/* slot-picker helper: which SLOTS can start a booking of `hours` */
export function freeStarts(pitchId, day, slots, hours){
  return slots.filter((t) => canStart(pitchId, day, t, hours));
}

/* ---------------------------------------------------------------- pricing */
export function quote(pitch, hours, addons = []){
  const pitchTotal  = pitch.price * hours;
  const addonsTotal = addons.reduce((sum, a) => sum + a.p, 0);
  const total       = pitchTotal + addonsTotal;
  const depositDue  = Math.round(total * DEPOSIT_PERCENT);
  return { hours, pitchTotal, addonsTotal, total, depositDue, balanceDue: total - depositDue };
}

/* ---------------------------------------------------------------- students / users */
export const deriveStudent      = (email) => STUDENT_DOMAIN_RE.test((email || '').trim());
export const effectiveIsStudent = (u) => !u ? false : (u.isStudentOverride ?? u.isStudentDerived);
/* future rule — DEFINED, NOT ENFORCED: after NO_SHOW_LIMIT no-shows require full prepayment */
export const requiresFullPrepayment = (u) => !!u && u.noShowCount >= NO_SHOW_LIMIT;

export function signUp({ name, email }){
  const id = nextId('u');
  return update((s) => {
    s.users[id] = {
      id, name: name || 'Guest', email: email || '',
      isStudentDerived: deriveStudent(email),
      isStudentOverride: null,
      accountCredit: 0,
      noShowCount: 0,
    };
    s.currentUserId = id;
    return s.users[id];
  });
}

export function logIn(email){
  const s = getState();
  const found = Object.values(s.users).find((u) => u.email === email);
  if (found) { update((st) => { st.currentUserId = found.id; }); return found; }
  return signUp({ name: 'Captain', email });   // prototype: unknown email just creates an account
}

export const logOut = () => update((s) => { s.currentUserId = null; });

export function setStudentOverride(userId, value){
  return update((s) => { if (s.users[userId]) s.users[userId].isStudentOverride = value; });
}

/* ---------------------------------------------------------------- reservations */
export function releaseExpiredHolds(){
  update((s) => {
    const now = Date.now();
    for (const [key, h] of Object.entries(s.holds)){
      if (h.expiresAt <= now){
        delete s.holds[key];
        const b = s.bookings[h.bookingId];
        if (b && b.status === 'pending_deposit') b.status = 'cancelled';
      }
    }
  });
}

/* Atomically hold the slot(s) and create a pending_deposit booking. */
export function startReservation({ pitchId, day, startTime, hours, addons = [], userId }){
  releaseExpiredHolds();
  if (!canStart(pitchId, day, startTime, hours)) {
    return { ok: false, error: 'Those slots are no longer free. Pick another time or duration.' };
  }
  const q = quote({ price: pitchPrice(pitchId), id: pitchId }, hours, addons);
  const id = nextId('AK-');
  const booking = update((s) => {
    const expiresAt = Date.now() + HOLD_MINUTES * 60 * 1000;
    cellsFor(pitchId, day, startTime, hours).forEach((k) => { s.holds[k] = { bookingId: id, expiresAt }; });
    s.bookings[id] = {
      id, userId: userId || s.currentUserId, pitchId, day,
      startTime, hours, endTime: endTimeOf(startTime, hours),
      startAt: startAtOf(day, startTime),
      addons, ...q,
      amountPaid: 0, paymentMode: null,
      status: 'pending_deposit', holdExpiresAt: expiresAt,
      createdAt: Date.now(),
    };
    return s.bookings[id];
  });
  return { ok: true, booking };
}

/* Simulated Stripe charge. Returns {ok} | {ok:false,error}. */
function charge(card){
  const num = (card || '').replace(/\s/g, '');
  const known = TEST_CARDS[num];
  if (!num) return { ok: false, error: 'Enter your card details.' };
  if (known) return known;
  if (num.length < 12) return { ok: false, error: 'That card number looks incomplete.' };
  return { ok: true };   // any other well-formed test number succeeds
}

/* Pay a pending reservation — mode 'full' or 'deposit'. Confirms the booking. */
export function payReservation(bookingId, { mode = 'deposit', card } = {}){
  releaseExpiredHolds();
  const s = getState();
  const b = s.bookings[bookingId];
  if (!b) return { ok: false, error: 'Booking not found.' };
  if (b.status !== 'pending_deposit') return { ok: false, error: 'This reservation can no longer be paid.' };
  // hold expired between render and pay?
  const cells = cellsFor(b.pitchId, b.day, b.startTime, b.hours);
  const stillHeld = cells.every((k) => s.holds[k] && s.holds[k].bookingId === bookingId);
  if (!stillHeld) { releaseExpiredHolds(); return { ok: false, error: 'Your 15-minute hold expired — please start again.' }; }

  const res = charge(card);
  if (!res.ok) return { ok: false, error: res.error };

  update((st) => {
    const bk = st.bookings[bookingId];
    cells.forEach((k) => { delete st.holds[k]; st.booked[k] = bookingId; });  // hold → confirmed occupancy
    bk.paymentMode = mode;
    bk.amountPaid  = mode === 'full' ? bk.total : bk.depositDue;
    bk.balanceDue  = bk.total - bk.amountPaid;
    bk.status      = 'confirmed';
    bk.holdExpiresAt = null;
  });
  return { ok: true, booking: getState().bookings[bookingId] };
}

/* ---------------------------------------------------------------- cancel / no-show */
export function cancelBooking(bookingId, { byVenue = false } = {}){
  const s = getState();
  const b = s.bookings[bookingId];
  if (!b || ['cancelled', 'completed', 'no_show'].includes(b.status)) return { ok: false, error: 'Nothing to cancel.' };

  const hoursUntil = (b.startAt - Date.now()) / 3_600_000;
  let refundCredit = 0, outcome;
  if (byVenue){ refundCredit = b.amountPaid; outcome = 'venue_cancelled'; }      // full refund as credit
  else if (hoursUntil > CANCEL_WINDOW_HRS){ refundCredit = b.amountPaid; outcome = 'refunded_credit'; }  // >24h → credit
  else { refundCredit = 0; outcome = 'forfeited'; }                               // <24h → forfeit

  update((st) => {
    const bk = st.bookings[bookingId];
    cellsFor(bk.pitchId, bk.day, bk.startTime, bk.hours).forEach((k) => {
      if (st.booked[k] === bookingId) delete st.booked[k];
      if (st.holds[k] && st.holds[k].bookingId === bookingId) delete st.holds[k];
    });
    bk.status = 'cancelled';
    bk.cancelOutcome = outcome;
    if (refundCredit && bk.userId && st.users[bk.userId]) st.users[bk.userId].accountCredit += refundCredit;
  });
  return { ok: true, refundCredit, outcome };
}

export function markNoShow(bookingId){
  return update((s) => {
    const b = s.bookings[bookingId];
    if (!b) return { ok: false };
    b.status = 'no_show';                       // deposit forfeited (no refund)
    if (b.userId && s.users[b.userId]) s.users[b.userId].noShowCount += 1;
    cellsFor(b.pitchId, b.day, b.startTime, b.hours).forEach((k) => { if (s.booked[k] === bookingId) delete s.booked[k]; });
    return { ok: true };
  });
}

/* ---------------------------------------------------------------- extend */
export function extendBooking(bookingId, addHours, { card } = {}){
  const s = getState();
  const b = s.bookings[bookingId];
  if (!b || b.status !== 'confirmed') return { ok: false, error: 'Only confirmed bookings can be extended.' };

  // are the slots right after the current end free?
  const ok = canStart(b.pitchId, b.day, b.endTime, addHours, bookingId)
    && (toMin(b.endTime) + addHours * 60) <= CLOSE_MIN;
  if (!ok) return { ok: false, error: 'The next slot is already taken — can’t extend this booking.' };

  const addedCost = pitchPrice(b.pitchId) * addHours;
  // charge consistent with how the booking was paid: full → whole added cost now; deposit → 20% now
  const chargeNow = b.paymentMode === 'full' ? addedCost : Math.round(addedCost * DEPOSIT_PERCENT);
  const res = charge(card || '4242424242424242');   // assume the card on file for an existing booking
  if (!res.ok) return { ok: false, error: res.error };

  const updated = update((st) => {
    const bk = st.bookings[bookingId];
    cellsFor(bk.pitchId, bk.day, bk.endTime, addHours).forEach((k) => { st.booked[k] = bookingId; });
    bk.hours      += addHours;
    bk.endTime     = endTimeOf(bk.startTime, bk.hours);
    bk.pitchTotal += addedCost;
    bk.total      += addedCost;
    bk.depositDue  = Math.round(bk.total * DEPOSIT_PERCENT);
    bk.amountPaid += chargeNow;
    bk.balanceDue  = bk.total - bk.amountPaid;
    return bk;
  });
  return { ok: true, booking: updated, charged: chargeNow };
}

/* bookings for a given user, newest first */
export function bookingsFor(userId){
  return Object.values(getState().bookings)
    .filter((b) => b.userId === userId)
    .sort((a, b) => b.createdAt - a.createdAt);
}
