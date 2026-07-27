/* NottsOlympic.jsx — Notts Olympic Football Club: the historic club behind the
   centre. Rebuilt from nottsolympic.com with the real story — founded 1882, the
   Herbert Kilpin / AC Milan connection, the modern comeback in the Notts Senior
   League — styled in our dark theme with the club's red + green crest colours.

   Placeholders / TODO: real squad list, fixtures, ground, sponsorship pack. */

import { I } from '../lib/icons.jsx';
import { Glass, Btn, Eyebrow } from '../components/ui.jsx';
import { EnquiryForm } from '../components/Enquiry.jsx';
import { Section } from './Home.jsx';
import { Footer } from '../components/Nav.jsx';

/* club colours (from the crest) */
const RED = '#E23744';
const GREEN = '#33A457';

const CREST = '/nottsolympic-crest.png';
const PATREON = 'https://www.patreon.com/NottsOlympicFootballClub';
const SENIOR_LEAGUE = 'https://www.nottsseniorleague.co.uk/';

/* every channel the club is on (TODO: confirm exact YouTube/TikTok/Threads handles) */
const SOCIALS = [
  { label:'Instagram', short:'ig', to:'https://www.instagram.com/nottsolympic' },
  { label:'Facebook',  short:'f',  to:'https://www.facebook.com/NottsOlympic' },
  { label:'X',         short:'x',  to:'https://twitter.com/NottsOlympic' },
  { label:'YouTube',   short:'yt', to:'https://www.youtube.com/@nottsolympic' },
  { label:'TikTok',    short:'tk', to:'https://www.tiktok.com/@nottsolympic' },
  { label:'Threads',   short:'th', to:'https://www.threads.net/@nottsolympic' },
];

/* Notts Olympic has adopted the policies of Nottinghamshire FA */
const POLICIES = [
  'FA Safeguarding Children Policy (Youth Teams)',
  'FA Safeguarding Children Policy (Adult Teams)',
  'Safeguarding Declaration — Youth Football',
  'Safeguarding Declaration — Open Age Football',
  'FA Equality Policy',
  'FA Football Leadership Diversity Code',
  'FA Club Rules & Constitution',
];

const FACTS = [
  { v:'est. 1882',        l:'one of the originals', c:RED },
  { v:'FA Cup 1885/86',   l:'the world’s oldest cup', c:GREEN },
  { v:'per sempre calcio',l:'forever football', c:RED },
  { v:'Notts Senior League', l:'back since 2023/24', c:GREEN },
];

const SUPPORT = [
  { ic:I.star,   t:'the 1882 supporters club', c:RED,
    d:'Join the community chat, share your ideas and experiences, be part of the conversations, and help carry out the plans for the season and the future of the club. Help run it, vote on key decisions, have your say.',
    cta:'i want to support', to:PATREON, ext:true },
  { ic:I.ball,   t:'the 100 club', c:GREEN,
    d:'£10 a number, drawn monthly. The winner takes a big share of the pot, and everything left over goes straight back into the club.',
    cta:'100 club sign up', to:'#partner' },   /* TODO: real 100 Club signup link */
  { ic:I.trophy, t:'sponsor the club', c:RED,
    d:'Sponsor a junior or first-team player, an NSL league game or the cup run, or advertise in the matchday programme. Options for every budget, from £5 to £1,500.',
    cta:'i can sponsor', to:'#partner' },
];

const PARTNERS = [
  { name:'Social Kicks',     to:'http://socialkicks.co.uk' },
  { name:'Nottingham Events', to:'http://www.nottinghamevents.co.uk' },
  { name:'Notts Senior League', to:SENIOR_LEAGUE },
];

/* TODO: client to supply full squad, staff, fixtures & results */
const TEAMS = [
  { c:RED,   t:'first team', league:'Notts Senior League',
    d:'Senior men’s football, competing week in, week out as the club climbs back up the pyramid.' },
  { c:GREEN, t:'juniors', league:'Kids Football League',
    d:'Boys’ and girls’ teams playing through the Kids Football League here at Astro Kings — the pathway to the senior side.' },
];

/* crest emblem — feathered so its backdrop melts into the page */
function Crest({ className='' }){
  return (
    <img src={CREST} alt="Notts Olympic FC crest" fetchpriority="high"
      className={`drop-shadow-[0_22px_50px_rgba(0,0,0,.55)] ${className}`}
      style={{ WebkitMaskImage:'radial-gradient(closest-side, #000 76%, transparent 100%)', maskImage:'radial-gradient(closest-side, #000 76%, transparent 100%)' }} />
  );
}

