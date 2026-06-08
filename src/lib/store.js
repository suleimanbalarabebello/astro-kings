/* store.js — tiny reactive, localStorage-persisted app state.
   No backend exists, so this is our database. Single-threaded JS means a
   synchronous read-then-write is atomic — that's how we stop two reservations
   grabbing the same slot (see booking.js). */

import { useState, useEffect } from 'react';

const KEY = 'ak.state.v1';

/* Slots that look taken on first load, so the prototype isn't empty.
   Keyed pitch|day|time (mirrors the legacy TAKEN set from data.js). */
/* ongoing drop-in sessions players can pay to join when numbers are short */
function seedSessions(){
  return {
    s1: { id:'s1', pitchId:'classic', day:'Fri 06', time:'19:00', level:'mixed ability',  capacity:10, joined:4 },
    s2: { id:'s2', pitchId:'samba',   day:'Fri 06', time:'20:00', level:'casual 5s',      capacity:10, joined:8 },
    s3: { id:'s3', pitchId:'classic', day:'Sat 07', time:'11:00', level:'competitive',    capacity:12, joined:5 },
    s4: { id:'s4', pitchId:'big',     day:'Sun 08', time:'18:00', level:'9-a-side',       capacity:18, joined:16 },
  };
}

function seed(){
  const booked = {};
  ['18:00','19:30','20:30'].forEach(t => { booked[`classic|Fri 06|${t}`] = 'seed'; });
  return {
    currentUserId: null,
    users: {},        // id -> User
    bookings: {},     // id -> Booking
    booked,           // slotKey -> bookingId (confirmed occupancy)
    holds: {},        // slotKey -> { bookingId, expiresAt }
    sessions: seedSessions(),  // id -> ongoing session
    myJoins: {},      // sessionId -> true (sessions this browser has joined)
    seq: 1000,        // monotonic id source
  };
}

function load(){
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const s = JSON.parse(raw);
      if (!s.sessions) s.sessions = seedSessions();   // migrate older saved state
      if (!s.myJoins) s.myJoins = {};
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
