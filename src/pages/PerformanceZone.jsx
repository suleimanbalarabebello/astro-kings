/* PerformanceZone.jsx — The Performance Zone: a pitch converted into a coaching
   space for 1-2-1 & small-group sessions. Hired by individuals and small groups,
   but mainly by coaches who resell the space to their own clients.

   Look: high-energy "performance" identity — volt/lime + electric cyan on a
   near-black athletic backdrop, scoped to this page only. */

import { I } from '../lib/icons.jsx';
import { scrollToId } from '../lib/router.js';
import { ACADEMY_VIDEO } from '../lib/data.js';
import { Glass, Btn, Tag, Eyebrow } from '../components/ui.jsx';
import { EnquiryForm } from '../components/Enquiry.jsx';
import { Section } from './Home.jsx';
import { Footer } from '../components/Nav.jsx';

/* performance palette */
const VOLT = '#C6F94E';   // volt / lime — primary energy
const CYAN = '#35E0FF';   // electric cyan — secondary

const SESSION_TYPES = [
  { ic:I.user,    c:VOLT, t:'1-2-1 sessions',     d:'Focused individual coaching time — every rep on you.' },
  { ic:I.ball,    c:CYAN, t:'small groups',       d:'Sharpen up together with up to 6 players.' },
  { ic:I.whistle, c:VOLT, t:'coaches',            d:'Take the space and run your own client sessions.' },
  { ic:I.bolt,    c:CYAN, t:'player development', d:'Technique, speed & split-second decisions.' },
];

const KIT = ['2 coaching pods','Speed ladders & hurdles','Mannequins','Mini-goals','Reaction games','Footballs provided'];

const RATES = [
  {
    who:'players & small groups', price:'£30', unit:'/session', tag:'',
    note:'hire the Zone for yourself — up to 1 hour',
    feat:['Full coaching set-up, ready to go','Suitable for 1–6 players','Equipment & footballs included'],
  },
  {
    who:'coaches — full day or night', price:'from £60', unit:'', tag:'best for coaches',
    note:'take the Zone and run your own clients',
    feat:['The space is exclusively yours','Full coaching set-up included','Advertising board on site','Featured on our socials','Recurring slots get priority'],
  },
];

