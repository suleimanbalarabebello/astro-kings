/* Events.jsx — Book an Event: zorb football, darts, tournaments, team-building
   and corporate days. The page gives the info and funnels every enquiry to us
   directly (form, phone, email).

   Look: its own celebratory identity — amber/gold + violet on a warm-dark
   backdrop, scoped to this page. */

import { I } from '../lib/icons.jsx';
import { scrollToId } from '../lib/router.js';
import { CONTACT } from '../lib/data.js';
import { Glass, Btn, Tag, Eyebrow } from '../components/ui.jsx';
import { EnquiryForm } from '../components/Enquiry.jsx';
import { Section } from './Home.jsx';
import { Footer } from '../components/Nav.jsx';

/* events palette */
const AMBER = '#F5B22D';   // gold / celebration — primary
const VIOLET = '#B15CFF';  // fun / social — secondary

const EVENTS = [
  { ic:I.ball,   c:AMBER,  t:'zorb football',       d:'Bubble-suit chaos — brilliant for groups, stag & hen dos.' },
  { ic:I.star,   c:VIOLET, t:'darts & social games', d:'Soft darts, table games and more, off the pitch.' },
  { ic:I.trophy, c:AMBER,  t:'tournaments',          d:'5-a-side cups for work, clubs or mates.' },
  { ic:I.user,   c:VIOLET, t:'team building',        d:'Coached games & challenge days that actually bond a team.' },
];

