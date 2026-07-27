/* Coaching.jsx — the Kids Football League (KFL), run at Astro Kings.
   Rebuilt to carry EVERYTHING the standalone kidsfootballleague.co.uk site
   offers so this can become the league's main page: the story, the three
   leagues (Foundation / Development / Academy), the running divisions, the
   training timetable, the 8 teams, how the free trial works, what membership
   includes, the FAQ and registration.

   Design: our dark stadium-night base with bright, kid-friendly colour pops
   (colour-coded leagues + vivid team crests) so it reads as the fun kids'
   league while staying cohesive with the rest of the site.

   Placeholders in use (swap for real assets when supplied):
   • team crests = emoji + colour gradients (real badges to replace)
   • booking + league-table links point at the platforms KFL uses today. */

import { useState } from 'react';
import { I } from '../lib/icons.jsx';
import { JUNIORS_VIDEO, CONTACT } from '../lib/data.js';
import { Glass, Btn, Tag, Eyebrow } from '../components/ui.jsx';
import { EnquiryForm } from '../components/Enquiry.jsx';
import { Section } from './Home.jsx';
import { Footer } from '../components/Nav.jsx';

/* external platforms the league runs on today — TODO: confirm with the client */
const BOOK_TRIAL_URL   = 'https://kids-fl.class4kids.co.uk/';
const LEAGUE_TABLES_URL = 'https://kfl1.leaguerepublic.com/';

/* the three leagues — colour-coded, in progression order */
const LEAGUES = [
  { key:'foundation',  name:'Foundation',  c:'#34D399', runs:'Sundays',
    tag:'beginners welcome',
    d:'Where the journey starts. Specially designed sessions teach the FUNdamentals every young player needs to take that next step — most of our players are pulling on a team shirt for the very first time.' },
  { key:'development', name:'Development', c:'#38BDF8', runs:'Saturdays · girls',
    tag:'the next step',
    d:'Once the FUNdamentals are nailed, it’s time to move on. A more competitive and detailed division where confidence turns into real match understanding.' },
  { key:'academy',     name:'Academy',     c:'#A78BFA', runs:'Sundays',
    tag:'tactical & technical',
    d:'The players now understand the game, know how they want to play and are shaping their own tactical preferences. A more tactical, technical division for our older players.' },
];

/* weekly training timetable */
const TRAINING = [
  { age:'ages 5–9',  days:'Mon · Tue · Wed', time:'5:00–6:00pm' },
  { age:'ages 10+',  days:'Mon · Tue · Wed', time:'6:00–7:00pm' },
];

/* the 8 teams. `logo` is a real badge dropped into /public — if the file isn't
   there yet, the Crest falls back to the emoji + colour placeholder. */
const TEAMS = [
  { name:'Dragons',  emoji:'🐉', a:'#F97316', b:'#DC2626', logo:'/team-dragons.png' },
  { name:'Wasps',    emoji:'🐝', a:'#FACC15', b:'#B45309', logo:'/team-wasps.png' },
  { name:'Bears',    emoji:'🐻', a:'#D97706', b:'#78350F', logo:'/team-bears.png' },
  { name:'Lions',    emoji:'🦁', a:'#FCD34D', b:'#D97706', logo:'/team-lions.png' },
  { name:'Sharks',   emoji:'🦈', a:'#38BDF8', b:'#1D4ED8', logo:'/team-sharks.png' },
  { name:'Hawks',    emoji:'🦅', a:'#818CF8', b:'#3730A3', logo:'/team-hawks.png' },
  { name:'Panthers', emoji:'🐆', a:'#E879F9', b:'#7E22CE', logo:'/team-panthers.png' },
  { name:'Ducks',    emoji:'🦆', a:'#34D399', b:'#0F766E', logo:'/team-ducks.png' },
];

/* how the free trial → team works */
const STEPS = [
  { n:'01', t:'book a free trial',   d:'Pick the training day that suits you — the first session is completely free.' },
  { n:'02', t:'come and play',       d:'Our coaches watch every player during their trial week, in a relaxed, welcoming session.' },
  { n:'03', t:'get assigned a team', d:'We place each child in a team where they’ll shine, balancing levels so everyone gets minutes.' },
  { n:'04', t:'get your kit & play', d:'Your own kit, colours & badge — then weekly training, matchdays and tournaments.' },
];

/* what membership includes */
const INCLUDED = [
  'Weekly coached training sessions',
  'Weekend league matchdays',
  'Tournaments through the season',
  'Your own team kit, colours & badge',
  'Every child plays, every single week',
  'A clear pathway into Notts Olympic teams',
];

