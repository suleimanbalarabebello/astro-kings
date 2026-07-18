/* GetAGame.jsx — subs bench: register to be invited to games that need a sub.
   Mirrors the live Astro Kings "Get a Game" page (hero → register → location). */

import { useState } from 'react';
import { I } from '../lib/icons.jsx';
import { CONTACT, GETAGAME_VIDEO } from '../lib/data.js';
import { Glass, Btn, Field, Placeholder } from '../components/ui.jsx';
import { Turnstile } from '../components/Turnstile.jsx';
import { Map } from '../components/Map.jsx';
import { Footer } from '../components/Nav.jsx';

const DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday','Weekends'];

function Check({ on, onClick, children }){
  return (
    <button type="button" onClick={onClick} className="flex items-center gap-2.5 text-[14px] text-white/80">
      <span className={`grid h-5 w-5 place-items-center rounded-md transition ${on?'accent-bg text-[#0b0b0b]':'border border-white/25'}`}>
        {on ? <span style={{width:13,height:13}}>{I.check({})}</span> : null}
      </span>
      {children}
    </button>
  );
}

export function GetAGame(){
  const [f,setF] = useState({ name:'', email:'', phone:'', age:'' });
  const [days,setDays] = useState([]);
  const [confirm,setConfirm] = useState(false);
  const [token,setToken] = useState('');
  const [err,setErr] = useState('');
  const [done,setDone] = useState(false);
  const set = (k)=>(e)=>{ setF(s=>({...s,[k]:e.target.value})); setErr(''); };
  const toggleDay = (d)=> setDays(s=> s.includes(d)?s.filter(x=>x!==d):[...s,d]);

  function submit(){
    if (!f.name.trim() || !f.email.trim() || !f.phone.trim()) { setErr('Please add your name, email and contact number.'); return; }
    if (!token) { setErr('Please complete the captcha to verify you’re human.'); return; }
    if (!confirm) { setErr('Please confirm you’re happy to join the Subs Bench WhatsApp group.'); return; }
    setDone(true);   // production: POST the form + Turnstile token to the backend for /siteverify
  }

  return (
    <div>
      {/* ---------- hero ---------- */}
      <section className="relative overflow-hidden">
        {/* video background */}
        <video className="absolute inset-0 h-full w-full object-cover" autoPlay loop muted playsInline preload="metadata">
          <source src={GETAGAME_VIDEO} type="video/mp4" />
        </video>
        <div className="pointer-events-none absolute inset-0" style={{background:'linear-gradient(180deg, rgba(4,7,10,.55), rgba(4,7,10,.82))'}}></div>

        <div className="relative z-10 mx-auto max-w-5xl px-6 pt-40 pb-24 text-center md:pt-48 md:pb-28">
          <h1 className="hero-title text-5xl font-semibold leading-[1.05] lowercase md:text-7xl">
            social kicks —<br/>get a game tonight
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-white/75">Casual pick-up football. Join the WhatsApp group, get invited when a game needs players, turn up and play.</p>
          {/* TODO: replace with the real Social Kicks WhatsApp invite link */}
          <a href="https://chat.whatsapp.com/" target="_blank" rel="noreferrer" className="mt-6 inline-block">
            <Btn kind="primary" iconEnd={I.arrow({})}>join the whatsapp group</Btn>
          </a>
        </div>
        {/* coral banner divider with the downward notch, mirroring the live site */}
        <div className="relative z-10 accent-bg py-5">
          <div className="mx-auto max-w-6xl px-6 text-center text-[13px] font-medium uppercase tracking-[.2em] text-[#0b0b0b]/80">
            all standards welcome · no team needed
          </div>
          <div className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 border-x-[18px] border-x-transparent border-t-[16px]" style={{borderTopColor:'var(--accent)'}}></div>
        </div>
      </section>

      {/* ---------- register ---------- */}
      <section className="mx-auto mt-20 max-w-6xl px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_440px]">
          {/* concept copy */}
          <div className="max-w-xl">
            <h2 className="hero-title text-3xl font-semibold lowercase md:text-4xl">register here to get invites to football games</h2>
            <p className="mt-5 text-[15px] leading-relaxed text-white/60">
              If you’re always ready to play and looking for a bit more football during the week, register here to get
              notifications and invites to matches where our regular bookings are a couple of players short.
            </p>

            <h3 className="mt-9 text-[19px] font-medium lowercase">the subs bench concept</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-white/60">
              Sometimes players drop out at the last minute or can’t make their usual games. So rather than everybody
              missing out, you can be the super sub by joining their game. All standards are welcome — just register your
              interest using the form, let us know the days you’re available, and you’ll get an invite to join our Subs
              Bench WhatsApp group.
            </p>

            <h3 className="mt-9 text-[19px] font-medium lowercase">who’s on the bench?</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-white/60">
              There’s lots of reasons somebody would want to be on the bench. They might be new to the area, want a bit of
              extra exercise, or just fancy a run out any given day. Plus it’s a great way to make friends and have a bit of fun.
            </p>

            <p className="mt-8 text-[16px] font-semibold text-white">
              And you’ll be playing at Astro Kings, Nottingham’s best 5-a-side football centre!
            </p>
          </div>

          {/* form */}
          <Glass strong className="h-fit rounded-[30px] p-7 lg:sticky lg:top-28">
            {done ? (
              <div className="py-8 text-center">
                <span className="mx-auto grid h-16 w-16 place-items-center rounded-full accent-bg text-[#0b0b0b]"><span style={{width:30,height:30}}>{I.check({})}</span></span>
                <h3 className="hero-title mt-5 text-2xl font-semibold lowercase">you’re on the bench</h3>
                <p className="mx-auto mt-3 max-w-xs text-[14px] text-white/60">Thanks {f.name.split(' ')[0]}! We’ll add you to the Subs Bench WhatsApp group and ping you when a game needs a sub.</p>
                <Btn kind="outline" className="mt-6" onClick={()=>{ setDone(false); setF({name:'',email:'',phone:'',age:''}); setDays([]); setConfirm(false); }}>register someone else</Btn>
              </div>
            ) : (
              <>
                <div className="text-[13px] font-medium uppercase tracking-wide text-white/70">register your details</div>

                {/* real Cloudflare Turnstile captcha */}
                <div className="mt-4">
                  <Turnstile onVerify={(t)=>{setToken(t);setErr('');}} onExpire={()=>setToken('')} />
                </div>

                {err ? <div className="mt-4 rounded-xl border border-red-400/30 bg-red-500/10 px-3 py-2 text-[13px] text-red-200">{err}</div> : null}

                <div className="mt-4 space-y-3.5">
                  <Field label="name" icon={I.user({})}><input value={f.name} onChange={set('name')} className="w-full bg-transparent text-[14px] outline-none placeholder:text-white/35" placeholder="First & last" /></Field>
                  <Field label="email" icon={I.user({})}><input type="email" value={f.email} onChange={set('email')} className="w-full bg-transparent text-[14px] outline-none placeholder:text-white/35" placeholder="you@email.com" /></Field>
                  <Field label="contact number" icon={I.user({})}><input value={f.phone} onChange={set('phone')} className="w-full bg-transparent text-[14px] tnum outline-none placeholder:text-white/35" placeholder="07…" /></Field>
                  <Field label="age" icon={I.user({})}><input value={f.age} onChange={set('age')} className="w-full bg-transparent text-[14px] tnum outline-none placeholder:text-white/35" placeholder="18" /></Field>
                </div>

                <div className="mt-5">
                  <div className="text-[12px] uppercase tracking-wide text-white/45">which days can you play?</div>
                  <div className="mt-3 grid grid-cols-2 gap-2.5">
                    {DAYS.map(d=><Check key={d} on={days.includes(d)} onClick={()=>toggleDay(d)}>{d}</Check>)}
                  </div>
                </div>

                <div className="mt-5">
                  <Check on={confirm} onClick={()=>{setConfirm(c=>!c);setErr('');}}>
                    <span className="text-[13px] leading-snug text-white/70">I confirm I’m happy to be added to the Subs Bench WhatsApp group to find out when games are available.</span>
                  </Check>
                </div>

                <Btn kind="primary" size="lg" className="mt-6 w-full" iconEnd={I.arrow({})} onClick={submit}>get on the bench</Btn>
              </>
            )}
          </Glass>
        </div>
      </section>

      {/* ---------- location ---------- */}
      <section className="mx-auto mt-24 max-w-3xl px-6 text-center">
        <h2 className="hero-title text-3xl font-semibold lowercase md:text-4xl">our location</h2>
        <p className="mt-5 text-[15px] leading-relaxed text-white/60">
          Astro Kings 5-a-side football centre is located next to the Harvey Hadden Sports Village in Nottingham, NG8.
          The ground is easily accessible from the M1 Junction 26 — it’s just 4 minutes from the motorway to the pitches.
        </p>
        <p className="mt-3 text-[15px] text-white/60">Contact us on <span className="accent-text">{CONTACT.phone}</span> for more information.</p>
      </section>
      <div className="mx-auto mt-10 max-w-6xl px-6">
        <div className="aspect-[21/9] w-full overflow-hidden rounded-[30px] glass">
          <Map className="h-full w-full" />
        </div>
      </div>

      <Footer />
    </div>
  );
}
