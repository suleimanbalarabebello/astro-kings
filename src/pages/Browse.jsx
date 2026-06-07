/* Browse.jsx — find a pitch (filters + availability list) */

import { useState } from 'react';
import { I } from '../lib/icons.jsx';
import { PITCHES, SLOTS, store } from '../lib/data.js';
import { go } from '../lib/router.js';
import { useStore } from '../lib/store.js';
import { canStart } from '../lib/booking.js';
import { Glass, Tag, Placeholder, PageHead } from '../components/ui.jsx';
import { Map } from '../components/Map.jsx';
import { Footer } from '../components/Nav.jsx';

/* Browse uses short day chips; the engine keys on dated labels ('Fri 06'). */
const DAY_LABEL = { Today:'Thu 05', Fri:'Fri 06', Sat:'Sat 07', Sun:'Sun 08', Mon:'Mon 09' };

export function Chip({ active, onClick, children }){
  return (
    <button onClick={onClick}
      className={`rounded-full px-4 py-2 text-[13px] transition ${active?'text-[#0b0b0b] accent-bg':'glass glass-soft text-white/75 hover:bg-white/10'}`}>
      {children}
    </button>
  );
}

export function Browse(){
  useStore();
  const [fmt,setFmt] = useState('all');
  const [day,setDay] = useState(store.day || 'Fri');
  const [time,setTime] = useState('evening');
  const list = fmt==='all' ? PITCHES : PITCHES.filter(p=>p.size===fmt);
  const dayLabel = DAY_LABEL[day] || 'Fri 06';

  return (
    <div>
      <PageHead eyebrow="find a pitch" title="search availability"
        sub="One venue, four floodlit formats. Filter by size and time, then jump straight into a slot.">
        <Glass strong className="flex items-center gap-3 rounded-2xl px-5 py-4">
          <span className="text-white/45" style={{width:18,height:18}}>{I.pin({})}</span>
          <div><div className="text-[14px]">Astro Kings · Wigman Rd</div><div className="text-[12px] text-white/45">Nottingham NG8 4PB</div></div>
        </Glass>
      </PageHead>

      <div className="mx-auto mt-12 grid max-w-6xl gap-6 px-6 lg:grid-cols-[280px_1fr]">
        {/* filters */}
        <aside className="space-y-4">
          <Glass strong className="rounded-3xl p-5">
            <div className="text-[12px] uppercase tracking-wide text-white/45">format</div>
            <div className="mt-3 flex flex-wrap gap-2">
              <Chip active={fmt==='all'} onClick={()=>setFmt('all')}>all</Chip>
              {['5v5','7v7','9v9'].map(s=><Chip key={s} active={fmt===s} onClick={()=>setFmt(s)}>{s}</Chip>)}
            </div>
            <div className="mt-6 text-[12px] uppercase tracking-wide text-white/45">day</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {['Today','Fri','Sat','Sun','Mon'].map(d=><Chip key={d} active={day===d} onClick={()=>setDay(d)}>{d}</Chip>)}
            </div>
            <div className="mt-6 text-[12px] uppercase tracking-wide text-white/45">time of day</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {[['morning','08–12'],['afternoon','12–17'],['evening','17–22']].map(([k,l])=>(
                <Chip key={k} active={time===k} onClick={()=>setTime(k)}>{l}</Chip>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-white/10 p-4">
              <div className="flex items-center justify-between text-[13px]"><span className="text-white/55">off-peak (before 6pm)</span><span className="accent-text">−20%</span></div>
            </div>
          </Glass>

          <div className="aspect-square w-full overflow-hidden rounded-3xl glass">
            <Map className="h-full w-full" />
          </div>
        </aside>

        {/* results */}
        <div>
          <div className="mb-5 flex items-center justify-between">
            <div className="text-[14px] text-white/55"><span className="text-white">{list.length}</span> formats available · <span className="text-white">{day}</span> {time}</div>
            <div className="hidden items-center gap-2 text-[13px] text-white/45 md:flex">sort <span className="glass glass-soft rounded-full px-3 py-1.5 text-white/75">soonest</span></div>
          </div>
          <div className="space-y-4">
            {list.map((p,i)=>(
              <Glass key={p.id} className="grid gap-5 rounded-3xl p-4 md:grid-cols-[200px_1fr] fade-up" style={{animationDelay:(i*.05)+'s'}}>
                <Placeholder label={p.size} className="aspect-[16/10] rounded-2xl md:aspect-auto">
                  {p.tag ? <span className="absolute left-3 top-3"><Tag accent>{p.tag}</Tag></span> : null}
                </Placeholder>
                <div className="flex flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-[19px] font-medium">{p.name}</div>
                      <div className="mt-1 flex flex-wrap gap-2 text-[12px] text-white/50">
                        {p.spec.map(s=><span key={s} className="glass rounded-full px-2.5 py-1">{s}</span>)}
                      </div>
                    </div>
                    <div className="text-right"><div className="tnum text-2xl font-semibold">£{p.price}</div><div className="-mt-1 text-[12px] text-white/45">{p.unit}</div></div>
                  </div>
                  {/* mini slot strip */}
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    {SLOTS.slice(2,8).map(s=>{
                      const taken = !canStart(p.id, dayLabel, s, 1);
                      return (
                        <button key={s} disabled={taken}
                          onClick={()=>{ store.venue=p.id; store.time=s; store.day=day; go('booking',{p:p.id,t:s}); }}
                          className={`tnum rounded-xl px-3 py-2 text-[13px] transition ${taken?'cursor-not-allowed text-white/25 line-through':'glass glass-soft text-white/80 hover:accent-bg hover:text-[#0b0b0b]'}`}>
                          {s}
                        </button>
                      );
                    })}
                    <button onClick={()=>{ store.venue=p.id; go('venue',{p:p.id}); }} className="ml-auto inline-flex items-center gap-1.5 text-[13px] accent-text">view all<span style={{width:15,height:15}}>{I.chev({})}</span></button>
                  </div>
                </div>
              </Glass>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