export function NottsOlympic(){
  return (
    /* scope the brand accent to club RED for this whole page — buttons, links,
       glows and the enquiry form all pick it up via var(--accent) */
    <div style={{ '--accent': RED, '--accent-2': '#F0838C' }}>
      {/* page-scoped backdrop — deep crimson/green wash so the club reads as its own space */}
      <div className="pointer-events-none fixed inset-0" style={{ zIndex:-1, background:
        'radial-gradient(70% 55% at 12% 0%, rgba(226,55,68,.16), transparent 55%),'+
        'radial-gradient(70% 55% at 90% 6%, rgba(51,164,87,.13), transparent 55%),'+
        'radial-gradient(95% 70% at 50% 120%, rgba(226,55,68,.10), transparent 60%),'+
        'linear-gradient(180deg, #120a0c 0%, #0d0a0b 55%, #080809 100%)' }}></div>

      {/* ---------- hero ---------- */}
      <section className="relative w-full overflow-hidden pt-20 md:pt-24">
        {/* ambient red/green wash */}
        <div className="pointer-events-none absolute inset-x-0 top-6 h-[540px]" style={{background:'radial-gradient(58% 58% at 28% 42%, rgba(51,164,87,.14), transparent 70%), radial-gradient(58% 58% at 74% 42%, rgba(226,55,68,.16), transparent 70%)'}}></div>

        {/* tablet / desktop: full-bleed banner with the club name overlaid */}
        <div className="relative hidden w-full md:block">
          <img src="/nottsolympic-hero.png" alt="Notts Olympic FC" fetchpriority="high" className="block w-full" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-16" style={{background:'linear-gradient(to top, transparent, rgba(18,10,12,.92))'}}></div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24" style={{background:'linear-gradient(to bottom, transparent, rgba(18,10,12,.96))'}}></div>
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
            <h1 className="hero-title font-semibold lowercase leading-[.95] text-white" style={{ fontSize:'clamp(2.5rem, 6vw, 5rem)', textShadow:'0 2px 22px rgba(0,0,0,.45)' }}>notts olympic fc</h1>
            <div className="mt-3 text-[15px] italic tracking-wide text-white/85 md:text-[17px]" style={{textShadow:'0 1px 10px rgba(0,0,0,.5)'}}>“per sempre calcio” — <span className="not-italic text-white/60">forever football</span></div>
          </div>
        </div>

        {/* mobile: the crest emblem hero (unchanged) */}
        <div className="px-6 pt-8 md:hidden">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <Crest className="w-40" />
            <div className="mt-5 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[.24em] text-white/60">
              <span className="h-1.5 w-1.5 rounded-full" style={{background:RED, boxShadow:`0 0 10px ${RED}`}}></span>
              nottingham · founded 1882
            </div>
            <h1 className="hero-title mt-4 text-5xl font-semibold lowercase leading-[1]">notts olympic fc</h1>
            <div className="mt-4 text-[15px] italic tracking-wide text-white/80">“per sempre calcio” — <span className="not-italic text-white/50">forever football</span></div>
          </div>
        </div>

        {/* shared subtitle + CTAs */}
        <div className="mx-auto max-w-2xl px-6 pt-5 pb-4 text-center md:pt-8">
          <p className="mx-auto max-w-xl text-[15px] leading-relaxed text-white/70">
            One of football’s original clubs — reborn. From the 1880s FA Cup to founding AC&nbsp;Milan, and now back on
            the pitch in the Notts Senior League, playing out of Astro Kings.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <a href={PATREON} target="_blank" rel="noreferrer"><Btn kind="primary" size="lg" iconEnd={I.arrow({})}>support the club</Btn></a>
            <a href="#story"><Btn kind="outline" size="lg">our story</Btn></a>
          </div>
        </div>
      </section>

      {/* ---------- fact ribbon ---------- */}
      <section className="mx-auto mt-8 max-w-4xl px-6">
        <Glass strong className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3 rounded-full px-7 py-5">
          {FACTS.map((f,i)=>(
            <div key={i} className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full" style={{background:f.c, boxShadow:`0 0 10px ${f.c}`}}></span>
              <span className="text-[14.5px] font-semibold lowercase text-white/95">{f.v}</span>
              <span className="hidden text-[13px] text-white/45 sm:inline">{f.l}</span>
            </div>
          ))}
        </Glass>
      </section>

      {/* ---------- the story ---------- */}
      <div id="story"></div>
      <Section eyebrow="our history" title="one of football’s originals">
        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <div className="text-[16px] leading-relaxed text-white/70">
            <p>Notts Olympic was among the very first organised football clubs in the country — competing in the
              <span className="text-white"> FA Cup as far back as 1885/86</span>, in the same era as Nottingham Forest
              and Leicester City. This is heritage football, from the game’s earliest days.</p>
            <p className="mt-4">After decades in the dark, the club has been re-established under <span className="text-white">NOFC&nbsp;1882&nbsp;Ltd.</span> —
              taking its place back in competitive football with one aim: to restore Notts Olympic to its historic
              heights, and one day walk out in the FA Cup again.</p>
          </div>
          <Glass className="rounded-[26px] p-6">
            <div className="text-[12px] uppercase tracking-[.2em]" style={{color:RED}}>the mission</div>
            <ul className="mt-4 space-y-3 text-[15px] text-white/80">
              {['Put a proud old club back on the map','Build a home and a squad','Climb the pyramid, season by season','Keep the community at the heart of it'].map(f=>(
                <li key={f} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full" style={{background:GREEN+'22',color:GREEN}}><span style={{width:13,height:13}}>{I.check({})}</span></span>{f}
                </li>
              ))}
            </ul>
          </Glass>
        </div>
      </Section>

      {/* ---------- the AC Milan connection (the jewel) ---------- */}
      <section className="mx-auto mt-24 max-w-6xl px-6">
        <Glass strong className="relative overflow-hidden rounded-[34px]">
          <div className="grid lg:grid-cols-2">
            {/* photo fills the whole left panel, duotoned to the club red/black */}
            <div className="relative min-h-[300px] overflow-hidden lg:min-h-[460px]">
              <img src="/kilpin.png" alt="Herbert Kilpin in AC Milan stripes"
                   className="absolute inset-0 h-full w-full object-cover object-top" style={{ objectPosition:'50% 15%' }} />
              <div className="absolute inset-0" style={{ background:'linear-gradient(135deg, rgba(226,55,68,.28), rgba(10,8,9,.5))', mixBlendMode:'multiply' }}></div>
              {/* fade into the text panel (right on desktop, bottom on mobile) */}
              <div className="absolute inset-0 hidden lg:block" style={{ background:'linear-gradient(to right, transparent 55%, rgba(18,10,12,.9))' }}></div>
              <div className="absolute inset-0 lg:hidden" style={{ background:'linear-gradient(to bottom, transparent 55%, rgba(18,10,12,.9))' }}></div>
              <div className="absolute bottom-5 left-6 text-[12px] text-white/70">Herbert Kilpin · founder of AC Milan</div>
            </div>

            {/* text panel */}
            <div className="relative p-8 md:p-12">
              <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full opacity-20 blur-3xl" style={{background:RED}}></div>
              <div className="relative">
                <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide" style={{background:RED+'22',color:RED}}>the rossoneri connection</div>
                <h3 className="hero-title mt-4 text-4xl font-semibold lowercase md:text-5xl">from nottingham to milan</h3>
                <div className="mt-5 text-[16px] leading-relaxed text-white/75">
                  <p><span className="text-white">Herbert Kilpin</span> was born in Nottingham and played for Notts Olympic at
                    the Forest Recreation Ground. He moved to Italy for the lace trade, fell for the game there, and in 1899
                    helped found one of the biggest clubs on earth — <span className="text-white">AC&nbsp;Milan</span>.</p>
                  <p className="mt-4 border-l-2 pl-4 text-[15px] italic text-white/70" style={{borderColor:RED}}>
                    “We shall be a team of devils. Our colours will be red like fire, and black like the fear we shall
                    invoke in our opponents.”
                  </p>
                  <p className="mt-4 text-[14px] text-white/55">That Italian bloodline is why our motto reads <span className="text-white/80">per sempre calcio</span> — forever football.</p>
                </div>
              </div>
            </div>
          </div>
        </Glass>
      </section>

      {/* ---------- the comeback / home ---------- */}
      <Section title="back on the pitch">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { c:RED,   t:'a proper home', d:'The club is rebuilding out of Astro Kings — Harvey Hadden Sports Village — with training and matchdays on brand-new 4G.' },
            { c:GREEN, t:'in the league', d:'Notts Olympic took its place in the Notts Senior League from the 2023/24 season, competing week in, week out.' },
            { c:RED,   t:'a pathway for kids', d:'The Kids Football League runs here too — a route from first kicks all the way to the senior side.' },
          ].map((x,i)=>(
            <Glass key={i} className="rounded-3xl p-6 fade-up" style={{animationDelay:(i*.06)+'s'}}>
              <span className="grid h-11 w-11 place-items-center rounded-2xl" style={{background:x.c+'22',color:x.c}}><span style={{width:20,height:20}}>{I.shield({})}</span></span>
              <div className="mt-4 text-[17px] font-medium lowercase">{x.t}</div>
              <p className="mt-2 text-[14px] leading-relaxed text-white/60">{x.d}</p>
            </Glass>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <a href={SENIOR_LEAGUE} target="_blank" rel="noreferrer"><Btn kind="outline" size="sm" icon={I.trophy({})} iconEnd={I.arrow({})}>notts senior league</Btn></a>
          <a href="#coaching"><Btn kind="outline" size="sm" iconEnd={I.arrow({})}>the kids league</Btn></a>
        </div>
      </Section>

      {/* ---------- teams ---------- */}
      <Section eyebrow="who plays" title="our teams">
        <div className="grid gap-4 md:grid-cols-2">
          {TEAMS.map((t,i)=>(
            <Glass key={t.t} className="rounded-3xl p-7 fade-up" style={{animationDelay:(i*.06)+'s'}}>
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl" style={{background:t.c+'22',color:t.c}}><span style={{width:20,height:20}}>{I.ball({})}</span></span>
                <div>
                  <div className="text-[18px] font-medium lowercase">{t.t}</div>
                  <div className="text-[12px] uppercase tracking-wide" style={{color:t.c}}>{t.league}</div>
                </div>
              </div>
              <p className="mt-4 text-[14px] leading-relaxed text-white/60">{t.d}</p>
            </Glass>
          ))}
        </div>
        <p className="mt-4 text-[13px] text-white/45">Full squad, fixtures and results coming soon. Want to play for Notts Olympic? <a href="#partner" className="accent-text hover:underline">Get in touch about trials</a> or <a href="#coaching" className="accent-text hover:underline">start in the juniors</a>.</p>
      </Section>

      {/* ---------- get involved ---------- */}
      <Section eyebrow="get involved" title="help write the next chapter">
        <p className="-mt-2 mb-7 max-w-2xl text-[15px] leading-relaxed text-white/65">
          This is a club where you can make a difference — no matter how small. Play a small part, or become a
          significant contributor with ideas you see through. Support us on social media, be at the games, or get
          involved within the club itself. The best part of supporting Notts Olympic is that <span className="text-white">you choose
          how, and what suits you best</span>.
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          {SUPPORT.map((s,i)=>(
            <Glass key={s.t} strong className="flex flex-col rounded-3xl p-6 fade-up" style={{animationDelay:(i*.06)+'s'}}>
              <span className="grid h-12 w-12 place-items-center rounded-2xl" style={{background:s.c+'22',color:s.c}}><span style={{width:22,height:22}}>{s.ic({})}</span></span>
              <div className="mt-4 text-[17px] font-medium lowercase">{s.t}</div>
              <p className="mt-2 flex-1 text-[14px] leading-relaxed text-white/60">{s.d}</p>
              <a href={s.to} {...(s.ext?{target:'_blank',rel:'noreferrer'}:{})} className="mt-4"><Btn kind="outline" size="sm" iconEnd={I.arrow({})}>{s.cta}</Btn></a>
            </Glass>
          ))}
        </div>

        {/* join the board */}
        <Glass className="mt-4 flex flex-col items-start justify-between gap-4 rounded-3xl p-6 md:flex-row md:items-center">
          <div className="flex items-start gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl" style={{background:GREEN+'22',color:GREEN}}><span style={{width:22,height:22}}>{I.shield({})}</span></span>
            <div>
              <div className="text-[17px] font-medium lowercase">join the 1882 club board</div>
              <p className="mt-1 text-[14px] leading-relaxed text-white/60">Help us run the club, vote on key decisions and have your say in where Notts Olympic goes next.</p>
            </div>
          </div>
          <a href={PATREON} target="_blank" rel="noreferrer" className="shrink-0"><Btn kind="primary" iconEnd={I.arrow({})}>get on board</Btn></a>
        </Glass>
      </Section>

      {/* ---------- partners ---------- */}
      <section className="mx-auto mt-20 max-w-6xl px-6">
        <div className="text-center text-[11px] uppercase tracking-[.24em] text-white/40">proudly working with</div>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          {PARTNERS.map(p=>(
            <a key={p.name} href={p.to} target="_blank" rel="noreferrer"
               className="glass glass-soft rounded-2xl px-5 py-3 text-[14px] text-white/75 transition hover:bg-white/10 hover:text-white">{p.name}</a>
          ))}
        </div>
      </section>

      {/* ---------- watch NOFC ---------- */}
      <Section eyebrow="watch nofc" title="follow every kick">
        <Glass strong className="flex flex-col items-center gap-6 rounded-[30px] p-8 text-center md:flex-row md:justify-between md:p-10 md:text-left">
          <div className="max-w-xl">
            <p className="text-[15px] leading-relaxed text-white/70">
              Match streams, highlights and behind-the-scenes as we climb back up the pyramid. We’re on every channel —
              YouTube, TikTok, X, Facebook, Instagram and Threads. Follow along and never miss a game.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {SOCIALS.map(s=>(
              <a key={s.short} href={s.to} target="_blank" rel="noreferrer" aria-label={`Notts Olympic on ${s.label}`} title={s.label}
                 className="glass grid h-11 w-11 place-items-center rounded-full text-[13px] font-medium text-white/75 transition hover:bg-white/10 hover:text-white">{s.short}</a>
            ))}
          </div>
        </Glass>
      </Section>

      {/* ---------- club policies ---------- */}
      <Section eyebrow="safe & proper" title="club policies">
        <p className="-mt-2 mb-6 max-w-2xl text-[15px] leading-relaxed text-white/65">
          Notts Olympic has adopted the policies of Nottinghamshire FA. These are in force across the club —
          request a copy of any document via the contact form below.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {POLICIES.map((p,i)=>(
            <div key={p} className="flex items-center gap-3 rounded-2xl glass glass-soft px-4 py-3.5 fade-up" style={{animationDelay:(i*.03)+'s'}}>
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg" style={{background:GREEN+'1e',color:GREEN}}><span style={{width:16,height:16}}>{I.shield({})}</span></span>
              <span className="text-[14px] text-white/80">{p}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* ---------- partner / sponsor enquiry ---------- */}
      <section id="partner" className="mx-auto mt-24 max-w-6xl px-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
          <div>
            <Eyebrow>partner with us</Eyebrow>
            <h2 className="hero-title mt-3 text-3xl font-semibold lowercase md:text-4xl">sponsor a piece of history</h2>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/65">
              Back a club with real heritage and real momentum. Sponsor a junior or first-team player, an NSL league
              game or the cup run, or advertise in the new home-ground matchday programme. Options for every budget,
              <span className="text-white"> from £5 to £1,500</span> — and every pound goes straight back into putting
              Notts Olympic where it belongs. Tell us what you have in mind and we’ll send the sponsorship pack.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {['Sponsor a player','NSL league game','Cup run','Programme advert','£5–£1,500'].map(t=>(
                <span key={t} className="rounded-full px-3 py-1 text-[12px] font-medium" style={{background:GREEN+'1e',color:GREEN}}>{t}</span>
              ))}
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-2.5">
              {SOCIALS.map(s=>(
                <a key={s.short} href={s.to} target="_blank" rel="noreferrer" aria-label={`Notts Olympic on ${s.label}`} title={s.label}
                   className="glass grid h-10 w-10 place-items-center rounded-full text-[13px] text-white/70 transition hover:bg-white/10 hover:text-white">{s.short}</a>
              ))}
            </div>
          </div>
          <Glass strong className="rounded-[30px] p-7">
            <div className="text-[12px] uppercase tracking-wide text-white/45">sponsorship enquiry</div>
            <div className="mt-4">
              <EnquiryForm cta="enquire about sponsorship" placeholder="Tell us about your business and what you have in mind…" />
            </div>
          </Glass>
        </div>
      </section>

      <Footer />
    </div>
  );
}