export function PerformanceZone(){
  return (
    /* scope the brand accent to VOLT for this whole page (buttons, links, glows) */
    <div style={{ '--accent': VOLT, '--accent-2': '#E4FF9B' }}>
      {/* page-scoped athletic backdrop — near-black with volt + cyan energy */}
      <div className="pointer-events-none fixed inset-0" style={{ zIndex:-1, background:
        'radial-gradient(70% 55% at 12% 0%, rgba(198,249,78,.14), transparent 55%),'+
        'radial-gradient(70% 55% at 90% 8%, rgba(53,224,255,.12), transparent 55%),'+
        'radial-gradient(95% 70% at 50% 122%, rgba(198,249,78,.08), transparent 60%),'+
        'linear-gradient(180deg, #0a0d07 0%, #080a0b 55%, #060809 100%)' }}></div>

      {/* ---------- video hero ---------- */}
      <section className="media-hero relative h-[64vh] min-h-[440px] w-full overflow-hidden">
        <video className="absolute inset-0 h-full w-full object-cover" autoPlay loop muted playsInline preload="metadata">
          <source src={ACADEMY_VIDEO} type="video/mp4" />
        </video>
        {/* dark base + volt/cyan energy wash */}
        <div className="absolute inset-0" style={{background:'linear-gradient(180deg, rgba(6,8,9,.55) 0%, rgba(6,8,9,.35) 34%, rgba(6,8,9,.96) 100%)'}}></div>
        <div className="pointer-events-none absolute inset-0" style={{background:'radial-gradient(60% 70% at 20% 20%, rgba(198,249,78,.16), transparent 55%), radial-gradient(55% 70% at 85% 90%, rgba(53,224,255,.14), transparent 55%)'}}></div>

        <div className="relative z-10 mx-auto flex h-full max-w-4xl items-center justify-center px-6 text-center">
          <div className="pop">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[.22em] text-white backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full" style={{background:VOLT, boxShadow:`0 0 10px ${VOLT}`}}></span>
              1-2-1 · small groups · coaches
            </span>
            <h1 className="hero-title mt-5 text-5xl font-semibold lowercase leading-[.98] md:text-7xl">the performance<br/><span style={{color:VOLT}}>zone</span></h1>
            {/* volt speed line */}
            <div className="mx-auto mt-5 h-[3px] w-40 rounded-full" style={{background:`linear-gradient(90deg, transparent, ${VOLT}, ${CYAN})`}}></div>
            <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-white/80">
              A pitch reborn as a dedicated coaching space — built for sharp 1-2-1s, small groups, and coaches running
              their own clients. Every training tool, ready to go.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <a href="#performancezone-hire" onClick={(e)=>{e.preventDefault(); scrollToId('performancezone-hire');}}><Btn kind="primary" size="lg" iconEnd={I.arrow({})}>book your session</Btn></a>
              <a href="#rates" onClick={(e)=>{e.preventDefault(); scrollToId('rates');}}><Btn kind="outline" size="lg">see rates</Btn></a>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- coach callout strip ---------- */}
      <div className="mx-auto -mt-8 max-w-5xl px-6">
        <Glass strong className="relative z-10 flex flex-col items-center justify-between gap-3 rounded-[26px] px-6 py-5 text-center sm:flex-row sm:text-left">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl" style={{background:VOLT+'22',color:VOLT}}><span style={{width:20,height:20}}>{I.whistle({})}</span></span>
            <div>
              <div className="text-[15px] font-medium lowercase">coaches — this one’s for you</div>
              <div className="text-[13px] text-white/55">Hire the space, bring your clients, keep the income. Regular slots get priority.</div>
            </div>
          </div>
          <a href="#performancezone-hire" onClick={(e)=>{e.preventDefault(); scrollToId('performancezone-hire');}} className="shrink-0"><Btn kind="primary" size="sm" iconEnd={I.arrow({})}>enquire</Btn></a>
        </Glass>
      </div>

      {/* ---------- ways to train ---------- */}
      <Section eyebrow="how it’s used" title="built to develop players">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SESSION_TYPES.map((s,i)=>(
            <Glass key={s.t} className="rounded-3xl p-6 transition-transform duration-300 hover:-translate-y-1 fade-up" style={{animationDelay:(i*.05)+'s'}}>
              <span className="grid h-12 w-12 place-items-center rounded-2xl" style={{background:s.c+'1e',color:s.c}}><span style={{width:22,height:22}}>{s.ic({})}</span></span>
              <div className="mt-4 text-[16px] font-medium lowercase">{s.t}</div>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-white/60">{s.d}</p>
            </Glass>
          ))}
        </div>
      </Section>

      {/* ---------- inside the zone ---------- */}
      <Section eyebrow="inside the zone" title="everything a session needs">
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <Glass strong className="relative overflow-hidden rounded-[30px] p-8">
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-20 blur-3xl" style={{background:VOLT}}></div>
            <p className="relative text-[15px] leading-relaxed text-white/70">
              The Zone runs as <span className="text-white">two dedicated coaching pods</span>, walled off from the main pitches so
              sessions run flat-out without interruption. Every hire comes with the full training set-up ready to go.
            </p>
            <div className="relative mt-6 flex flex-wrap gap-2.5">
              {KIT.map(k=>(
                <span key={k} className="glass glass-soft inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] text-white/80"><span style={{width:15,height:15,color:VOLT}}>{I.check({})}</span>{k}</span>
              ))}
            </div>
          </Glass>
          <Glass className="rounded-3xl p-6">
            <div className="text-[12px] uppercase tracking-wide text-white/45">how hiring works</div>
            <ul className="mt-4 space-y-4 text-[14px] leading-relaxed text-white/70">
              <li className="flex items-start gap-2.5"><span className="mt-0.5 shrink-0" style={{width:16,height:16,color:CYAN}}>{I.user({})}</span><span><span className="text-white">Players & small groups</span> — hire the Zone for yourself, up to 1 hour.</span></li>
              <li className="flex items-start gap-2.5"><span className="mt-0.5 shrink-0" style={{width:16,height:16,color:VOLT}}>{I.whistle({})}</span><span><span className="text-white">Coaches</span> — take the space for the night or full day and run your own client sessions.</span></li>
            </ul>
          </Glass>
        </div>
      </Section>

      {/* ---------- rates ---------- */}
      <div id="rates"></div>
      <Section eyebrow="hire rates" title="pick your hire">
        <div className="grid gap-4 md:grid-cols-2">
          {RATES.map((r,i)=>(
            <Glass key={r.who} strong={!!r.tag} className={`flex flex-col rounded-[28px] p-7 transition-transform duration-300 hover:-translate-y-1 fade-up ${r.tag?'accent-ring':''}`} style={{animationDelay:(i*.06)+'s'}}>
              {r.tag ? <Tag accent className="mb-3 self-start">{r.tag}</Tag> : <span className="mb-3 h-6"></span>}
              <div className="text-[17px] font-medium lowercase">{r.who}</div>
              <div className="mt-1 text-[13px] text-white/45">{r.note}</div>
              <div className="mt-4 flex items-end gap-1"><span className="tnum text-5xl font-semibold" style={r.tag?{color:VOLT}:undefined}>{r.price}</span>{r.unit?<span className="mb-1.5 text-[13px] text-white/45">{r.unit}</span>:null}</div>
              <ul className="mt-6 flex-1 space-y-2.5 text-[14px] text-white/75">
                {r.feat.map(f=><li key={f} className="flex items-center gap-2.5"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full" style={{background:(r.tag?VOLT:CYAN)+'1e',color:r.tag?VOLT:CYAN}}><span style={{width:12,height:12}}>{I.check({})}</span></span>{f}</li>)}
              </ul>
              <a href="#performancezone-hire" onClick={(e)=>{e.preventDefault(); scrollToId('performancezone-hire');}} className="mt-7"><Btn kind={r.tag?'primary':'outline'} size="lg" className="w-full">hire now</Btn></a>
            </Glass>
          ))}
        </div>
      </Section>

      {/* ---------- hire enquiry ---------- */}
      <section id="performancezone-hire" className="mx-auto mt-24 max-w-6xl px-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_440px]">
          <div>
            <Eyebrow>book the zone</Eyebrow>
            <h2 className="hero-title mt-3 text-3xl font-semibold lowercase md:text-4xl">hire the performance zone</h2>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/65">
              Tell us who the session is for and when you’d like it, and we’ll confirm availability and lock it in.
              Coaches: mention if you want a recurring night — regular slots get priority.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {['1-2-1','small groups','coach hire','recurring nights'].map(t=>(
                <span key={t} className="rounded-full px-3 py-1 text-[12px] font-medium" style={{background:VOLT+'1a',color:VOLT}}>{t}</span>
              ))}
            </div>
          </div>
          <Glass strong className="rounded-[30px] p-7">
            <div className="text-[12px] uppercase tracking-wide text-white/45">hire enquiry</div>
            <div className="mt-4">
              <EnquiryForm cta="request a slot" placeholder="e.g. coach — Tuesday nights weekly · or small group of 4, one hour…" />
            </div>
          </Glass>
        </div>
      </section>
      <Footer />
    </div>
  );
}
