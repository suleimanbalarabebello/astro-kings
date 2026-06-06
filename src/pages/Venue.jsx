/* Venue.jsx — venue / pitch detail */

import { useState } from 'react';
import { I } from '../lib/icons.jsx';
import { PITCHES, SLOTS, TAKEN, store } from '../lib/data.js';
import { go } from '../lib/router.js';
import { Glass, Btn, Tag, Placeholder } from '../components/ui.jsx';
import { Footer } from '../components/Nav.jsx';

export function Venue({ params }){
  const id = params.p || store.venue || 'classic';
  const p = PITCHES.find(x=>x.id===id) || PITCHES[0];
  const [time,setTime] = useState(store.time || '19:00');

  return (
    <div>
      <div className="mx-auto max-w-6xl px-6 pt-28 md:pt-32">
        <button onClick={()=>go('browse')} className="mb-6 inline-flex items-center gap-2 text-[13px] text-white/55 hover:text-white">
          <span className="rotate-180" style={{width:16,height:16}}>{I.arrow({})}</span> all pitches
        </button>

        {/* gallery */}
        <div className="grid gap-3 md:grid-cols-[2fr_1fr] fade-up">
          <Placeholder label="pitch photo · wide" className="aspect-[16/10] w-full rounded-[30px]" />
          <div className="grid grid-rows-2 gap-3">
            <Placeholder label="surface · 4g" className="rounded-3xl" />
            <Placeholder label="floodlights" className="rounded-3xl" />
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* main */}
          <div>
            <div className="flex flex-wrap items-center gap-3">
              {p.tag ? <Tag accent>{p.tag}</Tag> : null}
              <Tag>{p.size}</Tag>
              <span className="inline-flex items-center gap-1 text-[13px] text-white/60"><span className="accent-text" style={{width:15,height:15}}>{I.star({})}</span> 4.9 · 320 reviews</span>
            </div>
            <h1 className="hero-title mt-4 text-5xl md:text-6xl font-semibold lowercase">{p.name}</h1>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/60">
              {p.desc}. Played under LED floodlights on a 4G rubber-crumb surface with rebound boards — the fast, all-weather game Astro Kings is known for.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[['surface','4G rubber-crumb',I.shield],['lighting','LED floodlit',I.bolt],['goals',p.goals,I.ball],['format',p.size,I.user],['boards','rebound',I.whistle],['all-weather','covered',I.shield]].map(([l,v,ic],i)=>(
                <Glass key={i} className="rounded-2xl p-4">
                  <span className="accent-text" style={{width:20,height:20,display:'block'}}>{ic({})}</span>
                  <div className="mt-3 text-[11px] uppercase tracking-wide text-white/40">{l}</div>
                  <div className="text-[14px]">{v}</div>
                </Glass>
              ))}
            </div>

            <h3 className="mt-10 text-xl font-medium lowercase">facilities included</h3>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {['Hot showers','Secure lockers','On-site café','Free parking','Changing rooms','Spectator area'].map(f=>(
                <span key={f} className="glass glass-soft inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] text-white/75"><span className="accent-text" style={{width:15,height:15}}>{I.check({})}</span>{f}</span>
              ))}
            </div>

            {/* reviews */}
            <h3 className="mt-10 text-xl font-medium lowercase">what players say</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[['Best surface in Notts, floodlights are unreal at night.','— Jordan, Wednesday league'],['Booked in 30 seconds, showers were hot, café sorted us after.','— Priya, social 5s']].map(([q,a],i)=>(
                <Glass key={i} className="rounded-3xl p-5">
                  <div className="flex gap-0.5 accent-text">{[0,1,2,3,4].map(s=><span key={s} style={{width:14,height:14,display:'block'}}>{I.star({})}</span>)}</div>
                  <p className="mt-3 text-[14px] leading-relaxed text-white/80">"{q}"</p>
                  <div className="mt-2 text-[12px] text-white/45">{a}</div>
                </Glass>
              ))}
            </div>
          </div>

          {/* sticky booking card */}
          <aside>
            <div className="lg:sticky lg:top-28">
              <Glass strong className="rounded-[28px] p-6">
                <div className="flex items-end justify-between">
                  <div><div className="tnum text-4xl font-semibold">£{p.price}</div><div className="text-[13px] text-white/45">{p.unit} · off-peak −20%</div></div>
                  <Tag>{p.size}</Tag>
                </div>
                <div className="mt-5 text-[12px] uppercase tracking-wide text-white/40">pick a slot · Fri 06 Jun</div>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {SLOTS.slice(2,8).map(s=>{
                    const taken = TAKEN.has(s);
                    return (
                      <button key={s} disabled={taken} onClick={()=>setTime(s)}
                        className={`tnum rounded-xl py-2.5 text-[13px] transition ${taken?'cursor-not-allowed text-white/25 line-through':time===s?'text-[#0b0b0b] accent-bg':'glass glass-soft text-white/80 hover:bg-white/12'}`}>
                        {s}
                      </button>
                    );
                  })}
                </div>
                <Btn kind="primary" size="lg" className="mt-5 w-full" iconEnd={I.arrow({})} onClick={()=>{ store.venue=p.id; store.time=time; go('booking',{p:p.id,t:time}); }}>book {time}</Btn>
                <div className="mt-3 flex items-center justify-center gap-2 text-[12px] text-white/45"><span style={{width:14,height:14}}>{I.lock({})}</span> free cancellation up to 24h before</div>
              </Glass>
            </div>
          </aside>
        </div>
      </div>
      <Footer />
    </div>
  );
}
