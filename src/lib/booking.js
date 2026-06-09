/* booking.js — the booking engine (client-side stand-in for the backend).

   Availability is tracked at 30-minute resolution so multi-hour bookings and
   overlapping start times are handled correctly. Every reserve/extend does a
   synchronous "check all cells free, then claim them" — which is atomic in a
   single-threaded browser, so two reservations can't grab the same slot. */

import { getState, update, nextId } from './store.js';
import { PITCHES } from './data.js';
import { fromKey } from './dates.js';
import {
  DEPOSIT_PERCENT, HOLD_MINUTES, CANCEL_WINDOW_HRS, NO_SHOW_LIMIT,
  STUDENT_DOMAIN_RE, TEST_CARDS, JOIN_SESSION_PRICE, LOW_ATTENDANCE,
  NO_SHOW_PREPAY_AT, NO_SHOW_FEE_AT, NO_SHOW_FEE, MAX_HOURS,
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

/* combine an ISO day-key + 'HH:MM' into a ms timestamp */
function startAtOf(dayKey, start){
  const d = fromKey(dayKey);
  const [h, m] = start.split(':').map(Number);
  d.setHours(h, m, 0, 0);
  return d.getTime();
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
/* Escalating no-show defence based on a user's no-show history:
   0 no-shows → normal (deposit allowed); >=1 → full prepayment; >=2 → full + a no-show fee. */
export function prepayPolicy(user){
  const n = (user && user.noShowCount) || 0;
  return {
    noShowCount: n,
    requireFull: n >= NO_SHOW_PREPAY_AT,
    fee: n >= NO_SHOW_FEE_AT ? NO_SHOW_FEE : 0,
  };
}
export const requiresFullPrepayment = (u) => prepayPolicy(u).requireFull;

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
export function startReservation({ pitchId, day, startTime, hours, addons = [], userId, fee = 0 }){
  releaseExpiredHolds();
  if (!canStart(pitchId, day, startTime, hours)) {
    return { ok: false, error: 'Those slots are no longer free. Pick another time or duration.' };
  }
  const q = quote({ price: pitchPrice(pitchId), id: pitchId }, hours, addons);
  if (fee) {                                   // repeat no-show surcharge folded into the total
    q.total += fee;
    q.depositDue = Math.round(q.total * DEPOSIT_PERCENT);
    q.balanceDue = q.total - q.depositDue;
  }
  const id = nextId('AK-');
  const booking = update((s) => {
    const expiresAt = Date.now() + HOLD_MINUTES * 60 * 1000;
    cellsFor(pitchId, day, startTime, hours).forEach((k) => { s.holds[k] = { bookingId: id, expiresAt }; });
    s.bookings[id] = {
      id, userId: userId || s.currentUserId, pitchId, day,
      startTime, hours, endTime: endTimeOf(startTime, hours),
      startAt: startAtOf(day, startTime),
      addons, noShowFee: fee, ...q,
      amountPaid: 0, paymentMode: null,
      status: 'pending_deposit', holdExpiresAt: expiresAt,
      attendanceConfirmed: false,
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

  const startKey = cellsFor(b.pitchId, b.day, b.startTime, b.hours)[0];
  const waitlistOffered = (getState().waitlist[startKey] || []).length;          // freed slot → offered to the queue

  update((st) => {
    const bk = st.bookings[bookingId];
    cellsFor(bk.pitchId, bk.day, bk.startTime, bk.hours).forEach((k) => {
      if (st.booked[k] === bookingId) delete st.booked[k];
      if (st.holds[k] && st.holds[k].bookingId === bookingId) delete st.holds[k];
    });
    bk.status = 'cancelled';
    bk.cancelOutcome = outcome;
    if (refundCredit && bk.userId && st.users[bk.userId]) st.users[bk.userId].accountCredit += refundCredit;
    if (st.waitlist[startKey]) delete st.waitlist[startKey];                      // queue notified, slot back on sale
  });
  return { ok: true, refundCredit, outcome, waitlistOffered };
}

export function markNoShow(bookingId){
  const s0 = getState();
  const b0 = s0.bookings[bookingId];
  const startKey = b0 ? cellsFor(b0.pitchId, b0.day, b0.startTime, b0.hours)[0] : null;
  const waitlistOffered = startKey ? (s0.waitlist[startKey] || []).length : 0;
  const res = update((s) => {
    const b = s.bookings[bookingId];
    if (!b) return { ok: false };
    b.status = 'no_show';                       // deposit forfeited (no refund)
    if (b.userId && s.users[b.userId]) s.users[b.userId].noShowCount += 1;
    cellsFor(b.pitchId, b.day, b.startTime, b.hours).forEach((k) => { if (s.booked[k] === bookingId) delete s.booked[k]; });
    if (startKey && s.waitlist[startKey]) delete s.waitlist[startKey];            // freed slot offered to the queue
    return { ok: true };
  });
  return { ...res, waitlistOffered };
}

/* ---------------------------------------------------------------- confirm-or-release + waitlist */
/* Customer confirms they'll attend (so the slot isn't released). */
export function confirmAttendance(bookingId){
  return update((s) => { const b = s.bookings[bookingId]; if (b) b.attendanceConfirmed = true; return { ok: !!b }; });
}

/* Join the waitlist for a slot that's currently taken/held. */
export function joinWaitlist({ pitchId, day, startTime, hours = 1, userId }){
  const startKey = cellsFor(pitchId, day, startTime, hours)[0];
  return update((s) => {
    const uid = userId || s.currentUserId || 'guest';
    if (!s.waitlist[startKey]) s.waitlist[startKey] = [];
    if (!s.waitlist[startKey].includes(uid)) s.waitlist[startKey].push(uid);
    return { ok: true, position: s.waitlist[startKey].length };
  });
}
export function waitlistCount(pitchId, day, startTime, hours = 1){
  const startKey = cellsFor(pitchId, day, startTime, hours)[0];
  return (getState().waitlist[startKey] || []).length;
}

/* ---------------------------------------------------------------- extend */
/* Price + availability for extending — no charge, no commit (drives the pay modal). */
export function extendQuote(bookingId, addHours){
  const b = getState().bookings[bookingId];
  if (!b || b.status !== 'confirmed') return { ok: false, error: 'Only confirmed bookings can be extended.' };
  if (b.hours + addHours > MAX_HOURS) return { ok: false, maxed: true, error: `You’ve reached the maximum of ${MAX_HOURS} hours — no more time can be added.` };
  const fits = canStart(b.pitchId, b.day, b.endTime, addHours, bookingId)
    && (toMin(b.endTime) + addHours * 60) <= CLOSE_MIN;
  if (!fits) return { ok: false, error: 'The next slot is already taken — can’t extend this booking.' };
  const addedCost = pitchPrice(b.pitchId) * addHours;
  const chargeNow = b.paymentMode === 'full' ? addedCost : Math.round(addedCost * DEPOSIT_PERCENT);
  return {
    ok: true, addHours, addedCost, chargeNow, paymentMode: b.paymentMode,
    fromEnd: b.endTime, newEndTime: endTimeOf(b.startTime, b.hours + addHours),
  };
}

export function extendBooking(bookingId, addHours, { card } = {}){
  const s = getState();
  const b = s.bookings[bookingId];
  if (!b || b.status !== 'confirmed') return { ok: false, error: 'Only confirmed bookings can be extended.' };
  if (b.hours + addHours > MAX_HOURS) return { ok: false, maxed: true, error: `You’ve reached the maximum of ${MAX_HOURS} hours — no more time can be added.` };

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

/* ---------------------------------------------------------------- join a session */
/* Ongoing sessions a player can pay to drop into, with derived attendance flags. */
export function sessionList(){
  const s = getState();
  return Object.values(s.sessions || {})
    .map((se) => {
      const spotsLeft = Math.max(0, se.capacity - se.joined);
      return {
        ...se,
        spotsLeft,
        fill: se.joined / se.capacity,
        isFull: spotsLeft === 0,
        isLow: se.joined / se.capacity < LOW_ATTENDANCE,   // short on players
        joinedByMe: !!s.myJoins[se.id],
      };
    })
    .sort((a, b) => a.day.localeCompare(b.day) || a.time.localeCompare(b.time));
}

/* Pay to join an ongoing session — simulated charge, then take the spot. */
export function joinSession(id, { card } = {}){
  const s = getState();
  const se = s.sessions[id];
  if (!se) return { ok: false, error: 'Session not found.' };
  if (s.myJoins[id]) return { ok: false, error: 'You’ve already joined this session.' };
  if (se.joined >= se.capacity) return { ok: false, error: 'This session is full.' };
  const res = charge(card || '4242424242424242');   // card on file (simulated)
  if (!res.ok) return { ok: false, error: res.error };
  update((st) => { st.sessions[id].joined += 1; st.myJoins[id] = true; });
  return { ok: true, charged: JOIN_SESSION_PRICE };
}

/* bookings for a given user, newest first */
export function bookingsFor(userId){
  return Object.values(getState().bookings)
    .filter((b) => b.userId === userId)
    .sort((a, b) => b.createdAt - a.createdAt);
}
