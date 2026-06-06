/* Nav.jsx — floating liquid-glass navbar + footer */

import { useState, useEffect } from 'react';
import { I } from '../lib/icons.jsx';
import { CONTACT } from '../lib/data.js';
import { useRoute } from '../lib/router.js';
import { Logo, Glass, Btn } from './ui.jsx';

/* desktop pill — mirrors the live site's top-level menu */
export const NAV_LINKS = [
  { id:'browse',   label:'find a pitch' },
  { id:'getagame', label:'get a game' },
  { id:'juniors',  label:'juniors', children:[
      { id:'kingsclub', label:'u18s kings club' },
      { id:'academy',   label:'holiday camps' },
      { id:'juniors',   label:'pay and play' },
  ] },
  { id:'events',   label:'events', children:[
      { id:'events',  label:'corporate events' },
      { id:'manvfat', label:'man v fat' },
  ] },
  { id:'clubs',    label:'clubs' },
  { id:'about',    label:'about' },
];

/* full link set for footer + mobile sheet */
export const ALL_LINKS = [
  { id:'browse',   label:'find a pitch' },
  { id:'pricing',  label:'pricing' },
  { id:'leagues',  label:'leagues' },
  { id:'getagame', label:'get a game' },
  { id:'juniors',  label:'juniors' },
  { id:'parties',  label:'kids parties' },
  { id:'academy',  label:'academy' },
  { id:'events',   label:'events' },
  { id:'manvfat',  label:'man v fat' },
  { id:'clubs',    label:'clubs' },
  { id:'about',    label:'about' },
];

/* desktop nav item — plain link, or a hover dropdown when it has children */
function NavItem({ l, name }){
  const active = name===l.id || (l.children && l.children.some(c=>c.id===name));
  if (!l.children) {
    return (
      <a href={'#'+l.id}
         className={`rounded-full px-4 py-2 text-[13.5px] transition-colors ${name===l.id?'text-[#0b0b0b] accent-bg':'text-white/70 hover:text-white hover:bg-white/8'}`}>
        {l.label}
      </a>
    );
  }
  return (
    <div className="group relative">
      <a href={'#'+l.id}
         className={`flex items-center gap-1 rounded-full px-4 py-2 text-[13.5px] transition-colors ${active?'text-[#0b0b0b] accent-bg':'text-white/70 hover:text-white hover:bg-white/8'}`}>
        {l.label}<span className="opacity-60 transition group-hover:rotate-180" style={{width:13,height:13}}>{I.chevd({})}</span>
      </a>
      {/* pt-2 keeps the hover bridge contiguous so the menu doesn't flicker */}
      <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 translate-y-1 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
        <Glass strong className="min-w-[220px] overflow-hidden rounded-2xl p-1.5">
          {l.children.map(c=>(
            <a key={c.id} href={'#'+c.id}
               className={`nav-drop-item flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13.5px] transition-colors ${name===c.id?'accent-text':'text-white/80'} hover:bg-white/8`}>
              <span className="nav-ball accent-text" style={{width:15,height:15}}>{I.ball({})}</span>
              <span className="flex-1">{c.label}</span>
              <span className="nav-go accent-text" style={{width:15,height:15}}>{I.arrow({})}</span>
            </a>
          ))}
        </Glass>
      </div>
    </div>
  );
}

