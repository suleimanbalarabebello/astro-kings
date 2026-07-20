/* PlanyoBooking.jsx — Level 2 integration: the venue's Planyo booking widget
   embedded inside our branded page.

   • If PLANYO_EMBED_URL is set → the real Planyo widget renders in the iframe.
   • If empty → an INTERACTIVE preview stands in — a working, clickable mock of
     the Planyo booking widget (pick pitch, date, time, pay) so the exact Level-2
     experience can be demoed now. It's deliberately light: that's the one honest
     caveat of embedding — the widget carries Planyo's styling inside our dark
     branded frame. Swap in PLANYO_EMBED_URL for the real live widget. */

import { useState } from 'react';
import { PITCHES } from '../lib/data.js';
import { PLANYO_EMBED_URL } from '../lib/config.js';
import { Glass, Eyebrow } from './ui.jsx';
import { Footer } from './Nav.jsx';

const WD = ['Mo','Tu','We','Th','Fr','Sa','Su'];
const TIMES = ['18:00','19:00','20:00','21:00'];
const TAKEN = { 19:['19:00'], 20:['18:00','20:00'] };   // demo "taken" slots per day

/* --- an interactive stand-in for Planyo's embedded booking widget (light UI) --- */
function WidgetPreview(){
  const [pitchId,setPitchId] = useState('classic');
  const [day,setDay]   = useState(19);
  const [time,setTime] = useState('19:00');
  const [booked,setBooked] = useState(null);
  const p = PITCHES.find(x=>x.id===pitchId) || PITCHES[0];

  // July 2026 grid; 1 Jul 2026 is a Wednesday → offset 2 (Mon-first)
  const firstOffset = 2, daysInMonth = 31;
  const cells = [...Array(firstOffset).fill(null), ...Array.from({length:daysInMonth},(_,i)=>i+1)];
  const takenToday = TAKEN[day] || [];
  const timeTaken = (t)=> takenToday.includes(t);

  function book(){
    setBooked({ pitch:p.name, day, time, ref:'AK'+String(1000+day*7).slice(-4), total:p.price });
  }

  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#f6f7f9] text-[#1a1d24] shadow-xl">
      <div className="absolute right-3 top-3 z-10 rounded-full bg-black/80 px-3 py-1 text-[11px] font-medium text-white">interactive preview</div>

      <div className="border-b border-black/10 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-[15px] font-semibold">Astro Kings — book a pitch</div>
          <div className="text-[11px] font-medium text-[#5b6472]">powered by Planyo</div>
        </div>
      </div>

      {booked ? (
        <div className="px-6 py-10 text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#16a34a] text-white text-[26px]">✓</div>
          <div className="mt-4 text-[20px] font-semibold">Booking confirmed</div>
          <p className="mx-auto mt-1 max-w-sm text-[13px] text-[#5b6472]">
            {booked.pitch} · Sun {booked.day} Jul 2026 · {booked.time}. A confirmation email is on its way.
          </p>
          <div className="mx-auto mt-4 inline-flex items-center gap-3 rounded-lg bg-white px-4 py-2 text-[13px] shadow-sm">
            booking ref <span className="font-semibold text-[#2563eb]">{booked.ref}</span>
          </div>
          <div className="mt-3 text-[13px]">Paid <span className="font-semibold">£{booked.total}.00</span> · card ending 4242</div>
          <button onClick={()=>setBooked(null)} className="mt-6 rounded-xl border border-black/15 px-5 py-2.5 text-[13px] font-medium hover:bg-black/5">make another booking</button>
        </div>
      ) : (
        <div className="grid gap-6 p-6 md:grid-cols-[1fr_1fr]">
          {/* pitch + calendar */}
          <div>
            <label className="text-[11px] font-medium uppercase tracking-wide text-[#8b93a1]">pitch</label>
            <select value={pitchId} onChange={e=>setPitchId(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 text-[13px] outline-none focus:border-[#2563eb]">
              {PITCHES.map(x=><option key={x.id} value={x.id}>{x.name} — £{x.price}/hr</option>)}
            </select>

            <div className="mt-4 mb-2 flex items-center justify-between text-[13px] font-medium">
              <button className="grid h-7 w-7 place-items-center rounded-lg text-[#8b93a1] hover:bg-black/5" aria-label="previous month">‹</button>
              <span>July 2026</span>
              <button className="grid h-7 w-7 place-items-center rounded-lg text-[#8b93a1] hover:bg-black/5" aria-label="next month">›</button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-[10px] uppercase text-[#8b93a1]">
              {WD.map(d=><div key={d}>{d}</div>)}
            </div>
            <div className="mt-1 grid grid-cols-7 gap-1 text-[12px]">
              {cells.map((n,i)=>{
                if(!n) return <div key={i} />;
                const past = n < 20;                         // today is 20 Jul in the demo
                const sel = n===day;
                return (
                  <button key={i} disabled={past} onClick={()=>setDay(n)}
                    className={`grid h-8 place-items-center rounded-lg transition ${past?'cursor-not-allowed text-[#c3c9d2]':sel?'bg-[#2563eb] font-semibold text-white':'text-[#2a2f3a] hover:bg-black/5'}`}>
                    {n}
                  </button>
                );
              })}
            </div>
          </div>

          {/* times + pay */}
          <div className="flex flex-col">
            <label className="text-[11px] font-medium uppercase tracking-wide text-[#8b93a1]">available times · {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][new Date(2026,6,day).getDay()]} {day} Jul</label>
            <div className="mt-1.5 grid grid-cols-2 gap-2">
              {TIMES.map(t=>{
                const taken = timeTaken(t);
                if (taken) return (
                  <div key={t} className="rounded-xl border border-black/5 bg-black/[.03] px-3 py-2.5 text-center text-[13px] text-[#b4bac4] line-through">{t}</div>
                );
                const on = t===time;
                return (
                  <button key={t} onClick={()=>setTime(t)}
                    className={`rounded-xl border px-3 py-2.5 text-center text-[13px] transition ${on?'border-[#2563eb] bg-[#eaf1ff] font-semibold text-[#2563eb]':'border-black/10 bg-white hover:border-[#2563eb]/40'}`}>
                    {t}
                  </button>
                );
              })}
            </div>

            <div className="mt-auto border-t border-black/10 pt-4">
              <div className="flex items-center justify-between">
                <div><div className="text-[11px] text-[#8b93a1]">total · 1 hour</div><div className="text-[18px] font-semibold">£{p.price}.00</div></div>
                <button onClick={book} disabled={timeTaken(time)}
                  className={`rounded-xl px-5 py-2.5 text-[13px] font-semibold text-white transition ${timeTaken(time)?'cursor-not-allowed bg-[#9db2e6]':'bg-[#2563eb] hover:bg-[#1e53d6]'}`}>
                  Book &amp; pay →
                </button>
              </div>
              <div className="mt-3 text-center text-[11px] text-[#8b93a1]">🔒 secure booking &amp; card payment handled by Planyo</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function PlanyoBooking(){
  return (
    <div>
      <div className="mx-auto max-w-4xl px-6 pt-28 pb-6 md:pt-32">
        <Eyebrow>secure booking</Eyebrow>
        <h1 className="hero-title mt-3 text-4xl font-semibold lowercase md:text-5xl">book your pitch</h1>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/60">
          Real-time availability and payment, handled securely — right here on the Astro Kings site.
        </p>
      </div>

      {/* our branded frame · the Planyo widget sits inside */}
      <div className="mx-auto max-w-4xl px-6 pb-6">
        <Glass strong className="rounded-[30px] p-3 md:p-4">
          {PLANYO_EMBED_URL ? (
            <iframe title="Astro Kings booking" src={PLANYO_EMBED_URL}
              className="h-[720px] w-full rounded-2xl bg-white" style={{ border:0 }} loading="lazy" />
          ) : (
            <WidgetPreview />
          )}
        </Glass>

        {!PLANYO_EMBED_URL ? (
          <p className="mx-auto mt-4 max-w-xl text-center text-[12px] leading-relaxed text-white/40">
            Interactive preview of Level&nbsp;2 — try picking a pitch, date and time above. The rest of the site is
            unchanged; only this panel is the Planyo widget. Add the venue’s Planyo embed URL to
            <span className="text-white/60"> config.js</span> and the real live widget (real availability + Stripe
            payment in CHF) renders right here. {/* TODO: set PLANYO_EMBED_URL */}
          </p>
        ) : null}
      </div>
      <Footer />
    </div>
  );
}
