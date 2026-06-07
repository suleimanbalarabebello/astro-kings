/* Clubs.jsx — club hire: winter training discounts, club prices, fundraising */

import { I } from '../lib/icons.jsx';
import { CONTACT, PITCHES, store } from '../lib/data.js';
import { go } from '../lib/router.js';
import { Glass, Btn, Tag, Field, PageHead } from '../components/ui.jsx';
import { EnquiryForm } from '../components/Enquiry.jsx';
import { Section } from './Home.jsx';
import { Footer } from '../components/Nav.jsx';

export function Clubs(){
  const rates = [
    { slot:'Before 7pm', price:'£40', was:'£55' },
    { slot:'7pm – 9pm',  price:'£45', was:'£55' },
    { slot:'9pm – 10pm', price:'£40', was:'£55' },
    { slot:'5+ teams',   price:'call us', was:'' },
  ];
  return (
    <div>
      <PageHead eyebrow="clubs & teams" title="club hire" sub="More teams = bigger discount." >
        <a href="#club-enquiry"><Btn kind="primary" iconEnd={I.arrow({})}>get a quote</Btn></a>
      </PageHead>

      {/* discounts intro + get in touch */}
      <section className="mx-auto mt-12 max-w-6xl px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="fade-up">
            <h2 className="hero-title text-3xl md:text-4xl font-semibold lowercase">get big discounts when your club trains at astro kings</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-white/65">Looking for winter football training facilities? Block-book with Astro Kings and play on our all-weather 4G pitches.</p>
            <h3 className="mt-7 text-xl font-medium lowercase">winter training dates</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-white/65">Our winter training prices begin at the start of September and run through to the end of April every year.</p>
            <h3 className="mt-6 text-xl font-medium lowercase">4g pitches are safer for your players</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-white/65">In winter, old sand-based pitches often become slippery in the rain — especially when it freezes. Our 4G is a true all-weather surface designed for moulded studs, so when other venues close in bad weather, we don't.</p>
          </div>

          {/* get in touch form */}
          <aside id="club-enquiry">
            <Glass strong className="rounded-[28px] p-7">
              <div className="text-[12px] uppercase tracking-wide text-white/45">get in touch</div>
              <div className="mt-4"><EnquiryForm cta="get in touch" labels={false} placeholder="Send a message — how many teams & when?" /></div>
              <p className="mt-3 text-center text-[12px] text-white/40">or call {CONTACT.phone}</p>
            </Glass>
          </aside>
        </div>
      </section>

      {/* club pitch hire prices */}
      <Section eyebrow="club rates" title="club pitch hire prices">
        <div className="mx-auto max-w-3xl">
          <Glass strong className="overflow-hidden rounded-[30px] p-2 fade-up">
            <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 px-5 py-3 text-[11px] uppercase tracking-wide text-white/40">
              <span>training slot</span><span className="text-right">club rate</span><span className="text-right">usual</span>
            </div>
            {rates.map((r,i)=>(
              <div key={i} className="grid grid-cols-[1fr_auto_auto] items-center gap-x-4 rounded-2xl px-5 py-4 text-[15px] odd:bg-white/[.03]">
                <span className="font-medium">{r.slot}</span>
                <span className="tnum text-right text-xl font-semibold accent-text">{r.price}{r.price!=='call us' ? <span className="text-[12px] font-normal text-white/45">/hr</span> : null}</span>
                <span className="tnum text-right text-[13px] text-white/35 line-through">{r.was}</span>
              </div>
            ))}
          </Glass>
          <p className="mt-4 text-center text-[13px] text-white/45">Winter season rates · more teams = bigger discount · ask us about bulk block bookings.</p>
        </div>
      </Section>

      {/* support sport lottery */}
      <section className="mx-auto mt-24 max-w-6xl px-6">
        <Glass strong className="overflow-hidden rounded-[34px] p-8 text-center accent-ring md:p-12">
          <div className="pointer-events-none absolute -inset-20 opacity-60" style={{background:'radial-gradient(40% 60% at 50% 0%, color-mix(in oklab, var(--accent), transparent 70%), transparent)'}}></div>
          <div className="relative">
            <Tag accent>support sport lottery</Tag>
            <h2 className="hero-title mt-5 text-3xl md:text-4xl font-semibold lowercase">raise funds for your club</h2>
            <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-white/65">A lottery is a reliable income stream that can run for years and help cover the cost of running a club — but doing it properly is time-consuming. Support Sport Lottery does the hard work for you: entries are just 50p and 28p in every £1 goes straight to your club, versus 28p per £1 to good causes on the National Lottery.</p>
            <div className="mt-7"><Btn kind="primary" size="lg" iconEnd={I.arrow({})}>find out more</Btn></div>
          </div>
        </Glass>
      </section>

      {/* football pitch hire prices */}
      <Section eyebrow="pitch hire" title="football pitch hire prices">
        <p className="-mt-2 mb-6 max-w-2xl text-[15px] leading-relaxed text-white/60">Every pitch hire includes changing facilities, hot showers, secure lockers and the café. All pitches are 4G rubber-crumb with LED floodlights and rebound boards.</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {PITCHES.map((p,i)=>(
            <Glass key={p.id} className="flex flex-col rounded-3xl p-6 fade-up" style={{animationDelay:(i*.05)+'s'}}>
              <div className="text-[16px] font-medium">{p.name}</div>
              <div className="mt-3 flex items-end gap-1"><span className="tnum text-4xl font-semibold">£{p.price}</span><span className="mb-1 text-[12px] text-white/45">{p.unit}</span></div>
              <div className="mt-3 flex-1 text-[13px] text-white/55">{p.goals}</div>
              <Btn kind="primary" size="sm" className="mt-5 w-full" iconEnd={I.arrow({})} onClick={()=>{ store.venue=p.id; go('booking',{p:p.id}); }}>hire now</Btn>
            </Glass>
          ))}
          <Glass className="flex flex-col rounded-3xl p-6 fade-up" style={{animationDelay:'.25s'}}>
            <div className="text-[16px] font-medium">Pay &amp; Play</div>
            <div className="mt-3 flex items-end gap-1"><span className="tnum text-4xl font-semibold">£3.50</span><span className="mb-1 text-[12px] text-white/45">/pp</span></div>
            <div className="mt-3 flex-1 text-[13px] text-white/55">Before 6pm every day · 2 players min</div>
            <Btn kind="outline" size="sm" className="mt-5 w-full" iconEnd={I.arrow({})} onClick={()=>go('browse')}>off peak</Btn>
          </Glass>
        </div>
      </Section>

      {/* about our pitches */}
      <section className="mx-auto mt-20 max-w-6xl px-6">
        <Glass strong className="rounded-[30px] p-8 md:p-10">
          <h3 className="text-2xl font-medium lowercase">about our pitches</h3>
          <p className="mt-4 text-[15px] leading-relaxed text-white/65">All Astro Kings pitches use the latest 4G rubber-crumb artificial grass. We offer two types of 5-a-side pitch — <span className="text-white/85">Classic</span> and <span className="text-white/85">Samba</span> — plus a <span className="text-white/85">big pitch</span> large enough for 9-a-side games or training sessions.</p>
          <p className="mt-3 text-[15px] leading-relaxed text-white/65">The Classic 5-a-side has 12ft × 4ft goals — perfect for slotting the ball into the corner after a slick passing move. The Samba pitch has 12ft × 6ft goals so you can smash it into the corner after dribbling past the entire opposition.</p>
          <p className="mt-3 text-[15px] leading-relaxed text-white/65">Every pitch has state-of-the-art LED lighting for instant, uniform light, rebound boards and five-metre netting to keep the ball in play for fast-flowing football.</p>
        </Glass>
      </section>
      <Footer />
    </div>
  );
}