export function Events(){
  const ideas = ['big match','skills coaching','team-building games','tournament','food & event extras','alcohol served','private room'];
  const selfManaged = ['parking','changing & storage','pitch hire','referees'];
  const managed = ['parking','changing & storage','pitch hire','referees','tournament set-up','full event management','all the stress taken away'];
  const extras = [
    'Food from £4.50 a head — all dietary requirements catered for',
    'Medals & trophy pack',
    'Photography & video of the day',
    'Private room hire for awards',
    'Bar facilities available',
  ];
  const jump = (id)=>(e)=>{ e.preventDefault(); scrollToId(id); };

  return (
    /* scope the brand accent to AMBER for this page (buttons, links, glows) */
    <div style={{ '--accent': AMBER, '--accent-2': '#FBD37A' }}>
      {/* page-scoped warm backdrop — amber + violet glows on warm-dark */}
      <div className="pointer-events-none fixed inset-0" style={{ zIndex:-1, background:
        'radial-gradient(70% 55% at 12% 0%, rgba(245,178,45,.15), transparent 55%),'+
        'radial-gradient(70% 55% at 90% 6%, rgba(177,92,255,.14), transparent 55%),'+
        'radial-gradient(95% 70% at 50% 120%, rgba(245,178,45,.08), transparent 60%),'+
        'linear-gradient(180deg, #0d0a06 0%, #0a0809 55%, #070607 100%)' }}></div>

      {/* ---------- image hero ---------- */}
      <section className="media-hero relative h-[62vh] min-h-[440px] w-full overflow-hidden">
        <img src="/corporate.jpg" alt="An event at Astro Kings" fetchpriority="high" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0" style={{background:'linear-gradient(180deg, rgba(7,6,7,.55) 0%, rgba(7,6,7,.4) 34%, rgba(7,6,7,.96) 100%)'}}></div>
        <div className="pointer-events-none absolute inset-0" style={{background:'radial-gradient(60% 70% at 18% 20%, rgba(245,178,45,.18), transparent 55%), radial-gradient(55% 70% at 85% 85%, rgba(177,92,255,.16), transparent 55%)'}}></div>

        <div className="relative z-10 mx-auto flex h-full max-w-4xl items-center justify-center px-6 text-center">
          <div className="pop">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[.22em] text-white backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full" style={{background:AMBER, boxShadow:`0 0 10px ${AMBER}`}}></span>
              events &amp; experiences
            </span>
            <h1 className="hero-title mt-5 text-5xl font-semibold lowercase leading-[.98] md:text-7xl">book an <span style={{color:AMBER}}>event</span></h1>
            <div className="mx-auto mt-5 h-[3px] w-40 rounded-full" style={{background:`linear-gradient(90deg, transparent, ${AMBER}, ${VIOLET})`}}></div>
            <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-white/80">
              Zorb football, darts, tournaments, team-building and corporate days — Nottingham’s best venue for sports
              events, on state-of-the-art 4G at the redeveloped Harvey Hadden Sports Village.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <a href="#events-enquiry" onClick={jump('events-enquiry')}><Btn kind="primary" size="lg" iconEnd={I.arrow({})}>plan your event</Btn></a>
              <a href="#whats-on" onClick={jump('whats-on')}><Btn kind="outline" size="lg">what’s on</Btn></a>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- quick-enquiry strip ---------- */}
      <div className="mx-auto -mt-8 max-w-5xl px-6">
        <Glass strong className="relative z-10 flex flex-col items-center justify-between gap-3 rounded-[26px] px-6 py-5 text-center sm:flex-row sm:text-left">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl" style={{background:AMBER+'22',color:AMBER}}><span style={{width:20,height:20}}>{I.bolt({})}</span></span>
            <div>
              <div className="text-[15px] font-medium lowercase">enquire direct to the team</div>
              <div className="text-[13px] text-white/55">Tell us your idea and we’ll build it around you — no middlemen.</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a href={'tel:'+CONTACT.phone.replace(/\s/g,'')}><Btn kind="outline" size="sm" icon={I.clock({})}>{CONTACT.phone}</Btn></a>
            <a href="#events-enquiry" onClick={jump('events-enquiry')}><Btn kind="primary" size="sm" iconEnd={I.arrow({})}>enquire</Btn></a>
          </div>
        </Glass>
      </div>

      {/* ---------- event types ---------- */}
      <div id="whats-on"></div>
      <Section eyebrow="what’s on" title="pick your kind of chaos">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {EVENTS.map((s,i)=>(
            <Glass key={s.t} className="rounded-3xl p-6 transition-transform duration-300 hover:-translate-y-1 fade-up" style={{animationDelay:(i*.05)+'s'}}>
              <span className="grid h-12 w-12 place-items-center rounded-2xl" style={{background:s.c+'1e',color:s.c}}><span style={{width:22,height:22}}>{s.ic({})}</span></span>
              <div className="mt-4 text-[16px] font-medium lowercase">{s.t}</div>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-white/60">{s.d}</p>
            </Glass>
          ))}
        </div>
      </Section>

      {/* ---------- build your own + ideas ---------- */}
      <section className="mx-auto mt-16 max-w-6xl px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          <div className="fade-up">
            <h2 className="hero-title text-3xl md:text-4xl font-semibold lowercase">choose a package or build your own</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-white/70">Starting from simple pitch hire, build an event to suit your staff or clients. Run it yourself or let us run it for you — team-building games, tournaments, a big match, coaching, pretty much anything you can dream up.</p>
            <p className="mt-3 text-[15px] leading-relaxed text-white/70">Food starts at £4.50 per person, but we can lay on a banquet fit for a king. Photos, trophies, medals or a full event pack — just tell us what you’re after.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#events-enquiry" onClick={jump('events-enquiry')}><Btn kind="primary" iconEnd={I.arrow({})}>enquire now</Btn></a>
              <a href="#manvfat"><Btn kind="outline">man v fat football</Btn></a>
            </div>
          </div>
          <Glass strong className="overflow-hidden rounded-[28px] p-2 fade-up">
            <div className="px-5 py-3 text-center text-[12px] uppercase tracking-[.2em] text-white/45">event ideas</div>
            {ideas.map((x,i)=>(
              <div key={i} className="flex items-center gap-3 rounded-2xl px-5 py-3 text-[14px] text-white/80 odd:bg-white/[.03]">
                <span style={{width:15,height:15,color:i%2?VIOLET:AMBER}}>{I.check({})}</span>{x}
              </div>
            ))}
          </Glass>
        </div>
      </section>

      {/* ---------- tournament packages ---------- */}
      <Section eyebrow="tournament packages" title="let us take the stress out">
        <p className="-mt-2 mb-6 max-w-2xl text-[15px] leading-relaxed text-white/65">Run your staff or client tournament yourself, or let us handle everything so you can enjoy the day. Here’s the difference.</p>
        <div className="grid gap-4 md:grid-cols-2">
          {[['self managed', selfManaged, false],['fully managed', managed, true]].map(([title,list,hot],i)=>(
            <Glass key={i} strong={hot} className={`rounded-[28px] p-7 transition-transform duration-300 hover:-translate-y-1 fade-up ${hot?'accent-ring':''}`} style={{animationDelay:(i*.06)+'s'}}>
              <div className="flex items-center justify-between">
                <div className="text-[18px] font-medium lowercase">{title}</div>
                {hot ? <Tag accent>most popular</Tag> : null}
              </div>
              <ul className="mt-5 space-y-3 text-[14px] text-white/75">
                {list.map(f=><li key={f} className="flex items-center gap-3"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full" style={{background:(hot?AMBER:VIOLET)+'1e',color:hot?AMBER:VIOLET}}><span style={{width:13,height:13}}>{I.check({})}</span></span>{f}</li>)}
              </ul>
            </Glass>
          ))}
        </div>
      </Section>

      {/* ---------- event extras ---------- */}
      <Section eyebrow="event extras" title="finish it in style">
        <Glass strong className="relative overflow-hidden rounded-[30px] p-7 md:p-8">
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-20 blur-3xl" style={{background:VIOLET}}></div>
          <p className="relative text-[15px] leading-relaxed text-white/70">Complete your event with food, drink and awards. We hold an alcohol licence, rooms are available for hire, and the on-site kitchen can serve food fit for a king — why not add a video and photos of the day?</p>
          <div className="relative mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {extras.map((e,i)=>(
              <div key={i} className="flex items-center gap-2.5 text-[14px] text-white/75"><span style={{width:15,height:15,color:i%2?VIOLET:AMBER}}>{I.check({})}</span>{e}</div>
            ))}
          </div>
        </Glass>
      </Section>

      {/* ---------- enquire direct ---------- */}
      <section id="events-enquiry" className="mx-auto mt-24 max-w-6xl px-6">
        <Glass strong className="relative overflow-hidden rounded-[34px] p-8 md:p-12">
          <div className="pointer-events-none absolute -left-16 -bottom-16 h-64 w-64 rounded-full opacity-20 blur-3xl" style={{background:AMBER}}></div>
          <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <Eyebrow>enquire direct</Eyebrow>
              <h2 className="hero-title mt-3 text-3xl md:text-4xl font-semibold lowercase">let’s build your event</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-white/65">Fill in the form and one of the team will come straight back to build your perfect day — or reach us directly:</p>
              <div className="mt-5 space-y-2.5 text-[14px]">
                <a href={'tel:'+CONTACT.phone.replace(/\s/g,'')} className="flex items-center gap-3 text-white/80 hover:text-white"><span className="grid h-9 w-9 place-items-center rounded-full" style={{background:AMBER+'22',color:AMBER}}><span style={{width:16,height:16}}>{I.clock({})}</span></span>{CONTACT.phone}</a>
                <a href={'mailto:'+CONTACT.email} className="flex items-center gap-3 text-white/80 hover:text-white"><span className="grid h-9 w-9 place-items-center rounded-full" style={{background:VIOLET+'22',color:VIOLET}}><span style={{width:16,height:16}}>{I.arrow({})}</span></span>{CONTACT.email}</a>
                <div className="flex items-center gap-3 text-white/60"><span className="grid h-9 w-9 place-items-center rounded-full" style={{background:AMBER+'22',color:AMBER}}><span style={{width:16,height:16}}>{I.pin({})}</span></span>{CONTACT.addr}</div>
              </div>
            </div>
            <EnquiryForm cta="send enquiry" placeholder="e.g. 24 staff, tournament + food, a Friday afternoon…" />
          </div>
        </Glass>
      </section>
      <Footer />
    </div>
  );
}
