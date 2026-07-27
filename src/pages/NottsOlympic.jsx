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
const SOCIAL = {
  twitter:  'https://twitter.com/NottsOlympic',
  facebook: 'https://www.facebook.com/NottsOlympic',
  instagram:'https://www.instagram.com/nottsolympic',
};
const SENIOR_LEAGUE = 'https://www.nottsseniorleague.co.uk/';

const FACTS = [
  { v:'est. 1882',        l:'one of the originals', c:RED },
  { v:'FA Cup 1885/86',   l:'the world’s oldest cup', c:GREEN },
  { v:'per sempre calcio',l:'forever football', c:RED },
  { v:'Notts Senior League', l:'back since 2023/24', c:GREEN },
];

const SUPPORT = [
  { ic:I.star,   t:'join the supporters club', c:RED,
    d:'Have your say, help shape our future and help run the club — from just a few pounds a month on Patreon.',
    cta:'become a supporter', to:PATREON, ext:true },
  { ic:I.trophy, t:'sponsor the club', c:GREEN,
    d:'Shirt, pitchside and matchday sponsorship — put your business in front of the community while backing grassroots football.',
    cta:'enquire below', to:'#partner' },
  { ic:I.user,   t:'follow every game', c:RED,
    d:'Results, matchday news and behind-the-scenes as we climb back up the pyramid.',
    cta:'follow on instagram', to:SOCIAL.instagram, ext:true },
];

const PARTNERS = [
  { name:'Social Kicks',     to:'http://socialkicks.co.uk' },
  { name:'Nottingham Events', to:'http://www.nottinghamevents.co.uk' },
  { name:'Notts Senior League', to:SENIOR_LEAGUE },
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
    <div>
      {/* page-scoped backdrop — deep crimson/green wash so the club reads as its own space */}
      <div className="pointer-events-none fixed inset-0" style={{ zIndex:-1, background:
        'radial-gradient(70% 55% at 12% 0%, rgba(226,55,68,.16), transparent 55%),'+
        'radial-gradient(70% 55% at 90% 6%, rgba(51,164,87,.13), transparent 55%),'+
        'radial-gradient(95% 70% at 50% 120%, rgba(226,55,68,.10), transparent 60%),'+
        'linear-gradient(180deg, #120a0c 0%, #0d0a0b 55%, #080809 100%)' }}></div>

      {/* ---------- hero ---------- */}
      <section className="relative w-full overflow-hidden px-6 pt-28 pb-4 md:pt-32">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <Crest className="w-40 md:w-52" />
          <div className="mt-5 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[.24em] text-white/60">
            <span className="h-1.5 w-1.5 rounded-full" style={{background:RED, boxShadow:`0 0 10px ${RED}`}}></span>
            nottingham · founded 1882
          </div>
          <h1 className="hero-title mt-4 text-5xl font-semibold lowercase leading-[1] md:text-7xl">notts olympic fc</h1>
          <div className="mt-4 text-[15px] italic tracking-wide text-white/80">“per sempre calcio” — <span className="not-italic text-white/50">forever football</span></div>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-white/70">
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
        <Glass strong className="relative overflow-hidden rounded-[34px] p-8 md:p-12">
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full opacity-25 blur-3xl" style={{background:RED}}></div>
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full opacity-20 blur-3xl" style={{background:GREEN}}></div>
          <div className="relative grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide" style={{background:RED+'22',color:RED}}>the rossoneri connection</div>
              <div className="hero-title mt-4 text-4xl font-semibold lowercase md:text-5xl">from nottingham<br/>to milan</div>
            </div>
            <div className="text-[16px] leading-relaxed text-white/75">
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

      {/* ---------- support ---------- */}
      <Section eyebrow="get involved" title="help write the next chapter">
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

      {/* ---------- partner / sponsor enquiry ---------- */}
      <section id="partner" className="mx-auto mt-24 max-w-6xl px-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
          <div>
            <Eyebrow>partner with us</Eyebrow>
            <h2 className="hero-title mt-3 text-3xl font-semibold lowercase md:text-4xl">sponsor a piece of history</h2>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/65">
              Back a club with real heritage and real momentum. From shirt and pitchside sponsorship to matchday
              support, every pound goes straight back into putting Notts Olympic where it belongs. Tell us what you
              have in mind and we’ll send the sponsorship pack.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {['Shirt sponsor','Pitchside boards','Matchday sponsor','Community partner'].map(t=>(
                <span key={t} className="rounded-full px-3 py-1 text-[12px] font-medium" style={{background:GREEN+'1e',color:GREEN}}>{t}</span>
              ))}
            </div>
            <div className="mt-7 flex items-center gap-2.5">
              {[['ig',SOCIAL.instagram],['f',SOCIAL.facebook],['x',SOCIAL.twitter]].map(([lbl,to])=>(
                <a key={lbl} href={to} target="_blank" rel="noreferrer" aria-label={`Notts Olympic on ${lbl}`}
                   className="glass grid h-10 w-10 place-items-center rounded-full text-[13px] text-white/70 transition hover:bg-white/10 hover:text-white">{lbl}</a>
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
