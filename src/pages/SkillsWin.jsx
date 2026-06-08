/* SkillsWin.jsx — "Show us your skills and win at Astro Kings".
   Mirrors the live page: hero → upload/prizes + featured video → video row →
   facilities → how to find us (map). */

import { I } from '../lib/icons.jsx';
import { CONTACT } from '../lib/data.js';
import { Btn, PageHead } from '../components/ui.jsx';
import { Map } from '../components/Map.jsx';
import { Footer } from '../components/Nav.jsx';

/* Skill-clip cards link out to YouTube. Owner: swap href for real video embeds. */
const SEARCH = 'https://www.youtube.com/results?search_query=soccer+am+skill+skool';
const CLIPS = [
  { title:'Classic Skill Skool: Marcus', channel:'Soccer AM' },
  { title:'Skill Skool — Liverpool',      channel:'Soccer AM' },
  { title:'Classic Skill Skool: Bristol', channel:'Soccer AM' },
  { title:'Notts County Skills School',   channel:'Benjammie18' },
];

const SOCIALS = [
  { label:'Twitter',   handle:'@astro_kings',    href:'https://twitter.com/astro_kings' },
  { label:'Facebook',  handle:'/astrokings',     href:'https://facebook.com/astrokings' },
  { label:'Instagram', handle:'/astro_kings_uk', href:'https://instagram.com/astro_kings_uk' },
];

const FACILITIES = [
  { ic:I.shield, t:'3G pitch surface',      d:'All our football pitches have a brand-new 3G surface.' },
  { ic:I.bolt,   t:'floodlights',           d:'State-of-the-art LED floodlights for a bright, uniform light.' },
  { ic:I.ball,   t:'choose your pitch type', d:'Classic pitches have 4ft goals and Samba pitches have 6ft goals.' },
  { ic:I.shower, t:'changing facilities',   d:'Hot showers and secure changing facilities before and after the game.' },
];

function VideoCard({ title, channel, big=false }){
  return (
    <a href={SEARCH} target="_blank" rel="noreferrer"
       className={`group relative block overflow-hidden rounded-2xl glass ${big?'aspect-video':'aspect-video'}`}>
      <div className="absolute inset-0" style={{background:'linear-gradient(135deg, #2a2f36, #14171c)'}}></div>
      {/* title bar */}
      <div className="absolute inset-x-0 top-0 z-10 flex items-start gap-2 p-3">
        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white/15 text-[10px] font-bold">AK</span>
        <div className="leading-tight">
          <div className="text-[13px] font-semibold text-white line-clamp-1">{title}</div>
          <div className="text-[11px] text-white/55">{channel}</div>
        </div>
      </div>
      {/* play button */}
      <span className="absolute left-1/2 top-1/2 z-10 grid h-12 w-[68px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-xl bg-[#f00] transition group-hover:scale-105">
        <span className="ml-0.5 h-0 w-0 border-y-[9px] border-l-[15px] border-y-transparent border-l-white"></span>
      </span>
      <span className="absolute bottom-3 right-3 z-10 text-[11px] text-white/70">Watch on YouTube</span>
    </a>
  );
}

export function SkillsWin(){
  return (
    <div>
      <PageHead eyebrow="competition" title="show us your skills and win at astro kings"
        sub="Upload videos of your best skills and tag us for your chance to win free passes, footballs and other goodies." />

      {/* upload / prizes + featured video */}
      <section className="mx-auto mt-12 max-w-6xl px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold leading-snug md:text-3xl">Upload videos of your best skills and tag us for your chance to win free passes, footballs and other goodies.</h2>
            <p className="mt-5 text-[15px] leading-relaxed text-white/65">
              To enter, all you need to do is post your skills online and tag us for your chance to win. It’s free to enter and you can post as many videos as you want.
            </p>
            <ul className="mt-5 space-y-2 text-[14px] text-white/75">
              {SOCIALS.map(s=>(
                <li key={s.label} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full accent-bg"></span>
                  {s.label} <a href={s.href} target="_blank" rel="noreferrer" className="accent-text hover:underline">{s.handle}</a>
                </li>
              ))}
            </ul>
            <h3 className="mt-8 text-xl font-semibold lowercase">prizes</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-white/65">
              We’ll let you know about all the prizes on our social media accounts, so follow, like and get involved!
            </p>
          </div>
          <div>
            <VideoCard title="Classic Skill Skool: Raheem Sterling" channel="Soccer AM" big />
          </div>
        </div>
      </section>

      {/* video row */}
      <section className="mx-auto mt-10 max-w-6xl px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CLIPS.map((c,i)=><VideoCard key={i} title={c.title} channel={c.channel} />)}
        </div>
      </section>

      {/* facilities */}
      <section className="mx-auto mt-16 max-w-6xl px-6">
        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {FACILITIES.map((f,i)=>(
            <div key={i} className="text-center fade-up" style={{animationDelay:(i*.05)+'s'}}>
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-full border-2 border-[var(--accent)] accent-text"><span style={{width:26,height:26}}>{f.ic({})}</span></span>
              <div className="mt-4 text-[15px] font-semibold lowercase">{f.t}</div>
              <p className="mt-1.5 text-[13px] leading-relaxed text-white/55">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* how to find us */}
      <section className="mx-auto mt-20 max-w-6xl px-6">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <h2 className="hero-title text-3xl font-semibold lowercase md:text-4xl">how to find us</h2>
            <p className="mt-5 text-[15px] leading-relaxed text-white/65">
              Astro Kings 5-a-side football centre is located next to the Harvey Hadden Sports Village in Nottingham, NG8.
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-white/65">
              The ground is easily accessible from the M1 Junction 26 — it’s just 4 minutes from the motorway to the pitches.
              It’s ideal for players located in Ilkeston, Beeston, Bilborough, Stapleford and Hucknall areas.
            </p>
            <p className="mt-3 text-[15px] text-white/65">Contact us on <span className="accent-text">{CONTACT.phone}</span> for more information.</p>
            <a href="#getagame" className="mt-6 inline-block"><Btn kind="primary" iconEnd={I.arrow({})}>get a game</Btn></a>
          </div>
          <div className="aspect-[4/3] w-full overflow-hidden rounded-[30px] glass">
            <Map className="h-full w-full" />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
