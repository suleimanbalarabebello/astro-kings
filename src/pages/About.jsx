/* About.jsx — about, events & contact */

import { I } from '../lib/icons.jsx';
import { CONTACT, PITCH_PHOTO } from '../lib/data.js';
import { Glass, Btn, Field, PageHead } from '../components/ui.jsx';
import { Map } from '../components/Map.jsx';
import { EnquiryForm } from '../components/Enquiry.jsx';
import { Section } from './Home.jsx';
import { Footer } from '../components/Nav.jsx';

export function About(){
  const events = [
    { t:'corporate events', d:'Tournaments, team building & away days.', ic:I.trophy, img:'/corporate.jpg' },
    { t:'birthday parties', d:'From just £4 per child — fully hosted.', ic:I.ball, img:'/party.jpg' },
    { t:'man v fat', d:'Play football, lose weight, win the league.', ic:I.shield, img:'/manvfat-tile.jpg' },
  ];
  return (
    <div>
      <PageHead eyebrow="about astro kings" title="nottingham's home of 5-a-side"
        sub="Since 2016 on Wigman Rd — four floodlit 4G pitches, hot showers, lockers and a café. Built for casual kickabouts, leagues, juniors and big events alike." />

      <div className="mx-auto mt-10 max-w-6xl px-6">
        <div className="relative aspect-[21/9] w-full overflow-hidden rounded-[34px] fade-up">
          <img src={PITCH_PHOTO} alt="Astro Kings floodlit centre" className="absolute inset-0 h-full w-full object-cover" />
        </div>
      </div>

      {/* events */}
      <Section eyebrow="events & experiences" title="more ways to play">
        <div className="grid gap-4 md:grid-cols-3">
          {events.map((e,i)=>(
            <Glass key={i} className="overflow-hidden rounded-3xl">
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <img src={e.img} alt={e.t} className="absolute inset-0 h-full w-full object-cover" />
              </div>
              <div className="p-6">
                <span className="glass grid h-12 w-12 place-items-center rounded-2xl accent-text"><span style={{width:22,height:22}}>{e.ic({})}</span></span>
                <div className="mt-4 text-[18px] font-medium lowercase">{e.t}</div>
                <p className="mt-2 text-[14px] leading-relaxed text-white/55">{e.d}</p>
              </div>
            </Glass>
          ))}
        </div>
      </Section>

      {/* contact + hours */}
      <section className="mx-auto mt-24 max-w-6xl px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          <Glass strong className="rounded-[30px] p-8">
            <h3 className="text-2xl font-medium lowercase">get in touch</h3>
            <p className="mt-2 text-[14px] text-white/55">Booking a group, party or corporate day? Tell us what you need.</p>
            <div className="mt-6">
              <EnquiryForm cta="send enquiry" placeholder="e.g. birthday party for 14 kids on a Saturday…" />
            </div>
          </Glass>

          <aside className="space-y-4">
            <Glass className="rounded-3xl p-6">
              <div className="text-[12px] uppercase tracking-wide text-white/45">visit</div>
              <div className="mt-3 space-y-3 text-[14px] text-white/75">
                <div className="flex items-start gap-2.5"><span className="accent-text" style={{width:17,height:17}}>{I.pin({})}</span>{CONTACT.addr}</div>
                <div className="flex items-center gap-2.5"><span className="accent-text">●</span>{CONTACT.phone}</div>
                <div className="flex items-center gap-2.5"><span className="accent-text">●</span>{CONTACT.email}</div>
              </div>
            </Glass>
            <Glass className="rounded-3xl p-6">
              <div className="flex items-center gap-2 text-[12px] uppercase tracking-wide text-white/45"><span className="accent-text" style={{width:16,height:16}}>{I.clock({})}</span> opening hours</div>
              <div className="mt-3 space-y-2 text-[14px] text-white/75">
                <div className="flex justify-between"><span>Mon – Fri</span><span className="tnum text-white/60">08:00 – 22:00</span></div>
                <div className="flex justify-between"><span>Sat – Sun</span><span className="tnum text-white/60">08:00 – 20:00</span></div>
              </div>
            </Glass>
            <div className="aspect-square w-full overflow-hidden rounded-3xl glass">
              <Map className="h-full w-full" />
            </div>
          </aside>
        </div>
      </section>
      <Footer />
    </div>
  );
}
