/* Events.jsx — football corporate events */

import { I } from '../lib/icons.jsx';
import { CONTACT } from '../lib/data.js';
import { Glass, Btn, Tag, Field, PageHead } from '../components/ui.jsx';
import { Section } from './Home.jsx';
import { Footer } from '../components/Nav.jsx';

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
  return (
    <div>
      <PageHead eyebrow="events & experiences" title="football corporate events"
        sub="You've found Nottingham's best venue for football-based corporate events — Astro Kings' state-of-the-art 4G pitches alongside the redeveloped Harvey Hadden Sports Village.">
        <a href="#events-enquiry"><Btn kind="primary" iconEnd={I.arrow({})}>plan your event</Btn></a>
      </PageHead>

      {/* great corporate events + event ideas */}
      <section className="mx-auto mt-12 max-w-6xl px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          <div className="fade-up">
            <h2 className="hero-title text-3xl md:text-4xl font-semibold lowercase">choose a package or build your own</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-white/65">Starting from simple pitch hire, you can build an event to suit your staff or clients. Run it yourself or let us run it for you — team-building games, football tournaments, a big match, coaching, pretty much anything you can think of.</p>
            <p className="mt-3 text-[15px] leading-relaxed text-white/65">Food starts at £4.50 per person, but we can lay on a banquet fit for a king. Photos, trophies, medals or an event pack with something for every player — just tell us what you're looking for.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#events-enquiry"><Btn kind="primary" iconEnd={I.arrow({})}>enquire now</Btn></a>
              <a href="#manvfat"><Btn kind="outline">man v fat football</Btn></a>
            </div>
          </div>
          <Glass strong className="overflow-hidden rounded-[28px] p-2 fade-up">
            <div className="px-5 py-3 text-center text-[12px] uppercase tracking-[.2em] text-white/45">event ideas</div>
            {ideas.map((x,i)=>(
              <div key={i} className="flex items-center gap-3 rounded-2xl px-5 py-3 text-[14px] text-white/80 odd:bg-white/[.03]">
                <span className="accent-text" style={{width:15,height:15}}>{I.check({})}</span>{x}
              </div>
            ))}
          </Glass>
        </div>
      </section>

      {/* tournament packages — self managed vs managed */}
      <Section eyebrow="tournament packages" title="let us take the stress out">
        <p className="-mt-2 mb-6 max-w-2xl text-[15px] leading-relaxed text-white/60">Run your staff or client tournament yourself, or let us take care of everything so you can sit back and enjoy the day. Here's the difference.</p>
        <div className="grid gap-4 md:grid-cols-2">
          {[['self managed', selfManaged, false],['fully managed', managed, true]].map(([title,list,hot],i)=>(
            <Glass key={i} strong={hot} className={`rounded-[28px] p-7 fade-up ${hot?'accent-ring':''}`} style={{animationDelay:(i*.06)+'s'}}>
              <div className="flex items-center justify-between">
                <div className="text-[18px] font-medium lowercase">{title}</div>
                {hot ? <Tag accent>most popular</Tag> : null}
              </div>
              <ul className="mt-5 space-y-3 text-[14px] text-white/75">
                {list.map(f=><li key={f} className="flex items-center gap-3"><span className="glass grid h-6 w-6 place-items-center rounded-full accent-text"><span style={{width:13,height:13}}>{I.check({})}</span></span>{f}</li>)}
              </ul>
            </Glass>
          ))}
        </div>
      </Section>

      {/* event extras */}
      <Section eyebrow="event extras" title="finish it in style">
        <Glass strong className="rounded-[30px] p-7 md:p-8">
          <p className="text-[15px] leading-relaxed text-white/65">Complete your event with food, drink and awards. We hold an alcohol licence, rooms are available for hire, and the on-site kitchen can serve food fit for a king — why not add a video and photos of the day?</p>
          <div className="mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {extras.map((e,i)=>(
              <div key={i} className="flex items-center gap-2.5 text-[14px] text-white/75"><span className="accent-text" style={{width:15,height:15}}>{I.check({})}</span>{e}</div>
            ))}
          </div>
        </Glass>
      </Section>

      {/* get in touch */}
      <section id="events-enquiry" className="mx-auto mt-24 max-w-6xl px-6">
        <Glass strong className="rounded-[34px] p-8 md:p-12">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="hero-title text-3xl md:text-4xl font-semibold lowercase">get in touch</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-white/60">Call <span className="accent-text">{CONTACT.phone}</span> or fill in the form and one of the team will be in touch to build your perfect event.</p>
            </div>
            <form onSubmit={e=>e.preventDefault()} className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="name" icon={I.user({})}><input className="w-full bg-transparent text-[14px] outline-none placeholder:text-white/35" placeholder="Your name" /></Field>
                <Field label="contact number" icon={I.user({})}><input className="w-full bg-transparent text-[14px] outline-none placeholder:text-white/35" placeholder="07…" /></Field>
              </div>
              <Field label="email" icon={I.user({})}><input className="w-full bg-transparent text-[14px] outline-none placeholder:text-white/35" placeholder="you@email.com" /></Field>
              <label className="block">
                <span className="mb-2 block text-[12px] uppercase tracking-wide text-white/45">tell us about your event</span>
                <textarea rows="3" className="glass glass-soft w-full rounded-2xl px-4 py-3 text-[14px] outline-none placeholder:text-white/35" placeholder="e.g. 24 staff, tournament + food, a Friday afternoon…"></textarea>
              </label>
              <Btn kind="primary" size="lg" type="submit" className="w-full" iconEnd={I.arrow({})}>get in touch</Btn>
            </form>
          </div>
        </Glass>
      </section>
      <Footer />
    </div>
  );
}
