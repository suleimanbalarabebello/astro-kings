/* Leagues.jsx — leagues & tournaments (cards + live table) */

import { I } from '../lib/icons.jsx';
import { Glass, Btn, Tag, PageHead } from '../components/ui.jsx';
import { Footer } from '../components/Nav.jsx';

export function Leagues(){
  const leagues = [
    { d:'Monday', div:'Open 5s', spots:'2 spots left', time:'19:00–22:00', price:'£540 / 12 wks' },
    { d:'Wednesday', div:'Div 2 · Mixed', spots:'full', time:'19:00–22:00', price:'£540 / 12 wks' },
    { d:'Thursday', div:'Vets 35+', spots:'4 spots left', time:'20:00–22:00', price:'£420 / 8 wks' },
    { d:'Sunday', div:'Juniors U18', spots:'open', time:'10:00–13:00', price:'£360 / 12 wks' },
  ];
  const table = [
    ['1','FC Knock-it-long','11','9','1','1','28'],
    ['2','Real Sociable','11','8','2','1','26'],
    ['3','Your Team','11','7','2','2','23'],
    ['4','Toon Army','11','5','3','3','18'],
    ['5','The Subs Bench','11','3','2','6','11'],
  ];
  return (
    <div>
      <PageHead eyebrow="leagues & tournaments" title="join a league"
        sub="Competitive blocks every night of the week. Guaranteed weekly slot, live tables, fixtures, trophies and medals.">
        <a href="#about"><Btn kind="primary" iconEnd={I.arrow({})}>enter a team</Btn></a>
      </PageHead>

      <div className="mx-auto mt-12 grid max-w-6xl gap-6 px-6 lg:grid-cols-[1fr_360px]">
        {/* league cards */}
        <div className="space-y-3">
          {leagues.map((l,i)=>{
            const full = l.spots==='full';
            return (
              <Glass key={i} className="flex flex-col gap-4 rounded-3xl p-5 sm:flex-row sm:items-center sm:justify-between fade-up" style={{animationDelay:(i*.05)+'s'}}>
                <div className="flex items-center gap-4">
                  <span className="glass grid h-14 w-14 place-items-center rounded-2xl accent-text"><span style={{width:24,height:24}}>{I.trophy({})}</span></span>
                  <div>
                    <div className="text-[17px] font-medium">{l.d} · {l.div}</div>
                    <div className="mt-1 flex flex-wrap gap-2 text-[12px] text-white/50">
                      <span className="glass rounded-full px-2.5 py-1">{l.time}</span>
                      <span className="glass rounded-full px-2.5 py-1">{l.price}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 sm:flex-col sm:items-end">
                  <span className={`text-[12px] ${full?'text-white/35':'accent-text'}`}>{l.spots}</span>
                  <Btn kind={full?'glass':'primary'} size="sm" iconEnd={full?null:I.arrow({})} className={full?'pointer-events-none opacity-60':''}>{full?'waitlist':'enter'}</Btn>
                </div>
              </Glass>
            );
          })}

          <Glass strong className="grid gap-4 rounded-[30px] p-7 sm:grid-cols-3">
            {[['6–12','week blocks'],['£0','ref fees · included'],['🏆','trophies & medals']].map(([v,l],i)=>(
              <div key={i}><div className="tnum text-3xl font-semibold accent-text">{v}</div><div className="mt-1 text-[12px] text-white/50">{l}</div></div>
            ))}
          </Glass>
        </div>

        {/* live table */}
        <aside>
          <Glass strong className="rounded-[28px] p-6 lg:sticky lg:top-28">
            <div className="flex items-center justify-between">
              <div className="text-[15px] font-medium">Wednesday Div 2</div>
              <Tag>live</Tag>
            </div>
            <div className="mt-4 grid grid-cols-[18px_1fr_repeat(4,22px)_30px] gap-y-1 text-[11px] uppercase tracking-wide text-white/35">
              <span></span><span></span><span className="text-center">p</span><span className="text-center">w</span><span className="text-center">d</span><span className="text-center">l</span><span className="text-right">pts</span>
            </div>
            <div className="mt-1 space-y-1">
              {table.map((r,i)=>(
                <div key={i} className={`grid grid-cols-[18px_1fr_repeat(4,22px)_30px] items-center rounded-lg py-1.5 text-[12.5px] ${r[1]==='Your Team'?'accent-ring bg-white/5 px-1':'px-1'}`}>
                  <span className="tnum text-white/40">{r[0]}</span>
                  <span className="truncate">{r[1]}</span>
                  {r.slice(2,6).map((x,j)=><span key={j} className="tnum text-center text-white/60">{x}</span>)}
                  <span className="tnum text-right font-semibold accent-text">{r[6]}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 text-[12px] text-white/40">updated after every fixture · auto-synced to your dashboard</div>
          </Glass>
        </aside>
      </div>
      <Footer />
    </div>
  );
}