export function TopNav(){
  const { name } = useRoute();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(()=>{
    const on = ()=> setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', on); on();
    return ()=> window.removeEventListener('scroll', on);
  },[]);
  useEffect(()=>{ setOpen(false); },[name]);

  return (
    <nav className="fixed inset-x-0 top-0 z-40 px-4 pt-4 md:px-7 md:pt-6">
      <div className={`mx-auto flex max-w-7xl items-center justify-between gap-3 transition-all duration-300 ${scrolled?'scale-[.99]':''}`}>
        {/* left — brand pill */}
        <a href="#home" className="glass glass-soft group flex items-center gap-2.5 rounded-full py-2.5 pl-3 pr-5 transition hover:bg-white/10">
          <Logo h={26} className="transition group-hover:scale-105" />
        </a>

        {/* center — links pill */}
        <div className="glass glass-soft hidden items-center gap-1 rounded-full p-1.5 lg:flex">
          {NAV_LINKS.map(l=>(<NavItem key={l.id} l={l} name={name} />))}
        </div>

        {/* right — actions */}
        <div className="flex items-center gap-2">
          <a href="#login" className="glass glass-soft hidden h-11 w-11 place-items-center rounded-full text-white/80 transition hover:bg-white/10 md:grid">
            <span style={{width:19,height:19}}>{I.user({})}</span>
          </a>
          <a href="#booking" className="hidden md:block">
            <Btn kind="primary" size="md" iconEnd={I.arrow({})}>pitch hire</Btn>
          </a>
          <button onClick={()=>setOpen(o=>!o)} className="glass glass-soft grid h-11 w-11 place-items-center rounded-full text-white lg:hidden">
            <span style={{width:20,height:20}}>{(open?I.x:I.menu)({})}</span>
          </button>
        </div>
      </div>

      {/* mobile sheet */}
      {open ? (
        <div className="pop mx-auto mt-3 max-w-7xl lg:hidden">
          <Glass strong className="overflow-hidden rounded-3xl p-2">
            {ALL_LINKS.concat([{id:'login',label:'log in'},{id:'dashboard',label:'my bookings'}]).map(l=>(
              <a key={l.id} href={'#'+l.id}
                 className={`flex items-center justify-between rounded-2xl px-4 py-3.5 text-[15px] ${name===l.id?'accent-text':'text-white/85'} hover:bg-white/6`}>
                {l.label}<span className="text-white/30" style={{width:18,height:18}}>{I.chev({})}</span>
              </a>
            ))}
            <a href="#booking" className="mt-1 block px-1 pb-1">
              <Btn kind="primary" className="w-full" iconEnd={I.arrow({})}>book a pitch</Btn>
            </a>
          </Glass>
        </div>
      ) : null}
    </nav>
  );
}

export function Footer(){
  return (
    <footer className="mt-28 px-6 pb-10">
      <div className="mx-auto max-w-7xl">
        <Glass strong className="overflow-hidden rounded-[34px] p-8 md:p-12">
          <div className="grid gap-12 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
            <div>
              <Logo h={40} />
              <p className="mt-5 max-w-xs text-[14px] leading-relaxed text-white/55">{CONTACT.strap}. 4G pitches, LED floodlights & rebound boards — open to all.</p>
              {/* newsletter signup */}
              <div className="mt-6 max-w-xs">
                <div className="text-[11px] uppercase tracking-[.2em] text-white/40">stay in the loop</div>
                <form className="mt-3 flex items-center gap-2" onSubmit={e=>e.preventDefault()}>
                  <span className="glass glass-soft flex h-11 flex-1 items-center rounded-full px-4">
                    <input type="email" required className="w-full bg-transparent text-[14px] outline-none placeholder:text-white/35" placeholder="your email" />
                  </span>
                  <Btn kind="primary" type="submit" className="h-11 w-11 !px-0" icon={I.arrow({})} aria-label="subscribe" />
                </form>
              </div>
              <div className="mt-6 flex items-center gap-2.5">
                <span className="glass grid h-10 w-10 place-items-center rounded-full text-white/70">f</span>
                <span className="glass grid h-10 w-10 place-items-center rounded-full text-white/70">ig</span>
              </div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-[.2em] text-white/40">play</div>
              <ul className="mt-4 space-y-2.5 text-[14px] text-white/65">
                {ALL_LINKS.slice(0,5).map(l=>(<li key={l.id}><a href={'#'+l.id} className="hover:text-white">{l.label}</a></li>))}
                <li><a href="#dashboard" className="hover:text-white">my bookings</a></li>
              </ul>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-[.2em] text-white/40">juniors & clubs</div>
              <ul className="mt-4 space-y-2.5 text-[14px] text-white/65">
                {ALL_LINKS.slice(5).map(l=>(<li key={l.id}><a href={'#'+l.id} className="hover:text-white">{l.label}</a></li>))}
              </ul>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-[.2em] text-white/40">visit us</div>
              <ul className="mt-4 space-y-3 text-[14px] text-white/65">
                <li className="flex items-start gap-2.5"><span className="mt-0.5 text-white/40" style={{width:17,height:17}}>{I.pin({})}</span>{CONTACT.addr}</li>
                <li className="flex items-center gap-2.5"><span className="text-white/40" style={{width:17,height:17}}>{I.clock({})}</span>Mon–Fri 08–22 · Sat–Sun 08–20</li>
                <li className="flex items-center gap-2.5"><span className="accent-text">●</span>{CONTACT.phone}</li>
                <li className="flex items-center gap-2.5"><span className="accent-text">●</span>{CONTACT.email}</li>
              </ul>
            </div>
          </div>
          <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-[12px] text-white/40 md:flex-row md:items-center md:justify-between">
            <span>© 2016–2026 Astro Kings · All rights reserved</span>
            <span className="flex items-center gap-1.5"><span className="text-white/30">Nottingham NG8</span> · floodlit 4G 5-a-side</span>
          </div>
        </Glass>
      </div>
    </footer>
  );
}
