/* PerformanceZone.jsx — the Performance Zone: a pitch converted into a coaching
   space for 1-2-1s and small groups. Bookable by individuals, but primarily
   aimed at coaches who hire the space and resell sessions to their own clients.
   TODO: client to supply real hire rates, zone photos, equipment list and any
   block-booking discount structure. */

import { I } from '../lib/icons.jsx';
import { Glass, Btn, Tag, Eyebrow, PageHead } from '../components/ui.jsx';
import { EnquiryForm } from '../components/Enquiry.jsx';
import { Section } from './Home.jsx';
import { Footer } from '../components/Nav.jsx';

/* TODO: real hire pricing */
const RATES = [
  { who:'individuals',   price:'£20', unit:'/hr', feat:['1-2-1 or with a mate','All equipment provided','Book single hours'] },
  { who:'small groups',  price:'£30', unit:'/hr', feat:['Up to 6 players','Ideal for team extras','Parents & players welcome'], tag:'popular' },
  { who:'coaches',       price:'£25', unit:'/hr', feat:['Hire & resell to your clients','Block-booking discounts','Priority weekly slots'], tag:'for coaches' },
];

const KIT = ['Rebound boards','Agility ladders & poles','Mannequins & goals','Ball launcher', 'Video analysis corner','Sprint track markings'];

export function PerformanceZone(){
  return (
    <div>
      <PageHead eyebrow="train like a pro" title="the performance zone"
        sub="A full pitch converted into a dedicated coaching space — built for 1-2-1 sessions, small-group training and professional coaches running their own client sessions.">
        <a href="#performancezone-hire"><Btn kind="primary" iconEnd={I.arrow({})}>book the zone</Btn></a>
      </PageHead>

      {/* what's in the zone */}
      <Section eyebrow="what's inside" title="a space built for development">
        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          <Glass strong className="rounded-[30px] p-8">
            <p className="text-[15px] leading-relaxed text-white/65">
              The Performance Zone is separated from the main pitches so sessions run without interruption —
              no stray balls, no waiting for space. It’s set up for technical work, finishing, strength &amp;
              conditioning circuits and video-reviewed sessions. {/* TODO: real zone photos */}
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {KIT.map(k=>(
                <span key={k} className="glass glass-soft inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] text-white/75"><span className="accent-text" style={{width:15,height:15}}>{I.check({})}</span>{k}</span>
              ))}
            </div>
          </Glass>
          <Glass className="rounded-3xl p-6">
            <div className="text-[12px] uppercase tracking-wide text-white/45">who it's for</div>
            <ul className="mt-4 space-y-3 text-[14px] text-white/70">
              <li className="flex items-start gap-2.5"><span className="accent-text mt-0.5" style={{width:16,height:16}}>{I.user({})}</span>Players wanting focused 1-2-1 time</li>
              <li className="flex items-start gap-2.5"><span className="accent-text mt-0.5" style={{width:16,height:16}}>{I.ball({})}</span>Parents booking small-group sessions</li>
              <li className="flex items-start gap-2.5"><span className="accent-text mt-0.5" style={{width:16,height:16}}>{I.whistle({})}</span><span><span className="text-white">Coaches</span> — hire the zone and run your own paid sessions with your clients</span></li>
            </ul>
          </Glass>
        </div>
      </Section>

      {/* rates */}
      <Section eyebrow="hire rates" title="simple hourly hire">
        <div className="grid gap-4 md:grid-cols-3">
          {RATES.map((r,i)=>(
            <Glass key={r.who} strong={!!r.tag} className={`flex flex-col rounded-[28px] p-7 fade-up ${r.tag==='for coaches'?'accent-ring':''}`} style={{animationDelay:(i*.06)+'s'}}>
              {r.tag ? <Tag accent className="mb-3 self-start">{r.tag}</Tag> : <span className="mb-3 h-6"></span>}
              <div className="text-[17px] font-medium lowercase">{r.who}</div>
              <div className="mt-3 flex items-end gap-1"><span className="tnum text-5xl font-semibold">{r.price}</span><span className="mb-1.5 text-[13px] text-white/45">{r.unit}</span></div>
              <ul className="mt-5 flex-1 space-y-2.5 text-[14px] text-white/70">
                {r.feat.map(f=><li key={f} className="flex items-center gap-2.5"><span className="glass grid h-6 w-6 place-items-center rounded-full accent-text"><span style={{width:12,height:12}}>{I.check({})}</span></span>{f}</li>)}
              </ul>
              <a href="#performancezone-hire" className="mt-6"><Btn kind={r.tag?'primary':'outline'} className="w-full">enquire</Btn></a>
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
              Coaches: mention if you want a recurring weekly slot — block bookings get priority and discounted rates.
            </p>
          </div>
          <Glass strong className="rounded-[30px] p-7">
            <div className="text-[12px] uppercase tracking-wide text-white/45">hire enquiry</div>
            <div className="mt-4">
              <EnquiryForm cta="request a slot" placeholder="e.g. coach, 6pm Tuesdays weekly, small group of 4…" />
            </div>
          </Glass>
        </div>
      </section>
      <Footer />
    </div>
  );
}
