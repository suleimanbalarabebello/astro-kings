/* Pricing.jsx — pitch hire prices + memberships */

import { useState } from 'react';
import { I } from '../lib/icons.jsx';
import { PITCHES, store } from '../lib/data.js';
import { go } from '../lib/router.js';
import { Glass, Btn, Tag, PageHead } from '../components/ui.jsx';
import { Footer } from '../components/Nav.jsx';

export function Pricing(){
  const [tab,setTab] = useState('hire');
  const memb = [
    { n:'Pay & Play', price:'£350', unit:'/pp', note:'before 6pm, every day', feat:['2 players minimum','Off-peak slots','No commitment','Café discount'], tag:'' },
    { n:'Kings Club', price:'£39', unit:'/mo', note:'most popular', feat:['20% off all pitch hire','Priority booking window','Free bibs & match ball','League entry discount'], tag:'most popular' },
    { n:'Team Season', price:'£540', unit:'/block', note:'12-week league', feat:['Guaranteed weekly slot','League fixtures & table','Trophy & medals','Fixed price all season'], tag:'' },
  ];
  return (
    <div>
      <PageHead eyebrow="pitch hire & memberships" title="simple pricing"
        sub="All pitches include changing facilities, hot showers, secure lockers and the café. 4G surface, LED floodlights & rebound boards." >
        <Glass strong className="flex gap-1 rounded-full p-1.5">
          {[['hire','pitch hire'],['membership','memberships']].map(([k,l])=>(
            <button key={k} onClick={()=>setTab(k)} className={`rounded-full px-5 py-2 text-[13px] transition ${tab===k?'accent-bg text-white':'text-white/70 hover:text-white'}`}>{l}</button>
          ))}
        </Glass>
      </PageHead>

      <div className="mx-auto mt-12 max-w-6xl px-6">
        {tab==='hire' ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PITCHES.map((p,i)=>(
              <Glass key={p.id} className="flex flex-col rounded-3xl p-6 fade-up" style={{animationDelay:(i*.05)+'s'}}>
                {p.tag ? <Tag accent className="self-start mb-3">{p.tag}</Tag> : <span className="mb-3 h-6"></span>}
                <div className="text-[17px] font-medium">{p.name}</div>
                <div className="mt-3 flex items-end gap-1"><span className="tnum text-4xl font-semibold">£{p.price}</span><span className="mb-1 text-[13px] text-white/45">{p.unit}</span></div>
                <ul className="mt-5 flex-1 space-y-2.5 text-[13.5px] text-white/65">
                  {p.spec.map(s=><li key={s} className="flex items-center gap-2.5"><span className="accent-text" style={{width:15,height:15}}>{I.check({})}</span>{s}</li>)}
                  <li className="flex items-center gap-2.5"><span className="accent-text" style={{width:15,height:15}}>{I.check({})}</span>Showers & lockers</li>
                </ul>
                <Btn kind="primary" className="mt-6 w-full" iconEnd={I.arrow({})} onClick={()=>{ store.venue=p.id; go('booking',{p:p.id}); }}>hire now</Btn>
              </Glass>
            ))}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-3">
            {memb.map((m,i)=>(
              <Glass key={m.n} strong={i===1} className={`flex flex-col rounded-[28px] p-7 fade-up ${i===1?'accent-ring':''}`} style={{animationDelay:(i*.06)+'s'}}>
                {m.tag ? <Tag accent className="self-start mb-3">{m.tag}</Tag> : <span className="mb-3 h-6"></span>}
                <div className="text-[19px] font-medium lowercase">{m.n}</div>
                <div className="mt-1 text-[13px] text-white/45">{m.note}</div>
                <div className="mt-5 flex items-end gap-1"><span className="tnum text-5xl font-semibold">{m.price}</span><span className="mb-1.5 text-[13px] text-white/45">{m.unit}</span></div>
                <ul className="mt-6 flex-1 space-y-3 text-[14px] text-white/70">
                  {m.feat.map(f=><li key={f} className="flex items-center gap-3"><span className="glass grid h-6 w-6 place-items-center rounded-full accent-text"><span style={{width:13,height:13}}>{I.check({})}</span></span>{f}</li>)}
                </ul>
                <a href="#booking" className="mt-7"><Btn kind={i===1?'primary':'outline'} size="lg" className="w-full">choose plan</Btn></a>
              </Glass>
            ))}
          </div>
        )}

        <Glass strong className="mt-8 flex flex-col items-center justify-between gap-4 rounded-3xl p-7 text-center md:flex-row md:text-left">
          <div><div className="text-[16px] font-medium">Booking for a group, party or corporate day?</div><div className="mt-1 text-[14px] text-white/55">We'll build a custom package with catering and multiple pitches.</div></div>
          <a href="#about"><Btn kind="glass" iconEnd={I.arrow({})}>talk to the team</Btn></a>
        </Glass>
      </div>
      <Footer />
    </div>
  );
}
