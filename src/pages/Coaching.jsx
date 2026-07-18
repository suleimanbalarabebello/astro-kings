/* Coaching.jsx — Kids Coaching: the Notts Olympic kids football league & coaching.
   Structure modelled on kidsfootballleague.co.uk (weekly age-group sessions that
   play as a league) — fully re-branded as Notts Olympic; no copied branding.
   TODO: client to supply real age groups, session days/times, prices and
   coach bios. */

import { I } from '../lib/icons.jsx';
import { JUNIORS_VIDEO } from '../lib/data.js';
import { Glass, Btn, Tag, Eyebrow } from '../components/ui.jsx';
import { EnquiryForm } from '../components/Enquiry.jsx';
import { Section } from './Home.jsx';
import { Footer } from '../components/Nav.jsx';

/* TODO: real age groups, days and times */
const GROUPS = [
  { age:'U5–U6',  day:'Saturdays',  time:'09:00–09:45', note:'first-kicks intro' },
  { age:'U7–U8',  day:'Saturdays',  time:'10:00–11:00', note:'skills + small games' },
  { age:'U9–U11', day:'Saturdays',  time:'11:15–12:15', note:'league matchdays' },
  { age:'U12–U14',day:'Wednesdays', time:'17:30–18:30', note:'league matchdays' },
];

const STEPS = [
  { n:'01', t:'book a free taster', d:'First session is free — come and see if it’s for you.' },
  { n:'02', t:'join your age group', d:'Weekly coached sessions with kids the same age.' },
  { n:'03', t:'play in the league', d:'Small-sided games every week — every child plays.' },
  { n:'04', t:'progress to the club', d:'A pathway into Notts Olympic junior teams.' },
];

export function Coaching(){
  return (
    <div>
      {/* video hero */}
      <section className="relative h-[58vh] min-h-[400px] w-full overflow-hidden">
        <video className="absolute inset-0 h-full w-full object-cover" autoPlay loop muted playsInline preload="metadata">
          <source src={JUNIORS_VIDEO} type="video/mp4" />
        </video>
        <div className="absolute inset-0" style={{background:'linear-gradient(180deg, rgba(4,7,10,.42) 0%, rgba(4,7,10,.32) 38%, rgba(4,7,10,.94) 100%)'}}></div>
        <div className="relative z-10 mx-auto flex h-full max-w-4xl items-center justify-center px-6 text-center">
          <div className="pop text-center">
            <Eyebrow>notts olympic juniors</Eyebrow>
            <h1 className="hero-title mt-4 text-5xl font-semibold leading-[1.04] lowercase md:text-7xl">kids coaching &amp; league</h1>
            <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-white/70">Weekly coached football for boys and girls — learn the game, then play it for real in our kids league.</p>
            <a href="#coaching" className="mt-6 inline-block"><Btn kind="primary" iconEnd={I.arrow({})}>book a free taster</Btn></a>
          </div>
        </div>
      </section>

      {/* how it works */}
      <Section eyebrow="how it works" title="from first kicks to matchdays">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s,i)=>(
            <Glass key={s.n} className="rounded-3xl p-6 fade-up" style={{animationDelay:(i*.05)+'s'}}>
              <div className="tnum text-3xl font-semibold accent-text">{s.n}</div>
              <div className="mt-4 text-[17px] font-medium lowercase">{s.t}</div>
              <p className="mt-2 text-[14px] leading-relaxed text-white/55">{s.d}</p>
            </Glass>
          ))}
        </div>
      </Section>

      {/* age groups */}
      <Section eyebrow="find your group" title="age groups & sessions">
        <div className="overflow-hidden rounded-[28px] glass">
          <div className="grid md:grid-cols-4">
            {GROUPS.map((g,i)=>(
              <div key={g.age} className={`p-6 text-center fade-up ${i>0?'border-t border-white/8 md:border-t-0 md:border-l':''}`} style={{animationDelay:(i*.05)+'s'}}>
                <div className="text-[12px] uppercase tracking-[.2em] text-white/45">{g.age}</div>
                <div className="mt-3 text-[17px] font-medium">{g.day}</div>
                <div className="tnum mt-1 text-[14px] text-white/60">{g.time}</div>
                <div className="mt-3"><Tag>{g.note}</Tag></div>
              </div>
            ))}
          </div>
        </div>
        {/* TODO: real per-session price */}
        <p className="mt-4 text-[13px] text-white/45">Sessions from £5 per week · first taster session free · all coaches DBS-checked &amp; FA qualified.</p>
      </Section>

      {/* register */}
      <section className="mx-auto mt-20 max-w-6xl px-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_440px]">
          <div>
            <h2 className="hero-title text-3xl font-semibold lowercase md:text-4xl">register your child</h2>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/65">
              Tell us your child’s name and age and which day suits, and we’ll book their free taster and
              confirm everything by email. No commitment until you’ve tried a session.
            </p>
            <ul className="mt-6 space-y-3 text-[14px] text-white/70">
              {['Every child plays every week','Small groups, qualified coaches','A clear pathway into Notts Olympic junior teams'].map(f=>(
                <li key={f} className="flex items-center gap-3"><span className="glass grid h-6 w-6 place-items-center rounded-full accent-text"><span style={{width:13,height:13}}>{I.check({})}</span></span>{f}</li>
              ))}
            </ul>
          </div>
          <Glass strong className="rounded-[30px] p-7">
            <div className="text-[12px] uppercase tracking-wide text-white/45">book a free taster</div>
            <div className="mt-4">
              <EnquiryForm cta="register interest" placeholder="Child’s name, age, and which day suits…" />
            </div>
          </Glass>
        </div>
      </section>
      <Footer />
    </div>
  );
}
