/* Booking.jsx — multi-step booking flow (slot → details → payment → done)
   Now backed by the booking engine: real availability, multi-hour duration,
   a 15-minute pending hold, and pay-in-full checkout. */

import { Fragment, useState, useEffect } from 'react';
import { I } from '../lib/icons.jsx';
import { PITCHES, slotsInBand, TIME_BANDS, PITCH_PHOTO, store } from '../lib/data.js';
import { go } from '../lib/router.js';
import { useStore, currentUser } from '../lib/store.js';
import {
  freeStarts, quote, endTimeOf, startReservation, payReservation,
  releaseExpiredHolds, signUp, deriveStudent, prepayPolicy, joinWaitlist,
} from '../lib/booking.js';
import { todayKey, keyLabel } from '../lib/dates.js';
import { HOLD_MINUTES, MAX_HOURS, CANCEL_WINDOW_HRS } from '../lib/config.js';
import { Glass, Btn, Eyebrow, Field } from '../components/ui.jsx';
import { Calendar } from '../components/Calendar.jsx';
import { StripeCard, stripeEnabled } from '../components/StripeCard.jsx';
import { Chip } from './Browse.jsx';

const isKey = (v) => /^\d{4}-\d{2}-\d{2}$/.test(v || '');

function Stepper({ step }){
  const steps = ['slot','details','payment','done'];
  return (
    <div className="flex items-center gap-2">
      {steps.map((s,i)=>(
        <Fragment key={s}>
          <div className={`flex items-center gap-2 ${i<=step?'text-white':'text-white/35'}`}>
            <span className={`grid h-7 w-7 place-items-center rounded-full text-[12px] tnum ${i<step?'accent-bg text-[#0b0b0b]':i===step?'border border-white/50':'border border-white/15'}`}>
              {i<step ? <span style={{width:14,height:14}}>{I.check({})}</span> : i+1}
            </span>
            <span className="hidden text-[13px] lowercase sm:block">{s}</span>
          </div>
          {i<steps.length-1 ? <span className={`h-px w-6 md:w-10 ${i<step?'accent-bg':'bg-white/15'}`}></span> : null}
        </Fragment>
      ))}
    </div>
  );
}

function Summary({ p, day, time, hours, q, fee=0 }){
  return (
    <Glass strong className="rounded-[28px] p-6">
      <div className="text-[12px] uppercase tracking-wide text-white/40">your booking</div>
      <div className="relative mt-4 aspect-[16/9] w-full overflow-hidden rounded-2xl">
        <img src={PITCH_PHOTO} alt={p.name} className="absolute inset-0 h-full w-full object-cover" />
        <span className="absolute bottom-2 left-3 text-[11px] uppercase tracking-wide text-white/70">{p.size} · 4g</span>
      </div>
      <div className="mt-4 text-[18px] font-medium">{p.name}</div>
      <div className="mt-3 space-y-2 text-[14px] text-white/70">
        <div className="flex items-center justify-between"><span className="flex items-center gap-2"><span className="text-white/40" style={{width:15,height:15}}>{I.cal({})}</span>{day}</span><span>{time}–{endTimeOf(time,hours)}</span></div>
        <div className="flex items-center justify-between"><span className="flex items-center gap-2"><span className="text-white/40" style={{width:15,height:15}}>{I.pin({})}</span>Wigman Rd</span><span>{p.size}</span></div>
      </div>
      <div className="mt-4 border-t border-white/10 pt-4 space-y-2 text-[14px]">
        <div className="flex justify-between text-white/65"><span>Pitch · {hours} hour{hours>1?'s':''}</span><span className="tnum">£{q.pitchTotal}</span></div>
        {q.addonsTotal>0 ? <div className="flex justify-between text-white/65"><span>Add-ons</span><span className="tnum">£{q.addonsTotal}</span></div> : null}
        {fee>0 ? <div className="flex justify-between text-white/65"><span>No-show fee</span><span className="tnum">£{fee}</span></div> : null}
        <div className="mt-2 flex justify-between border-t border-white/10 pt-3 text-[16px] font-semibold"><span>Total</span><span className="tnum accent-text">£{q.total}</span></div>
        <div className="mt-2 flex justify-between text-[13px] text-white/60"><span>Pay today</span><span className="tnum accent-text">£{q.total}</span></div>
      </div>
    </Glass>
  );
}

const ADDONS = [
  { t:'Bibs (set of 10)', p:5 },
  { t:'Match ball', p:3 },
  { t:'Referee', p:18 },
  { t:'Post-match café table', p:0 },
];
const DURATIONS = Array.from({length:MAX_HOURS}, (_,i)=>i+1);

