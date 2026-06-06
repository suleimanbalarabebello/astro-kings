/* Dashboard.jsx — my bookings (upcoming, splits, league, loyalty) */

import { I } from '../lib/icons.jsx';
import { go } from '../lib/router.js';
import { Glass, Btn, Tag, Placeholder, PageHead } from '../components/ui.jsx';
import { Footer } from '../components/Nav.jsx';

export function Dashboard(){
  const upcoming = [
    { p:'Classic 5-a-side', when:'Fri 06 Jun · 19:00', ref:'AK-7F3K2', paid:3, of:5, status:'confirmed' },
    { p:'The Big One', when:'Sun 08 Jun · 11:00', ref:'AK-9B1Q8', paid:9, of:18, status:'splitting' },
  ];
  const past = [
    { p:'Samba 5-a-side', when:'Wed 28 May · 20:00' },
    { p:'Classic 5-a-side', when:'Wed 21 May · 20:00' },
    { p:'Mini Soccer', when:'Sat 17 May · 10:00' },
  ];
  return (
    <div>
      <PageHead eyebrow="welcome back, captain" title="my bookings"
        sub="Your upcoming games, payment splits and loyalty — all in one place.">
        <a href="#booking"><Btn kind="primary" iconEnd={I.arrow({})}>book again</Btn></a>
      </PageHead>

      <div className="mx-auto mt-12 grid max-w-6xl gap-6 px-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          {/* stat row */}
          <div className="grid grid-cols-3 gap-3">
            {[['12','games this season'],['£640','spent ytd'],['Gold','loyalty tier']].map(([v,l],i)=>(
              <Glass key={i} className="rounded-3xl p-5"><div className="tnum text-3xl font-semibold accent-text">{v}</div><div className="mt-1 text-[12px] text-white/50">{l}</div></Glass>
            ))}
          </div>

          <div>
            <div className="mb-3 text-[12px] uppercase tracking-wide text-white/45">upcoming</div>
            <div className="space-y-3">
              {upcoming.map((b,i)=>(
                <Glass key={i} strong className="grid gap-4 rounded-3xl p-4 sm:grid-cols-[120px_1fr]">
                  <Placeholder label="pitch" className="aspect-video rounded-2xl sm:aspect-auto" />
                  <div className="flex flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-[17px] font-medium">{b.p}</div>
                        <div className="mt-1 text-[13px] text-white/55">{b.when}</div>
                      </div>
                      <Tag accent={b.status==='confirmed'}>{b.status}</Tag>
                    </div>
                    {/* split progress */}
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-[12px] text-white/50"><span>team payment</span><span className="tnum">{b.paid}/{b.of} paid</span></div>
                      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full accent-bg" style={{width:(b.paid/b.of*100)+'%'}}></div></div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Btn kind="glass" size="sm">manage</Btn>
                      <Btn kind="glass" size="sm">invite team</Btn>
                      <span className="ml-auto self-center tnum text-[12px] text-white/40">ref {b.ref}</span>
                    </div>
                  </div>
                </Glass>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-3 text-[12px] uppercase tracking-wide text-white/45">past games</div>
            <Glass className="divide-y divide-white/8 rounded-3xl">
              {past.map((b,i)=>(
                <div key={i} className="flex items-center justify-between px-5 py-4">
                  <div className="flex items-center gap-3"><span className="glass grid h-9 w-9 place-items-center rounded-xl accent-text"><span style={{width:16,height:16}}>{I.ball({})}</span></span>
                    <div><div className="text-[14px]">{b.p}</div><div className="text-[12px] text-white/45">{b.when}</div></div></div>
                  <button onClick={()=>go('booking')} className="text-[13px] accent-text">rebook</button>
                </div>
              ))}
            </Glass>
          </div>
        </div>

        {/* side widgets */}
        <aside className="space-y-4">
          <Glass strong className="rounded-3xl p-6">
            <div className="flex items-center gap-2 text-[12px] uppercase tracking-wide text-white/45"><span className="accent-text" style={{width:16,height:16}}>{I.trophy({})}</span> your league</div>
            <div className="mt-3 text-[16px] font-medium">Wednesday Div 2</div>
            <div className="mt-4 space-y-2.5">
              {[['1','FC Knock-it-long','21'],['2','Allstars','18'],['3','Your team','17'],['4','Toon Army','14']].map(([pos,n,pts])=>(
                <div key={pos} className={`flex items-center justify-between rounded-xl px-3 py-2 text-[13px] ${n==='Your team'?'accent-ring bg-white/5':''}`}>
                  <span className="flex items-center gap-3"><span className="tnum w-4 text-white/40">{pos}</span>{n}</span>
                  <span className="tnum text-white/70">{pts} pts</span>
                </div>
              ))}
            </div>
            <a href="#leagues"><Btn kind="glass" size="sm" className="mt-4 w-full" iconEnd={I.arrow({})}>full table</Btn></a>
          </Glass>

          <Glass className="rounded-3xl p-6">
            <div className="text-[12px] uppercase tracking-wide text-white/45">loyalty · gold</div>
            <div className="mt-3 flex items-center justify-between text-[13px] text-white/55"><span>2 games to a free pitch</span><span className="tnum accent-text">10/12</span></div>
            <div className="mt-2 flex gap-1">{Array.from({length:12}).map((_,i)=><span key={i} className={`h-2 flex-1 rounded-full ${i<10?'accent-bg':'bg-white/10'}`}></span>)}</div>
          </Glass>
        </aside>
      </div>
      <Footer />
    </div>
  );
}
