/* PerformanceZone.jsx — The Performance Zone, built for development.
   Real venue content: 2 coaching pods, player/small-group hire (£30, up to 1hr,
   1–6 players) and coach hire (from £60, full day or night, exclusive use). */

import { I } from '../lib/icons.jsx';
import { Glass, Btn, Tag, Eyebrow, PageHead } from '../components/ui.jsx';
import { EnquiryForm } from '../components/Enquiry.jsx';
import { Section } from './Home.jsx';
import { Footer } from '../components/Nav.jsx';

const SESSION_TYPES = [
  { ic:I.user,    t:'1-2-1 sessions',      d:'Focused individual coaching time' },
  { ic:I.ball,    t:'small groups',        d:'Train with up to 6 players' },
  { ic:I.whistle, t:'coach-led sessions',  d:'Coaches run their own client sessions' },
  { ic:I.bolt,    t:'player development',  d:'Technique, speed & sharp decision-making' },
];

const KIT = ['2 coaching pods','Speed ladders & hurdles','Mannequins','Mini-goals','Reaction games','Footballs provided'];

const RATES = [
  {
    who:'players & small groups', price:'£30', unit:'/session', tag:'',
    note:'hire the Zone for yourself — up to 1 hour',
    feat:['Intense coaching pitch set-up','Suitable for 1–6 players','Equipment & footballs available'],
  },
  {
    who:'coaches — full day or night', price:'from £60', unit:'', tag:'for coaches',
    note:'hire the Zone for the night and run your sessions',
    feat:['Intense coaching pitch set-up','Exclusively yours','Equipment included','Advertising board on site','Shared on our socials'],
  },
];

export function PerformanceZone(){
  return (
    <div>
      <PageHead eyebrow="built for development" title="the performance zone"
        sub="The perfect place for individual players or small groups — two coaching pods packed with every training tool you could need, from speed ladders and hurdles to mannequins, mini-goals and reaction games.">
        <a href="#performancezone-hire"><Btn kind="primary" iconEnd={I.arrow({})}>book your session</Btn></a>
      </PageHead>

      {/* limited slots strip */}
      <div className="mx-auto mt-8 max-w-6xl px-6">
        <Glass strong className="flex flex-col items-center justify-between gap-3 rounded-3xl px-6 py-4 text-center sm:flex-row sm:text-left">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full accent-bg text-[#0b0b0b]"><span style={{width:18,height:18}}>{I.bolt({})}</span></span>
            <div>
              <div className="text-[15px] font-medium lowercase">book your session today</div>
              <div className="text-[12.5px] text-white/50">limited slots available every week</div>
            </div>
          </div>
          <div className="text-[11px] uppercase tracking-[.18em] text-white/40">powered by astro kings · connected to notts olympic</div>
        </Glass>
      </div>

      {/* who it's for */}
      <Section eyebrow="how it's used" title="four ways to train">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SESSION_TYPES.map((s,i)=>(
            <Glass key={s.t} className="rounded-3xl p-6 fade-up" style={{animationDelay:(i*.05)+'s'}}>
              <span className="glass grid h-12 w-12 place-items-center rounded-2xl accent-text"><span style={{width:22,height:22}}>{s.ic({})}</span></span>
              <div className="mt-4 text-[16px] font-medium lowercase">{s.t}</div>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-white/55">{s.d}</p>
            </Glass>
          ))}
        </div>
      </Section>

      {/* what's inside */}
      <Section eyebrow="inside the zone" title="everything a session needs">
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <Glass strong className="rounded-[30px] p-8">
            <p className="text-[15px] leading-relaxed text-white/65">
              The Zone runs as <span className="text-white">two dedicated coaching pods</span>, separated from the main pitches so
              sessions run without interruption. Every hire comes with the full training set-up ready to go.
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {KIT.map(k=>(
                <span key={k} className="glass glass-soft inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] text-white/75"><span className="accent-text" style={{width:15,height:15}}>{I.check({})}</span>{k}</span>
              ))}
            </div>
          </Glass>
          <Glass className="rounded-3xl p-6">
            <div className="text-[12px] uppercase tracking-wide text-white/45">how hiring works</div>
            <ul className="mt-4 space-y-3.5 text-[14px] leading-relaxed text-white/70">
              <li className="flex items-start gap-2.5"><span className="accent-text mt-0.5 shrink-0" style={{width:16,height:16}}>{I.user({})}</span><span><span className="text-white">Players & small groups</span> — hire the Zone for yourself, for up to 1 hour.</span></li>
              <li className="flex items-start gap-2.5"><span className="accent-text mt-0.5 shrink-0" style={{width:16,height:16}}>{I.whistle({})}</span><span><span className="text-white">Coaches</span> — hire the Zone for the night (or the full day) to run your own sessions with your clients.</span></li>
            </ul>
          </Glass>
        </div>
      </Section>

      {/* rates — the real two tiers */}
      <Section eyebrow="hire rates" title="pick your hire">
        <div className="grid gap-4 md:grid-cols-2">
          {RATES.map((r,i)=>(
            <Glass key={r.who} strong={!!r.tag} className={`flex flex-col rounded-[28px] p-7 fade-up ${r.tag?'accent-ring':''}`} style={{animationDelay:(i*.06)+'s'}}>
              {r.tag ? <Tag accent className="mb-3 self-start">{r.tag}</Tag> : <span className="mb-3 h-6"></span>}
              <div className="text-[17px] font-medium lowercase">{r.who}</div>
              <div className="mt-1 text-[13px] text-white/45">{r.note}</div>
              <div className="mt-4 flex items-end gap-1"><span className="tnum text-5xl font-semibold">{r.price}</span>{r.unit?<span className="mb-1.5 text-[13px] text-white/45">{r.unit}</span>:null}</div>
              <ul className="mt-6 flex-1 space-y-2.5 text-[14px] text-white/70">
                {r.feat.map(f=><li key={f} className="flex items-center gap-2.5"><span className="glass grid h-6 w-6 shrink-0 place-items-center rounded-full accent-text"><span style={{width:12,height:12}}>{I.check({})}</span></span>{f}</li>)}
              </ul>
              <a href="#performancezone-hire" className="mt-7"><Btn kind={r.tag?'primary':'outline'} size="lg" className="w-full">hire now</Btn></a>
            </Glass>
          ))}
        </div>
      </Section>

      {/* hire enquiry */}
      <section id="performancezone-hire" className="mx-auto mt-20 max-w-6xl px-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_440px]">
          <div>
            <Eyebrow>book the zone</Eyebrow>
            <h2 className="hero-title mt-3 text-3xl font-semibold lowercase md:text-4xl">hire the performance zone</h2>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/65">
              Tell us who the session is for and when you’d like it, and we’ll confirm availability and lock it in.
              Coaches: mention if you want a recurring night — regular slots get priority.
            </p>
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