export function Booking({ params }){
  useStore();                                  // re-render on availability changes
  const id = params.p || store.venue || 'classic';
  const p = PITCHES.find(x=>x.id===id) || PITCHES[0];

  const [step,setStep] = useState(0);
  const [time,setTime] = useState(params.t || store.time || '19:00');
  const [dayKey,setDayKey] = useState(isKey(store.day) ? store.day : todayKey());
  const [band,setBand] = useState('evening');
  const [hours,setHours] = useState(1);
  const [sel,setSel]   = useState([]);
  const [team,setTeam] = useState('');
  const [email,setEmail] = useState((currentUser()?.email) || '');
  const [card,setCard] = useState('');
  const [cardComplete,setCardComplete] = useState(false);
  const [err,setErr]   = useState('');
  const [reservation,setReservation] = useState(null);
  const [left,setLeft] = useState(HOLD_MINUTES*60);
  const [ref,setRef]   = useState('');
  const [msg,setMsg]   = useState('');

  const addons = ADDONS.filter(a=>sel.includes(a.t)&&a.p>0).map(a=>({t:a.t,p:a.p}));
  const user = currentUser();
  const policy = prepayPolicy(user);            // escalating no-show defence
  const fee = policy.fee;                       // repeat no-show surcharge
  const baseQ = quote(p, hours, addons);
  const q = { ...baseQ, total: baseQ.total + fee };   // pay-in-full only
  const dayLabel = keyLabel(dayKey);
  const bandSlots = slotsInBand(band);
  const starts = freeStarts(p.id, dayKey, bandSlots, hours);
  const isStudent = deriveStudent(email);

  // selected start may stop being valid when day/band/hours/pitch change
  useEffect(()=>{ if (!starts.includes(time) && starts.length) setTime(starts[0]); }, [dayKey, band, hours, p.id]); // eslint-disable-line

  // countdown while a hold is live on the payment step
  useEffect(()=>{
    if (step!==2 || !reservation) return;
    const tick = ()=>{
      const secs = Math.max(0, Math.round((reservation.holdExpiresAt - Date.now())/1000));
      setLeft(secs);
      if (secs===0){ releaseExpiredHolds(); setErr('Your 15-minute hold expired — please pick your slot again.'); setReservation(null); setStep(0); }
    };
    tick();
    const iv = setInterval(tick, 1000);
    return ()=> clearInterval(iv);
  }, [step, reservation]);

  const back = ()=> { setErr(''); setStep(s=>Math.max(0,s-1)); };

  function toDetails(){
    if (!starts.includes(time)) { setErr('That slot just went — pick another.'); return; }
    setErr(''); setStep(1);
  }

  function toPayment(){
    setErr('');
    // ensure there's a user to attach the booking to
    if (!currentUser()) signUp({ name: team || 'Captain', email });
    const res = startReservation({ pitchId:p.id, day:dayKey, startTime:time, hours, addons, userId: currentUser().id, fee });
    if (!res.ok){ setErr(res.error); return; }
    setReservation(res.booking);
    setLeft(HOLD_MINUTES*60);
    setStep(2);
  }

  function pay(){
    setErr('');
    if (stripeEnabled && !cardComplete){ setErr('Enter your card details.'); return; }
    const effectiveCard = stripeEnabled ? '4242424242424242' : card;   // charge is simulated (no backend)
    const res = payReservation(reservation.id, { mode: 'full', card: effectiveCard });
    if (!res.ok){ setErr(res.error); if (/expired/.test(res.error)){ setReservation(null); setStep(0); } return; }
    setRef(res.booking.id);
    store.venue = p.id;
    setStep(3);
  }

  const mins = String(Math.floor(left/60)).padStart(2,'0');
  const secs = String(left%60).padStart(2,'0');

  return (
    <div className="mx-auto max-w-6xl px-6 pt-28 pb-10 md:pt-32">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <Eyebrow>secure booking</Eyebrow>
          <h1 className="hero-title mt-3 text-4xl md:text-5xl font-semibold lowercase">book your pitch</h1>
        </div>
        <Stepper step={step} />
      </div>

      {err ? <div className="mt-6 rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-[13px] text-red-200">{err}</div> : null}
      {msg ? <div className="mt-4 rounded-2xl glass glass-soft px-4 py-3 text-[13px] accent-text">{msg}</div> : null}

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="min-h-[420px]">
          {step===0 && (
            <div className="pop space-y-7">
              <div className="grid gap-6 sm:grid-cols-[auto_1fr]">
                <div>
                  <div className="text-[12px] uppercase tracking-wide text-white/40">1 · pick a date</div>
                  <div className="mt-3 max-w-[300px]"><Calendar value={dayKey} onChange={setDayKey} /></div>
                </div>
                <div className="space-y-6">
                  <div>
                    <div className="text-[12px] uppercase tracking-wide text-white/40">2 · how long?</div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {DURATIONS.map(h=><Chip key={h} active={hours===h} onClick={()=>setHours(h)}>{h} hour{h>1?'s':''}</Chip>)}
                    </div>
                  </div>
                  <div>
                    <div className="text-[12px] uppercase tracking-wide text-white/40">3 · time of day</div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {Object.entries(TIME_BANDS).map(([k,b])=><Chip key={k} active={band===k} onClick={()=>setBand(k)}>{b.label}</Chip>)}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="text-[12px] uppercase tracking-wide text-white/40">4 · choose a kick-off · {dayLabel}</div>
                <div className="mt-3 grid grid-cols-3 gap-2.5 sm:grid-cols-5">
                  {bandSlots.map(s=>{
                    const free = starts.includes(s);
                    if (!free) return (
                      <button key={s} title="join the waitlist"
                        onClick={()=>{ const r=joinWaitlist({pitchId:p.id,day:dayKey,startTime:s,hours,userId:currentUser()?.id}); setMsg(`You're #${r.position} on the waitlist for ${s} on ${dayLabel} — we'll offer it the moment it frees up.`); }}
                        className="glass glass-soft tnum rounded-2xl py-3.5 text-[13px] text-white/30 line-through transition hover:text-white/70">
                        {s}
                      </button>
                    );
                    return (
                      <button key={s} onClick={()=>setTime(s)}
                        className={`tnum rounded-2xl py-3.5 text-[14px] transition ${time===s?'text-[#0b0b0b] accent-bg':'glass glass-soft text-white/85 hover:bg-white/12'}`}>
                        {s}
                      </button>
                    );
                  })}
                </div>
                <div className="mt-3 text-[12px] text-white/40">Taken slots are crossed out — tap one to join its waitlist. Ends {endTimeOf(time,hours)}.</div>
              </div>
              <div>
                <div className="text-[12px] uppercase tracking-wide text-white/40">5 · switch pitch (optional)</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {PITCHES.map(x=><Chip key={x.id} active={x.id===p.id} onClick={()=>{ store.venue=x.id; store.day=dayKey; go('booking',{p:x.id,t:time}); }}>{x.name} · £{x.price}</Chip>)}
                </div>
              </div>
            </div>
          )}

          {step===1 && (
            <div className="pop space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="team / booking name" icon={I.user({})}><input value={team} onChange={e=>setTeam(e.target.value)} className="w-full bg-transparent text-[14px] outline-none placeholder:text-white/35" placeholder="e.g. Sunday Allstars" /></Field>
                <Field label="email" icon={I.user({})}><input type="email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full bg-transparent text-[14px] outline-none placeholder:text-white/35" placeholder="you@uni.ac.uk" /></Field>
              </div>
              {isStudent ? <div className="flex items-center gap-1.5 text-[12px] accent-text"><span style={{width:14,height:14}}>{I.check({})}</span> student email recognised (.ac.uk)</div> : null}
              <div>
                <div className="text-[12px] uppercase tracking-wide text-white/40">add-ons</div>
                <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                  {ADDONS.map(a=>{
                    const on = sel.includes(a.t);
                    return (
                      <button key={a.t} onClick={()=>setSel(s=>on?s.filter(x=>x!==a.t):[...s,a.t])}
                        className={`flex items-center justify-between rounded-2xl border px-4 py-3.5 text-left transition ${on?'accent-ring border-transparent bg-white/5':'glass glass-soft border-transparent hover:bg-white/8'}`}>
                        <span className="text-[14px]">{a.t}</span>
                        <span className="flex items-center gap-3"><span className="tnum text-[13px] text-white/55">{a.p?('£'+a.p):'free'}</span>
                          <span className={`grid h-5 w-5 place-items-center rounded-md ${on?'accent-bg text-[#0b0b0b]':'border border-white/25'}`}>{on?<span style={{width:13,height:13}}>{I.check({})}</span>:null}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {step===2 && (
            <div className="pop space-y-6">
              <div className="flex items-center justify-between rounded-2xl glass glass-soft px-4 py-3 text-[13px]">
                <span className="text-white/60">slot held for you</span>
                <span className={`tnum font-semibold ${left<60?'text-red-300':'accent-text'}`}>{mins}:{secs}</span>
              </div>
              {fee>0 ? (
                <div className="rounded-2xl border border-amber-400/30 bg-amber-500/10 px-4 py-3 text-[12.5px] text-amber-200">
                  A £{fee} no-show fee has been added — our records show {policy.noShowCount} previous no-show{policy.noShowCount>1?'s':''}.
                </div>
              ) : null}

              {/* cancellation policy — visible before paying */}
              <div className="rounded-2xl glass glass-soft p-4 text-[12.5px] leading-relaxed text-white/60">
                <div className="mb-1.5 text-[11px] uppercase tracking-wide text-white/40">cancellation policy</div>
                <ul className="space-y-1">
                  <li>· Cancel more than {CANCEL_WINDOW_HRS}h before kick-off → refunded as account credit.</li>
                  <li>· Cancel within {CANCEL_WINDOW_HRS}h, or no-show → payment forfeited.</li>
                </ul>
              </div>
              {stripeEnabled ? (
                <div>
                  <div className="mb-2 block text-[12px] uppercase tracking-wide text-white/45">card details</div>
                  <StripeCard onChange={(complete)=>{ setCardComplete(complete); setErr(''); }} />
                </div>
              ) : (
                <>
                  <Field label="card number" icon={I.lock({})}><input value={card} onChange={e=>setCard(e.target.value)} className="w-full bg-transparent text-[14px] tnum outline-none placeholder:text-white/35" placeholder="4242 4242 4242 4242" /></Field>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="expiry" icon={I.cal({})}><input className="w-full bg-transparent text-[14px] tnum outline-none placeholder:text-white/35" placeholder="06 / 28" /></Field>
                    <Field label="cvc" icon={I.lock({})}><input className="w-full bg-transparent text-[14px] tnum outline-none placeholder:text-white/35" placeholder="•••" /></Field>
                  </div>
                </>
              )}
              <div className="flex items-center gap-2 text-[12px] text-white/45"><span style={{width:14,height:14}}>{I.lock({})}</span> test mode · Stripe test card 4242 4242 4242 4242 · free cancellation up to 24h before</div>
            </div>
          )}

          {step===3 && (
            <div className="pop">
              <Glass strong className="relative overflow-hidden rounded-[30px] p-8 text-center md:p-12">
                <div className="pointer-events-none absolute -inset-16 opacity-60" style={{background:'radial-gradient(40% 60% at 50% 0%, color-mix(in oklab, var(--accent), transparent 65%), transparent)'}}></div>
                <div className="relative">
                  <span className="mx-auto grid h-16 w-16 place-items-center rounded-full accent-bg text-[#0b0b0b]"><span style={{width:30,height:30}}>{I.check({})}</span></span>
                  <h2 className="hero-title mt-6 text-3xl md:text-4xl font-semibold lowercase">you're booked in</h2>
                  <p className="mx-auto mt-3 max-w-sm text-[14px] text-white/60">{p.name} · {dayLabel} · {time}–{endTimeOf(time,hours)}. £{q.total} paid in full.</p>
                  <div className="mx-auto mt-6 inline-flex items-center gap-3 glass rounded-2xl px-5 py-3 tnum text-[14px]">booking ref <span className="accent-text font-semibold">{ref}</span></div>
                  <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <a href="#home"><Btn kind="primary" iconEnd={I.arrow({})}>back home</Btn></a>
                    <button onClick={()=>{ setStep(0); setRef(''); setReservation(null); }} className="inline-flex"><Btn kind="outline">book another slot</Btn></button>
                  </div>
                </div>
              </Glass>
            </div>
          )}

        </div>

        <aside>
          <div className="space-y-4 lg:sticky lg:top-28">
            <Summary p={p} day={dayLabel} time={time} hours={hours} q={q} fee={fee} />
            {step<3 && (
              <div className="flex items-center justify-between gap-3">
                <button onClick={back} disabled={step===0} className={`inline-flex items-center gap-2 text-[14px] ${step===0?'text-white/25':'text-white/65 hover:text-white'}`}>
                  <span className="rotate-180" style={{width:16,height:16}}>{I.arrow({})}</span> back
                </button>
                <Btn kind="primary" size="lg" onClick={step===0?toDetails:step===1?toPayment:pay} iconEnd={I.arrow({})}>
                  {step===0?'continue':step===1?'go to payment':'pay £'+q.total}
                </Btn>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
