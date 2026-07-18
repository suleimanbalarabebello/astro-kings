/* store.js — tiny reactive, localStorage-persisted app state.
   No backend exists, so this is our database. Single-threaded JS means a
   synchronous read-then-write is atomic — that's how we stop two reservations
   grabbing the same slot (see booking.js). */

import { useState, useEffect } from 'react';
import { toKey, startOfToday, addDays } from './dates.js';

const KEY = 'ak.state.v2';   // bumped: availability now keyed by ISO day ('YYYY-MM-DD')

/* Slots that look taken on first load, so the prototype isn't empty.
   Keyed pitch|isoDay|time, seeded relative to today. */
function seed(){
  const t = startOfToday();
  const d0 = toKey(t), d1 = toKey(addDays(t,1));
  const booked = {};
  ['18:00','20:00'].forEach(time => { booked[`classic|${d0}|${time}`] = 'seed'; });
  ['12:00','13:00'].forEach(time => { booked[`samba|${d1}|${time}`] = 'seed'; });
  return {
    currentUserId: null,
    users: {},        // id -> User
    bookings: {},     // id -> Booking
    booked,           // slotKey -> bookingId (confirmed occupancy)
    holds: {},        // slotKey -> { bookingId, expiresAt }
    waitlist: {},     // slotKey -> [userId] waiting if it frees up
    seq: 1000,        // monotonic id source
  };
}

function load(){
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const s = JSON.parse(raw);
      if (!s.waitlist) s.waitlist = {};
      return s;
    }
  } catch (e) { /* no storage (tests / private mode) — fall through to seed */ }
  return seed();
}

let state = load();
const listeners = new Set();

function persist(){
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* ignore */ }
}

export function getState(){ return state; }

export function subscribe(fn){ listeners.add(fn); return () => listeners.delete(fn); }

/* Apply a synchronous mutation, persist, then notify subscribers. */
export function update(mutator){
  const result = mutator(state);
  persist();
  listeners.forEach(fn => fn());
  return result;
}

export function nextId(prefix){
  return update(s => { s.seq += 1; return `${prefix}${s.seq}`; });
}

/* Reset to a clean (or supplied) state — used by tests. */
export function resetState(next){
  state = next || seed();
  persist();
  listeners.forEach(fn => fn());
}

/* Subscribe a component to the store; re-renders on any change. */
export function useStore(selector = (s) => s){
  const [, force] = useState(0);
  useEffect(() => subscribe(() => force((v) => v + 1)), []);
  return selector(getState());
}

export const currentUser = () => {
  const s = getState();
  return s.currentUserId ? s.users[s.currentUserId] : null;
};