/* full FAQ (from the current KFL site) */
const FAQ = [
  { q:'Can complete beginners play?',
    a:'Absolutely — that’s exactly what we’re about. Most of our players are playing for their first ever team and loving it every week.' },
  { q:'My child hasn’t had much game time elsewhere. Is that ok?',
    a:'That’s fine too. We assign players to a team where they can shine and build their confidence through the season, until it’s time to move up a level.' },
  { q:'How does training work?',
    a:'We run numerous training days so everyone has the chance to make a session. We ask for a minimum of one session per week.' },
  { q:'How are teams decided?',
    a:'Our coaches watch each player in training — often during their free trial week — and assign them to a team, balancing skill, experience and development needs.' },
  { q:'Do you provide kit?',
    a:'Yes! Each team has its own kit, colours and badge, and every child assigned to a team gets their own kit.' },
  { q:'What about more advanced players?',
    a:'We have an Academy team for higher-level players, with tryouts available.' },
  { q:'How do I book a free trial?',
    a:'Just pick your preferred training day through our booking system and come along — no commitment until you’ve tried a session.' },
  { q:'Is there a minimum term? How do I cancel?',
    a:'There’s no minimum term and you can cancel anytime — we just ask for 28 days’ notice by email.' },
];

const STATS = [
  { v:'2022', l:'league founded', c:'#34D399' },
  { v:'3',    l:'divisions',      c:'#38BDF8' },
  { v:'8',    l:'teams per div',  c:'#A78BFA' },
  { v:'85%',  l:'first-time players', c:'#F472B6' },
];

/* iOS-app-icon gloss: a curved specular dome over the top, a fine light edge,
   and a soft inner base shadow — sits above the badge, ignores pointer events */
function Gloss(){
  return (
    <div className="pointer-events-none absolute inset-0 rounded-[inherit]">
      {/* domed reflection across the top half */}
      <div className="absolute inset-x-0 top-0 h-[58%]"
           style={{ background:'linear-gradient(180deg, rgba(255,255,255,.6) 0%, rgba(255,255,255,.28) 45%, rgba(255,255,255,.06) 100%)',
                    borderRadius:'inherit', borderBottomLeftRadius:'50% 100%', borderBottomRightRadius:'50% 100%' }} />
      {/* crisp top light line + darkened base for the glassy curve */}
      <div className="absolute inset-0 rounded-[inherit]"
           style={{ boxShadow:'inset 0 1.5px 1px rgba(255,255,255,.85), inset 0 -14px 22px -10px rgba(0,0,0,.28), inset 0 0 0 1px rgba(255,255,255,.35)' }} />
    </div>
  );
}

/* a team crest — real badge if /public has the file, else a bright placeholder */
function Crest({ t }){
  const [broken, setBroken] = useState(false);
  const showLogo = t.logo && !broken;
  return (
    <div className="group text-center">
      {showLogo ? (
        /* real badge: neutral light tile so any logo style reads well */
        <div className="relative mx-auto grid aspect-square w-full max-w-[130px] place-items-center overflow-hidden rounded-[28px] bg-white/95 p-4 ring-1 ring-white/20 shadow-[0_22px_44px_-16px_rgba(0,0,0,.75)] transition-transform duration-300 group-hover:-translate-y-1.5 group-hover:scale-[1.04]">
          <img src={t.logo} alt={`${t.name} team badge`} loading="lazy" onError={()=>setBroken(true)}
               className="relative z-[1] h-full w-full object-contain" />
          <Gloss />
        </div>
      ) : (
        <div className="relative mx-auto grid aspect-square w-full max-w-[130px] place-items-center overflow-hidden rounded-[28px] ring-1 ring-white/20 shadow-[0_22px_44px_-16px_rgba(0,0,0,.7)] transition-transform duration-300 group-hover:-translate-y-1.5 group-hover:scale-[1.04]"
             style={{background:`linear-gradient(150deg, ${t.a}, ${t.b})`, boxShadow:`0 22px 44px -16px ${t.b}`}}>
          <span className="relative z-[1] text-[46px] drop-shadow-[0_3px_6px_rgba(0,0,0,.35)]" aria-hidden>{t.emoji}</span>
          <Gloss />
        </div>
      )}
      <div className="mt-3 text-[14px] font-medium lowercase">{t.name}</div>
    </div>
  );
}

