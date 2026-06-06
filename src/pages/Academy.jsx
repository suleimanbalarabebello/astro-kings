/* Academy.jsx — Kings Football Academy: coaching & holiday camps */

import { I } from '../lib/icons.jsx';
import { Glass, Btn, Tag, Placeholder, PageHead } from '../components/ui.jsx';
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
      <PageHead eyebrow="kings football academy" title="coaching & camps"
        sub="Weekend and holiday football coaching for kids — loads of football fun with games, skills, challenges, matches and tournaments, led by qualified Academy coaches.">
        <a href="#juniors"><Btn kind="primary" iconEnd={I.arrow({})}>junior memberships</Btn></a>
      </PageHead>

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
