/* PlanyoBooking.jsx — Level 2 integration: the venue's Planyo booking widget
   embedded inside our branded page.

   • If PLANYO_EMBED_URL is set → the real Planyo widget renders in the iframe.
   • If empty → a styled PREVIEW stands in, so you can see exactly how Level 2
     looks on the site before the real embed code is added. The preview is
     deliberately light — that's the one honest caveat of embedding: the widget
     panel carries Planyo's own styling inside our dark, branded frame. */

import { I } from '../lib/icons.jsx';
import { PLANYO_EMBED_URL } from '../lib/config.js';
import { Glass, Btn, Eyebrow } from './ui.jsx';
import { Footer } from './Nav.jsx';

/* --- a realistic stand-in for Planyo's embedded booking widget (light UI) --- */
function WidgetPreview(){
  const days = ['Mo','Tu','We','Th','Fr','Sa','Su'];
  const times = ['18:00','19:00','20:00','21:00'];
  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#f6f7f9] text-[#1a1d24] shadow-xl">
      {/* preview ribbon */}
      <div className="absolute right-3 top-3 z-10 rounded-full bg-black/80 px-3 py-1 text-[11px] font-medium text-white">preview</div>

      <div className="border-b border-black/10 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-[15px] font-semibold">Astro Kings — book a pitch</div>
          <div className="text-[11px] font-medium text-[#5b6472]">powered by Planyo</div>
        </div>
      </div>

      <div className="grid gap-6 p-6 md:grid-cols-[1fr_1fr]">
        {/* mini calendar */}
        <div>
          <div className="mb-2 flex items-center justify-between text-[13px] font-medium">
            <button className="grid h-7 w-7 place-items-center rounded-lg hover:bg-black/5">‹</button>
            <span>July 2026</span>
            <button className="grid h-7 w-7 place-items-center rounded-lg hover:bg-black/5">›</button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-[10px] uppercase text-[#8b93a1]">
            {days.map(d=><div key={d}>{d}</div>)}
          </div>
          <div className="mt-1 grid grid-cols-7 gap-1 text-[12px]">
            {Array.from({length:31}).map((_,i)=>{
              const n=i+1, sel=n===19;
              return <div key={n} className={`grid h-8 place-items-center rounded-lg ${sel?'bg-[#2563eb] font-semibold text-white':'text-[#2a2f3a] hover:bg-black/5'}`}>{n}</div>;
            })}
          </div>
        </div>

        {/* resource + times */}
        <div>
          <label className="text-[11px] font-medium uppercase tracking-wide text-[#8b93a1]">pitch</label>
          <div className="mt-1.5 flex items-center justify-between rounded-xl border border-black/10 bg-white px-3 py-2.5 text-[13px]">
            Classic 5-a-side <span className="text-[#8b93a1]">▾</span>
          </div>
          <label className="mt-4 block text-[11px] font-medium uppercase tracking-wide text-[#8b93a1]">available times · Sat 19 Jul</label>
          <div className="mt-1.5 grid grid-cols-2 gap-2">
            {times.map((t,i)=>(
              <div key={t} className={`rounded-xl border px-3 py-2.5 text-center text-[13px] ${i===1?'border-[#2563eb] bg-[#eaf1ff] font-semibold text-[#2563eb]':'border-black/10 bg-white'}`}>{t}</div>
            ))}
          </div>
          <div className="mt-5 flex items-center justify-between border-t border-black/10 pt-4">
            <div><div className="text-[11px] text-[#8b93a1]">total</div><div className="text-[18px] font-semibold">£60.00</div></div>
            <button className="rounded-xl bg-[#2563eb] px-5 py-2.5 text-[13px] font-semibold text-white">Book & pay →</button>
          </div>
          <div className="mt-3 text-center text-[11px] text-[#8b93a1]">🔒 secure booking &amp; card payment handled by Planyo</div>
        </div>
      </div>
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
            <iframe
              title="Astro Kings booking"
              src={PLANYO_EMBED_URL}
              className="h-[720px] w-full rounded-2xl bg-white"
              style={{ border:0 }}
              loading="lazy"
            />
          ) : (
            <WidgetPreview />
          )}
        </Glass>

        {!PLANYO_EMBED_URL ? (
          <p className="mx-auto mt-4 max-w-xl text-center text-[12px] leading-relaxed text-white/40">
            Preview of Level&nbsp;2. The rest of the site is unchanged — only this panel is the Planyo widget.
            Add the venue’s Planyo embed URL to <span className="text-white/60">config.js</span> and the real live
            widget (real availability + Stripe payment) renders right here. {/* TODO: set PLANYO_EMBED_URL */}
          </p>
        ) : null}
      </div>
      <Footer />
    </div>
  );
}
