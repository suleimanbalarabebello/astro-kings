/* Enquiry.jsx — reusable contact/enquiry form with validation + success state.
   Used by About, Clubs and Events. (Production: POST to the owner's inbox/CRM.) */

import { useState } from 'react';
import { I } from '../lib/icons.jsx';
import { Btn, Field } from './ui.jsx';

const INPUT = 'w-full bg-transparent text-[14px] outline-none placeholder:text-white/35';

export function EnquiryForm({ cta = 'get in touch', placeholder = 'How can we help?', labels = true }){
  const [v,setV]   = useState({ name:'', phone:'', email:'', message:'' });
  const [err,setErr]   = useState('');
  const [done,setDone] = useState(false);
  const set = (k)=>(e)=>{ setV(s=>({...s,[k]:e.target.value})); setErr(''); };

  function submit(e){
    if (e) e.preventDefault();
    if (!v.name.trim() || !v.email.trim()) { setErr('Please add your name and email.'); return; }
    setDone(true);
  }

  if (done) return (
    <div className="py-6 text-center">
      <span className="mx-auto grid h-14 w-14 place-items-center rounded-full accent-bg text-white"><span style={{width:26,height:26}}>{I.check({})}</span></span>
      <div className="hero-title mt-4 text-xl font-semibold lowercase">enquiry sent</div>
      <p className="mx-auto mt-2 max-w-xs text-[13px] text-white/60">Thanks {v.name.split(' ')[0]} — we’ll be in touch shortly.</p>
    </div>
  );

  return (
    <form onSubmit={submit} className="grid gap-3.5">
      <div className="grid gap-3.5 sm:grid-cols-2">
        <Field label={labels?'your name':undefined} icon={I.user({})}><input value={v.name} onChange={set('name')} className={INPUT} placeholder="First & last" /></Field>
        <Field label={labels?'phone':undefined} icon={I.user({})}><input value={v.phone} onChange={set('phone')} className={INPUT} placeholder="07…" /></Field>
      </div>
      <Field label={labels?'email':undefined} icon={I.user({})}><input type="email" value={v.email} onChange={set('email')} className={INPUT} placeholder="you@email.com" /></Field>
      <label className="block">
        {labels ? <span className="mb-2 block text-[12px] uppercase tracking-wide text-white/45">message</span> : null}
        <textarea rows="3" value={v.message} onChange={set('message')} className="glass glass-soft w-full rounded-2xl px-4 py-3 text-[14px] outline-none placeholder:text-white/35" placeholder={placeholder}></textarea>
      </label>
      {err ? <div className="text-[13px] text-red-200">{err}</div> : null}
      <Btn kind="primary" size="lg" type="submit" className="w-full" iconEnd={I.arrow({})}>{cta}</Btn>
    </form>
  );
}
