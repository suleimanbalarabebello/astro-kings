/* Auth.jsx — login / sign up */

import { useState } from 'react';
import { I } from '../lib/icons.jsx';
import { go } from '../lib/router.js';
import { Logo, Glass, Btn, Field, Placeholder } from '../components/ui.jsx';

export function Auth(){
  const [mode,setMode] = useState('login');
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* visual side */}
      <div className="relative hidden items-end p-10 lg:flex">
        <Placeholder label="floodlit pitch · night" className="absolute inset-6 rounded-[34px]" />
        <div className="pointer-events-none absolute inset-6 rounded-[34px]" style={{background:'linear-gradient(to top, rgba(4,7,10,.9), transparent 55%)'}}></div>
        <div className="relative z-10 p-6">
          <Logo h={44} />
          <h2 className="hero-title mt-6 text-4xl font-semibold lowercase">play tonight,<br/>book in seconds</h2>
          <p className="mt-3 max-w-sm text-[14px] text-white/60">Save your team, split payments and never miss a floodlit slot.</p>
        </div>
      </div>

      {/* form side */}
      <div className="flex items-center justify-center px-6 py-28">
        <div className="w-full max-w-sm">
          <div className="lg:hidden"><Logo h={36} /></div>
          <Glass strong className="mt-6 rounded-[30px] p-7">
            <div className="glass glass-soft mb-6 flex gap-1 rounded-full p-1.5">
              {[['login','log in'],['signup','sign up']].map(([k,l])=>(
                <button key={k} onClick={()=>setMode(k)} className={`flex-1 rounded-full py-2 text-[13px] transition ${mode===k?'accent-bg text-[#0b0b0b]':'text-white/65 hover:text-white'}`}>{l}</button>
              ))}
            </div>

            {mode==='signup' ? (
              <Field label="full name" icon={I.user({})}><input className="w-full bg-transparent text-[14px] outline-none placeholder:text-white/35" placeholder="First & last" /></Field>
            ) : null}
            <div className={mode==='signup'?'mt-4':''}>
              <Field label="email" icon={I.user({})}><input className="w-full bg-transparent text-[14px] outline-none placeholder:text-white/35" placeholder="you@email.com" /></Field>
            </div>
            <div className="mt-4">
              <Field label="password" icon={I.lock({})}><input type="password" className="w-full bg-transparent text-[14px] outline-none placeholder:text-white/35" placeholder="••••••••" /></Field>
            </div>

            {mode==='login' ? <div className="mt-3 text-right text-[12px] text-white/45 hover:text-white"><a href="#login">forgot password?</a></div> : null}

            <Btn kind="primary" size="lg" className="mt-5 w-full" iconEnd={I.arrow({})} onClick={()=>go('dashboard')}>{mode==='login'?'log in':'create account'}</Btn>

            <div className="my-5 flex items-center gap-3 text-[12px] text-white/35"><span className="h-px flex-1 bg-white/10"></span>or<span className="h-px flex-1 bg-white/10"></span></div>
            <div className="grid grid-cols-2 gap-2.5">
              <Btn kind="glass" size="sm"> Apple</Btn>
              <Btn kind="glass" size="sm">G Google</Btn>
            </div>
          </Glass>
          <p className="mt-5 text-center text-[12px] text-white/40">By continuing you agree to the Astro Kings terms & privacy policy.</p>
        </div>
      </div>
    </div>
  );
}
