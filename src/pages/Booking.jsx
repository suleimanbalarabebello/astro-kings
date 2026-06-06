/* Booking.jsx — multi-step booking flow (slot → details → payment → done) */

import { Fragment, useState } from 'react';
import { I } from '../lib/icons.jsx';
import { PITCHES, SLOTS, TAKEN, store } from '../lib/data.js';
import { go } from '../lib/router.js';
import { Glass, Btn, Eyebrow, Field, Placeholder } from '../components/ui.jsx';
import { Chip } from './Browse.jsx';

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

function addHour(t){ const [h,m]=t.split(':').map(Number); return String(h+1).padStart(2,'0')+':'+String(m).padStart(2,'0'); }

function Summary({ p, time, addons, total }){
  return (
    <Glass strong className="rounded-[28px] p-6 lg:sticky lg:top-28">
      <div className="text-[12px] uppercase tracking-wide text-white/40">your booking</div>
      <Placeholder label={p.size+' · 4g'} className="mt-4 aspect-[16/9] w-full rounded-2xl" />
      <div className="mt-4 text-[18px] font-medium">{p.name}</div>
      <div className="mt-3 space-y-2 text-[14px] text-white/70">
        <div className="flex items-center justify-between"><span className="flex items-center gap-2"><span className="text-white/40" style={{width:15,height:15}}>{I.cal({})}</span>Fri 06 Jun</span><span>{time}–{addHour(time)}</span></div>
        <div className="flex items-center justify-between"><span className="flex items-center gap-2"><span className="text-white/40" style={{width:15,height:15}}>{I.pin({})}</span>Wigman Rd</span><span>{p.size}</span></div>
      </div>
      <div className="mt-4 border-t border-white/10 pt-4 space-y-2 text-[14px]">
        <div className="flex justify-between text-white/65"><span>Pitch · 1 hour</span><span className="tnum">£{p.price}</span></div>
        {addons.map(a=><div key={a.t} className="flex justify-between text-white/65"><span>{a.t}</span><span className="tnum">£{a.p}</span></div>)}
        <div className="mt-2 flex justify-between border-t border-white/10 pt-3 text-[16px] font-semibold"><span>Total</span><span className="tnum accent-text">£{total}</span></div>
      </div>
      <div className="mt-4 flex items-center gap-2 text-[12px] text-white/45"><span className="accent-text" style={{width:14,height:14}}>{I.check({})}</span> split payment available with your team</div>
    </Glass>
  );
}

const ADDONS = [
  { t:'Bibs (set of 10)', p:5 },
  { t:'Match ball', p:3 },
  { t:'Referee', p:18 },
  { t:'Post-match café table', p:0 },
];