export function Coaching(){
  return (
    <div>
      {/* ---------- hero ---------- */}
      <section className="media-hero relative h-[64vh] min-h-[440px] w-full overflow-hidden">
        <video className="absolute inset-0 h-full w-full object-cover" autoPlay loop muted playsInline preload="metadata">
          <source src={JUNIORS_VIDEO} type="video/mp4" />
        </video>
        <div className="absolute inset-0" style={{background:'linear-gradient(180deg, rgba(4,7,10,.40) 0%, rgba(4,7,10,.30) 36%, rgba(4,7,10,.95) 100%)'}}></div>
        {/* colourful glow bar */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 opacity-70" style={{background:'radial-gradient(60% 100% at 50% 100%, rgba(56,189,248,.28), transparent 70%)'}}></div>
        <div className="relative z-10 mx-auto flex h-full max-w-4xl items-center justify-center px-6 text-center">
          <div className="pop">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[.2em] text-white backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full" style={{background:'#34D399',boxShadow:'0 0 10px #34D399'}}></span>
              kids football league · at astro kings
            </span>
            <h1 className="hero-title mt-5 text-5xl font-semibold leading-[1.02] lowercase md:text-7xl">every child<br/>gets to play</h1>
            <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-white/75">A league for every child, regardless of ability. Weekly coaching, real matchdays, your own team & kit — start with a free trial.</p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <a href={BOOK_TRIAL_URL} target="_blank" rel="noreferrer"><Btn kind="primary" size="lg" iconEnd={I.arrow({})}>start a free trial</Btn></a>
              <a href="#register"><Btn kind="outline" size="lg">how it works</Btn></a>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- stats strip ---------- */}
      <section className="mx-auto -mt-10 max-w-5xl px-6">
        <Glass strong className="relative z-10 grid grid-cols-2 gap-4 rounded-[28px] p-6 md:grid-cols-4 md:p-8">
          {STATS.map((s,i)=>(
            <div key={i} className="text-center fade-up" style={{animationDelay:(i*.05)+'s'}}>
              <div className="tnum text-4xl font-semibold md:text-5xl" style={{color:s.c}}>{s.v}</div>
              <div className="mt-1 text-[12px] uppercase tracking-wide text-white/55">{s.l}</div>
            </div>
          ))}
        </Glass>
      </section>

      {/* ---------- the story ---------- */}
      <Section eyebrow="about the league" title="a league for every child">
        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <div className="text-[16px] leading-relaxed text-white/70">
            <p>We started back in early 2022 with a single mixed-age division and one simple belief: <span className="text-white">every child should get to play</span>. Over 85% of the children in our first season were playing for the very first time — many others had trained with teams but barely got any minutes on a matchday.</p>
            <p className="mt-4">So we built something different. Today we’re a <span className="text-white">three-division league with 8 teams in each</span>, offering multiple training sessions a week and real matches every weekend. Everyone plays, and we shine a light on every single player.</p>
          </div>
          <Glass className="rounded-[26px] p-6">
            <div className="text-[12px] uppercase tracking-[.2em] text-white/45">our promise</div>
            <ul className="mt-4 space-y-3 text-[15px] text-white/80">
              {['Everyone plays, every week','No child sits on the sidelines','A team where each child can shine','A pathway that grows with them'].map(f=>(
                <li key={f} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full" style={{background:'#34D39922',color:'#34D399'}}><span style={{width:13,height:13}}>{I.check({})}</span></span>{f}
                </li>
              ))}
            </ul>
          </Glass>
        </div>
      </Section>

      {/* ---------- the three leagues ---------- */}
      <Section eyebrow="the pathway" title="three leagues, one journey">
        <div className="grid gap-5 md:grid-cols-3">
          {LEAGUES.map((l,i)=>(
            <Glass key={l.key} className="relative overflow-hidden rounded-[28px] p-7 fade-up" style={{animationDelay:(i*.06)+'s'}}>
              {/* colour cap + glow */}
              <div className="absolute inset-x-0 top-0 h-1.5" style={{background:l.c}}></div>
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-30 blur-2xl" style={{background:l.c}}></div>
              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide" style={{background:l.c+'22',color:l.c}}>{l.tag}</span>
                  <span className="tnum text-[12px] text-white/40">0{i+1}</span>
                </div>
                <h3 className="hero-title mt-5 text-3xl font-semibold lowercase" style={{color:l.c}}>{l.name}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-white/65">{l.d}</p>
                <div className="mt-5 flex items-center gap-2 text-[13px] text-white/70">
                  <span style={{width:15,height:15,color:l.c}}>{I.cal({})}</span> now running · {l.runs}
                </div>
              </div>
            </Glass>
          ))}
        </div>
        <div className="mt-5 flex justify-center">
          <a href={LEAGUE_TABLES_URL} target="_blank" rel="noreferrer"><Btn kind="outline" icon={I.trophy({})} iconEnd={I.arrow({})}>view live league tables</Btn></a>
        </div>
      </Section>

      {/* ---------- training timetable ---------- */}
      <Section eyebrow="weekly training" title="when we train">
        <div className="grid gap-5 md:grid-cols-2">
          {TRAINING.map((t,i)=>(
            <Glass key={t.age} strong className="flex items-center justify-between rounded-[26px] p-7 fade-up" style={{animationDelay:(i*.05)+'s'}}>
              <div>
                <div className="text-[12px] uppercase tracking-[.2em] text-white/45">{t.age}</div>
                <div className="mt-2 text-[19px] font-medium">{t.days}</div>
              </div>
              <div className="tnum rounded-2xl bg-white/8 px-4 py-3 text-[18px] font-semibold">{t.time}</div>
            </Glass>
          ))}
        </div>
        <p className="mt-4 flex items-center gap-2 text-[13.5px] text-white/55">
          <span className="text-white/40" style={{width:16,height:16}}>{I.pin({})}</span>
          {CONTACT.addr} · at Astro Kings, Harvey Hadden Sports Village · minimum one session per week
        </p>
      </Section>

      {/* ---------- the teams ---------- */}
      <Section eyebrow="meet the teams" title="8 teams · own kit, colours & badge">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {TEAMS.map((t,i)=>(
            <div key={t.name} className="fade-up" style={{animationDelay:(i*.04)+'s'}}><Crest t={t} /></div>
          ))}
        </div>
        <p className="mt-6 text-center text-[13px] text-white/40">Team crests shown are placeholders — real badges drop straight in.</p>
      </Section>

      {/* ---------- how the trial works ---------- */}
      <Section eyebrow="how it works" title="from free trial to matchday">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s,i)=>{
            const c = STATS[i].c;
            return (
              <Glass key={s.n} className="rounded-3xl p-6 fade-up" style={{animationDelay:(i*.05)+'s'}}>
                <div className="grid h-11 w-11 place-items-center rounded-2xl text-[15px] font-semibold" style={{background:c+'22',color:c}}>{s.n}</div>
                <div className="mt-4 text-[17px] font-medium lowercase">{s.t}</div>
                <p className="mt-2 text-[14px] leading-relaxed text-white/55">{s.d}</p>
              </Glass>
            );
          })}
        </div>
      </Section>

      {/* ---------- register ---------- */}
      <section id="register" className="mx-auto mt-24 max-w-6xl px-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_440px]">
          <div>
            <Eyebrow>join the league</Eyebrow>
            <h2 className="hero-title mt-3 text-3xl font-semibold lowercase md:text-4xl">book your child’s free trial</h2>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/65">
              Tell us your child’s name and age and which day suits, and we’ll book their free trial and confirm
              everything by email. No commitment until you’ve tried a session — and no minimum term after.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {INCLUDED.map((f,i)=>(
                <div key={f} className="flex items-center gap-3 text-[14px] text-white/75">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full" style={{background:STATS[i%STATS.length].c+'22',color:STATS[i%STATS.length].c}}><span style={{width:13,height:13}}>{I.check({})}</span></span>{f}
                </div>
              ))}
            </div>
            <div className="mt-7">
              <a href={BOOK_TRIAL_URL} target="_blank" rel="noreferrer"><Btn kind="primary" size="lg" iconEnd={I.arrow({})}>book online now</Btn></a>
            </div>
          </div>
          <Glass strong className="rounded-[30px] p-7">
            <div className="text-[12px] uppercase tracking-wide text-white/45">quick enquiry</div>
            <p className="mt-2 text-[13px] text-white/55">Prefer we come back to you? Drop your details here.</p>
            <div className="mt-4">
              <EnquiryForm cta="register interest" placeholder="Child’s name, age, and which day suits…" />
            </div>
          </Glass>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <Section eyebrow="good to know" title="questions, answered">
        <div className="grid gap-3 md:grid-cols-2">
          {FAQ.map((f,i)=>(
            <Glass key={i} className="rounded-2xl p-5 fade-up" style={{animationDelay:(i*.03)+'s'}}>
              <div className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0 accent-text" style={{width:17,height:17}}>{I.whistle({})}</span>
                <div>
                  <div className="text-[15px] font-medium">{f.q}</div>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-white/60">{f.a}</p>
                </div>
              </div>
            </Glass>
          ))}
        </div>
        <p className="mt-5 text-center text-[13.5px] text-white/55">
          Still unsure? Email <a href={'mailto:'+CONTACT.email} className="accent-text hover:underline">{CONTACT.email}</a> — we’re happy to help.
        </p>
      </Section>

      <Footer />
    </div>
  );
}
