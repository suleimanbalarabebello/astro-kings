/* Academy.jsx — Kings Football Academy: coaching & holiday camps */

import { I } from '../lib/icons.jsx';
import { ACADEMY_VIDEO } from '../lib/data.js';
import { Glass, Btn, Tag, Placeholder, Eyebrow } from '../components/ui.jsx';
import { Section } from './Home.jsx';
import { Footer } from '../components/Nav.jsx';

export function Academy(){
  /* indicative camp pricing — confirm the venue's live prices before launch */
  const camps = [
    { n:'Single Day', price:'£18', unit:'/day', tag:'',
      feat:['9am–3pm full day','Games, skills & tournaments','Bring lunch or buy on-site'] },
    { n:'3-Day Camp', price:'£48', unit:'/3 days', tag:'',
      feat:['Three full days','Save vs the daily rate','Holiday-week fun'] },
    { n:'5-Day Camp', price:'£72', unit:'/week', tag:'best value',
      feat:['Full week — one day free','Games, matches & challenges','Priority for Kings Club members'] },
  ];
  const trust = [
    { ic:I.shield, t:'safe & secure', d:'DBS-checked, first-aid qualified coaches and secure, supervised pitches.' },
    { ic:I.whistle, t:'fa-affiliated', d:'Delivered by Kings Football Academy, a local FA-affiliated club.' },
    { ic:I.bolt, t:'all-weather 4G', d:'LED-lit 4G means camps run rain or shine, all year round.' },
  ];
  return (
    <div>
      {/* video hero */}
      <section className="media-hero relative h-[58vh] min-h-[400px] w-full overflow-hidden">
        <video className="absolute inset-0 h-full w-full object-cover" poster="/academy-poster.jpg" autoPlay loop muted playsInline preload="metadata">
          <source src={ACADEMY_VIDEO} type="video/mp4" />
        </video>
        <div className="absolute inset-0" style={{background:'linear-gradient(180deg, rgba(4,7,10,.42) 0%, rgba(4,7,10,.32) 38%, rgba(4,7,10,.94) 100%)'}}></div>
        <div className="relative z-10 mx-auto flex h-full max-w-4xl items-center justify-center px-6 text-center">
          <div className="pop text-center">
            <Eyebrow>kings football academy</Eyebrow>
            <h1 className="hero-title mt-4 text-5xl font-semibold leading-[1.04] lowercase md:text-7xl">coaching &amp; camps</h1>
            <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-white/70">Weekend and holiday football coaching for kids — games, skills, challenges, matches and tournaments, led by qualified Academy coaches.</p>
            <a href="#juniors" className="mt-6 inline-block"><Btn kind="primary" iconEnd={I.arrow({})}>junior memberships</Btn></a>
          </div>
        </div>
      </section>

      <Section eyebrow="holiday camps" title="loads of football fun"
        action={<a href="#about" className="hidden md:block"><Btn kind="outline" size="sm" iconEnd={I.arrow({})}>book a camp</Btn></a>}>
        <div className="grid gap-4 md:grid-cols-3">
          {camps.map((m,i)=>(
            <Glass key={m.n} strong={i===2} className={`flex flex-col rounded-[28px] p-7 fade-up ${i===2?'accent-ring':''}`} style={{animationDelay:(i*.06)+'s'}}>
              {m.tag ? <Tag accent className="self-start mb-3">{m.tag}</Tag> : <span className="mb-3 h-6"></span>}
              <div className="text-[19px] font-medium lowercase">{m.n}</div>
              <div className="mt-5 flex items-end gap-1"><span className="tnum text-5xl font-semibold">{m.price}</span><span className="mb-1.5 text-[13px] text-white/45">{m.unit}</span></div>
              <ul className="mt-6 flex-1 space-y-3 text-[14px] text-white/70">
                {m.feat.map(f=><li key={f} className="flex items-center gap-3"><span className="glass grid h-6 w-6 place-items-center rounded-full accent-text"><span style={{width:13,height:13}}>{I.check({})}</span></span>{f}</li>)}
              </ul>
              <a href="#about" className="mt-7"><Btn kind={i===2?'primary':'outline'} size="lg" className="w-full">book {m.n.toLowerCase()}</Btn></a>
            </Glass>
          ))}
        </div>
      </Section>

      <Section eyebrow="why parents choose us" title="qualified, safe & fun">
        <div className="grid gap-4 md:grid-cols-3">
          {trust.map((w,i)=>(
            <Glass key={i} className="rounded-3xl p-7 fade-up" style={{animationDelay:(i*.05)+'s'}}>
              <span className="glass grid h-14 w-14 place-items-center rounded-2xl accent-text"><span style={{width:26,height:26}}>{w.ic({})}</span></span>
              <div className="mt-6 text-2xl font-medium lowercase">{w.t}</div>
              <p className="mt-2 text-[14px] leading-relaxed text-white/55">{w.d}</p>
            </Glass>
          ))}
        </div>
      </Section>
      <Footer />
    </div>
  );
}