export function Booking({ params }){
  const id = params.p || store.venue || 'classic';
  const p = PITCHES.find(x=>x.id===id) || PITCHES[0];
  const [step,setStep] = useState(0);
  const [time,setTime] = useState(params.t || store.time || '19:00');
  const [day,setDay] = useState('Fri 06');
  const [sel,setSel] = useState([]);
  const addons = ADDONS.filter(a=>sel.includes(a.t)&&a.p>0).map(a=>({t:a.t,p:a.p}));
  const total = p.price + addons.reduce((s,a)=>s+a.p,0);
  const next = ()=> setStep(s=>Math.min(3,s+1));
  const back = ()=> setStep(s=>Math.max(0,s-1));

  const days = ['Thu 05','Fri 06','Sat 07','Sun 08','Mon 09'];

  return (
    <div className="mx-auto max-w-6xl px-6 pt-28 pb-10 md:pt-32">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <Eyebrow>secure booking</Eyebrow>
          <h1 className="hero-title mt-3 text-4xl md:text-5xl font-semibold lowercase">book your pitch</h1>
        </div>
        <Stepper step={step} />
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="min-h-[420px]">
          {step===0 && (
            <div className="pop space-y-7">
              <div>
                <div className="text-[12px] uppercase tracking-wide text-white/40">1 · choose a day</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {days.map(d=><Chip key={d} active={day===d} onClick={()=>setDay(d)}>{d}</Chip>)}
                </div>
              </div>
              <div>
                <div className="text-[12px] uppercase tracking-wide text-white/40">2 · choose a kick-off</div>
                <div className="mt-3 grid grid-cols-3 gap-2.5 sm:grid-cols-5">
                  {SLOTS.map(s=>{
                    const taken = TAKEN.has(s);
                    const off = Number(s.split(':')[0])<18;
                    return (
                      <button key={s} disabled={taken} onClick={()=>setTime(s)}
                        className={`relative tnum rounded-2xl py-3.5 text-[14px] transition ${taken?'cursor-not-allowed text-white/25 line-through':time===s?'text-[#0b0b0b] accent-bg':'glass glass-soft text-white/85 hover:bg-white/12'}`}>
                        {s}
                        {off && !taken ? <span className={`absolute -top-1.5 right-2 text-[9px] ${time===s?'text-[#0b0b0b]':'accent-text'}`}>−20%</span> : null}
                      </button>
                    );
                  })}
                </div>
                <div className="mt-3 text-[12px] text-white/40">Before 6pm slots are off-peak. Greyed slots are taken.</div>
              </div>
              <div>
                <div className="text-[12px] uppercase tracking-wide text-white/40">3 · switch pitch (optional)</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {PITCHES.map(x=><Chip key={x.id} active={x.id===p.id} onClick={()=>{ store.venue=x.id; go('booking',{p:x.id,t:time}); }}>{x.name} · £{x.price}</Chip>)}
                </div>
              </div>
            </div>
          )}

          {step===1 && (
            <div className="pop space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="team / booking name" icon={I.user({})}><input className="w-full bg-transparent text-[14px] outline-none placeholder:text-white/35" placeholder="e.g. Sunday Allstars" /></Field>
                <Field label="mobile" icon={I.user({})}><input className="w-full bg-transparent text-[14px] outline-none placeholder:text-white/35" placeholder="07…" /></Field>
              </div>
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
              <Glass className="flex items-center gap-3 rounded-2xl p-4 text-[13px] text-white/65">
                <span className="accent-text" style={{width:18,height:18}}>{I.bolt({})}</span>
                Want to split the cost? Invite teammates after booking and everyone pays their share — no more chasing.
              </Glass>
            </div>
          )}

          {step===2 && (
            <div className="pop space-y-6">
              <div className="flex gap-2.5">
                <button className="accent-ring flex-1 rounded-2xl bg-white/5 p-4 text-left"><div className="text-[13px]">Card</div><div className="mt-1 text-[12px] text-white/45">Visa · Mastercard · Apple Pay</div></button>
                <button className="glass glass-soft flex-1 rounded-2xl p-4 text-left hover:bg-white/8"><div className="text-[13px]">Pay at venue</div><div className="mt-1 text-[12px] text-white/45">£10 deposit now</div></button>
              </div>
              <Field label="card number" icon={I.lock({})}><input className="w-full bg-transparent text-[14px] tnum outline-none placeholder:text-white/35" placeholder="4242 4242 4242 4242" /></Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="expiry" icon={I.cal({})}><input className="w-full bg-transparent text-[14px] tnum outline-none placeholder:text-white/35" placeholder="06 / 28" /></Field>
                <Field label="cvc" icon={I.lock({})}><input className="w-full bg-transparent text-[14px] tnum outline-none placeholder:text-white/35" placeholder="•••" /></Field>
              </div>
              <div className="flex items-center gap-2 text-[12px] text-white/45"><span style={{width:14,height:14}}>{I.lock({})}</span> payments encrypted · free cancellation up to 24h before kick-off</div>
            </div>
          )}

          {step===3 && (
            <div className="pop">
              <Glass strong className="relative overflow-hidden rounded-[30px] p-8 text-center md:p-12">
                <div className="pointer-events-none absolute -inset-16 opacity-60" style={{background:'radial-gradient(40% 60% at 50% 0%, color-mix(in oklab, var(--accent), transparent 65%), transparent)'}}></div>
                <div className="relative">
                  <span className="mx-auto grid h-16 w-16 place-items-center rounded-full accent-bg text-[#0b0b0b]"><span style={{width:30,height:30}}>{I.check({})}</span></span>
                  <h2 className="hero-title mt-6 text-3xl md:text-4xl font-semibold lowercase">you're booked in</h2>
                  <p className="mx-auto mt-3 max-w-sm text-[14px] text-white/60">{p.name} · {day} · {time}–{addHour(time)}. We've texted your confirmation and the floodlights will be on.</p>
                  <div className="mx-auto mt-6 inline-flex items-center gap-3 glass rounded-2xl px-5 py-3 tnum text-[14px]">booking ref <span className="accent-text font-semibold">AK-7F3K2</span></div>
                  <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <a href="#dashboard"><Btn kind="primary" iconEnd={I.arrow({})}>view my bookings</Btn></a>
                    <a href="#home"><Btn kind="outline">back home</Btn></a>
                  </div>
                </div>
              </Glass>
            </div>
          )}

          {step<3 && (
            <div className="mt-9 flex items-center justify-between">
              <button onClick={back} disabled={step===0} className={`inline-flex items-center gap-2 text-[14px] ${step===0?'text-white/25':'text-white/65 hover:text-white'}`}>
                <span className="rotate-180" style={{width:16,height:16}}>{I.arrow({})}</span> back
              </button>
              <Btn kind="primary" size="lg" onClick={next} iconEnd={I.arrow({})}>
                {step===0?'continue':step===1?'go to payment':'pay £'+total}
              </Btn>
            </div>
          )}
        </div>

        <aside><Summary p={p} time={time} addons={addons} total={total} /></aside>
      </div>
    </div>
  );
}
