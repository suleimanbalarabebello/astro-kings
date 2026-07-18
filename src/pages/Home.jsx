/* Home.jsx — home page: hero + pitches + facilities + ways to play + CTA */

import { useState, useEffect, useRef } from 'react';
import { I } from '../lib/icons.jsx';
import { PITCHES, HERO_VIDEO, HERO_POSTER, PITCH_PHOTO, store } from '../lib/data.js';
import { todayKey, keyLabel } from '../lib/dates.js';
import { go } from '../lib/router.js';
import { Glass, Btn, Tag, Eyebrow, Field, Placeholder, Stat } from '../components/ui.jsx';
import { Calendar } from '../components/Calendar.jsx';
import { Footer } from '../components/Nav.jsx';

function QuickBook({ compact=false }){
  const [dayKey,setDayKey] = useState(todayKey());
  const [size,setSize] = useState('5v5');
  const [calOpen,setCalOpen] = useState(false);
  return (
    <Glass strong className={`rounded-3xl p-3 ${compact?'':'md:p-4'}`}>
      <div className="grid grid-cols-2 gap-2.5 md:grid-cols-[1.2fr_1fr_1fr_auto]">
        <Field icon={I.pin({})}>
          <span className="min-w-0 flex-1 truncate text-[14px]">Astro Kings · Nottingham</span>
        </Field>

        {/* date → liquid-glass calendar popover */}
        <div className="relative">
          <button type="button" onClick={()=>setCalOpen(o=>!o)}
            className="glass glass-soft flex h-12 w-full items-center gap-2.5 rounded-2xl px-4 text-left text-white/85">
            <span className="text-white/45" style={{width:18,height:18}}>{I.cal({})}</span>
            <span className="flex-1 truncate text-[14px]">{keyLabel(dayKey)}</span>
            <span className={`text-white/40 transition ${calOpen?'rotate-180':''}`} style={{width:13,height:13}}>{I.chevd({})}</span>
          </button>
          {calOpen ? (
            <>
              <button aria-label="close calendar" onClick={()=>setCalOpen(false)} className="fixed inset-0 z-40 cursor-default" />
              <div className="absolute bottom-full right-0 z-50 mb-2 w-[300px] max-w-[86vw] md:left-0 md:right-auto">
                <Calendar value={dayKey} onChange={(k)=>{ setDayKey(k); setCalOpen(false); }} />
              </div>
            </>
          ) : null}
        </div>

        <Field icon={I.ball({})}>
          <select value={size} onChange={e=>setSize(e.target.value)} className="w-full bg-transparent text-[14px] outline-none [&>option]:text-black">
            {['5v5','7v7','9v9'].map(d=><option key={d}>{d}</option>)}
          </select>
        </Field>

        <Btn kind="primary" className="h-12" icon={I.search({})} onClick={()=>{ store.day=dayKey; store.players=size; go('browse'); }}>search</Btn>
      </div>
    </Glass>
  );
}

function HeroVideo({ className='', dim=false, rounded='rounded-[34px]' }){
  const ref = useRef(null);
  useEffect(()=>{
    const v = ref.current;
    if(!v) return;
    v.muted = true;            // ensure muted is set on the DOM node so autoplay is allowed
    const p = v.play();
    if(p && p.catch) p.catch(()=>{}); // ignore autoplay rejections
  },[]);
  return (
    <div className={`ph overflow-hidden ${rounded} ${className}`}>
      <video ref={ref} className="absolute inset-0 h-full w-full object-cover" poster={HERO_POSTER} autoPlay loop muted playsInline preload="metadata">
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>
      <div className="pointer-events-none absolute inset-0" style={{background: dim ? 'linear-gradient(180deg, rgba(4,7,10,.50), rgba(4,7,10,.80))' : 'linear-gradient(180deg, rgba(4,7,10,.22), rgba(4,7,10,.42))'}}></div>
    </div>
  );
}

export function Hero({ variant='stacked' }){
  const stats = (
    <>
      <div className="flex items-center gap-3"><span className="hidden h-px w-16 bg-white/35 md:block" style={{transform:'rotate(18deg)'}}></span><Stat value="4" label="floodlit 4G pitches" /></div>
      <div className="flex items-center gap-3"><span className="hidden h-px w-16 bg-white/35 md:block" style={{transform:'rotate(-18deg)'}}></span><Stat value="65k+" label="games played" /></div>
    </>
  );

  if (variant === 'split') {
    return (
      <header className="relative px-6 pt-32 md:pt-40">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.1fr_.9fr]">
          <div className="fade-up">
            <Eyebrow>Nottingham · NG8</Eyebrow>
            <h1 className="hero-title mt-5 text-[15vw] font-semibold lowercase leading-[.9] md:text-[8.2vw]">brand<br/>new 4g<br/><span className="accent-text">pitches</span></h1>
            <p className="mt-6 max-w-md text-[16px] leading-relaxed text-white/65">Football, leagues, birthday parties, stag, hen and corporate events — all on brand-new floodlit 4G.</p>
            <div className="mt-8 flex flex-wrap items-center gap-8">{stats}</div>
          </div>
          <div className="fade-up" style={{animationDelay:'.1s'}}>
            <HeroVideo className="relative aspect-[4/5] w-full" />
            <div className="-mt-16 px-3"><QuickBook compact /></div>
          </div>
        </div>
      </header>
    );
  }

  if (variant === 'centered') {
    return (
      <header className="relative overflow-hidden px-6 pt-36 md:pt-44">
        <HeroVideo className="!absolute inset-x-3 inset-y-3 md:inset-x-4 md:inset-y-4" dim />
        <div className="relative z-10 mx-auto max-w-4xl text-center fade-up">
          <Tag accent className="mb-6">⚡ brand new 4g pitches</Tag>
          <h1 className="hero-title text-[17vw] font-semibold lowercase md:text-[9vw]">new <span className="accent-text">4g</span> pitches</h1>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/65">Football, leagues, birthday parties, stag, hen and corporate events — Nottingham's best 5-a-side centre.</p>
        </div>
        <div className="relative z-10 mx-auto mt-10 max-w-3xl fade-up" style={{animationDelay:'.08s'}}><QuickBook /></div>
        <div className="relative z-10 mx-auto mt-12 flex max-w-3xl items-center justify-center gap-12">{stats}</div>
      </header>
    );
  }

  // 'stacked' (default) — staggered words over a looping video stage
  return (
    <header className="relative min-h-[88vh] w-full overflow-hidden px-4 md:h-[92vh] md:min-h-[600px] md:px-6">
      <HeroVideo className="!absolute inset-0 !border-0" rounded="rounded-none" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56" style={{background:'linear-gradient(to bottom, transparent, rgba(4,7,10,.92))'}}></div>

      {/* desktop — staggered scattered words */}
      <div className="relative mx-auto hidden h-full max-w-7xl md:block">
        <h1 className="hero-title absolute left-0 top-[16%] text-[12vw] font-semibold lowercase fade-up">brand</h1>
        <h1 className="hero-title absolute right-2 top-[35%] text-[12vw] font-semibold lowercase fade-up" style={{animationDelay:'.06s'}}>new 4g</h1>
        <h1 className="hero-title absolute left-[22%] top-[54%] text-[12vw] font-semibold lowercase accent-text fade-up" style={{animationDelay:'.12s'}}>pitches</h1>

        <p className="absolute left-0 top-[44%] max-w-[230px] text-[15px] leading-snug text-white/85 fade-up" style={{animationDelay:'.18s'}}>
          football, leagues, birthday parties, stag, hen & corporate events.
        </p>

        <div className="absolute right-0 top-[15%] text-right fade-up" style={{animationDelay:'.2s'}}>
          <div className="flex items-center justify-end gap-3"><span className="h-px w-24 bg-white/40" style={{transform:'rotate(18deg)'}}></span><span className="tnum text-4xl font-semibold md:text-5xl">65k+</span></div>
          <div className="mt-1 text-[13px] text-white/60">games played here</div>
        </div>
        <div className="absolute bottom-[14%] left-0 fade-up" style={{animationDelay:'.24s'}}>
          <div className="flex items-center gap-3"><span className="tnum text-4xl font-semibold md:text-5xl">4</span><span className="h-px w-24 bg-white/40" style={{transform:'rotate(-18deg)'}}></span></div>
          <div className="mt-1 text-[13px] text-white/60">floodlit 4G pitches</div>
        </div>
        <div className="absolute inset-x-0 bottom-[6%] mx-auto max-w-3xl fade-up" style={{animationDelay:'.3s'}}><QuickBook /></div>
      </div>

      {/* mobile — clean stacked layout (no clipping) */}
      <div className="relative z-10 mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-end gap-6 pb-10 md:hidden">
        <div className="fade-up">
          <h1 className="hero-title text-[16vw] font-semibold leading-[.95] lowercase">brand<br/>new 4g<br/><span className="accent-text">pitches</span></h1>
          <p className="mt-4 max-w-xs text-[14px] leading-snug text-white/85">football, leagues, birthday parties, stag, hen &amp; corporate events.</p>
          <div className="mt-5 flex items-center gap-8">
            <div><div className="tnum text-3xl font-semibold">4</div><div className="text-[12px] text-white/60">floodlit 4G pitches</div></div>
            <div><div className="tnum text-3xl font-semibold">65k+</div><div className="text-[12px] text-white/60">games played</div></div>
          </div>
        </div>
        <div className="fade-up" style={{animationDelay:'.1s'}}><QuickBook /></div>
      </div>
    </header>
  );
}

function PitchCard({ p, i }){
  return (
    <Glass className="group flex flex-col overflow-hidden rounded-3xl p-3 transition-transform duration-300 hover:-translate-y-1 fade-up" style={{animationDelay:(i*.05)+'s'}}>
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl">
        <img src={PITCH_PHOTO} alt={p.name} className="absolute inset-0 h-full w-full object-cover" />
        {p.tag ? <span className="absolute right-3 top-3 z-10"><Tag accent>{p.tag}</Tag></span> : null}
      </div>
      <div className="flex flex-1 flex-col px-2 pb-1 pt-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-[17px] font-medium">{p.name}</div>
            <div className="mt-1 text-[13px] text-white/50">{p.goals}</div>
          </div>
          <div className="text-right">
            <div className="tnum text-2xl font-semibold">£{p.price}</div>
            <div className="-mt-1 text-[12px] text-white/45">{p.unit}</div>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <Btn kind="glass" size="sm" className="flex-1" onClick={()=>{ store.venue=p.id; go('venue',{p:p.id}); }}>details</Btn>
          <Btn kind="primary" size="sm" className="flex-1" iconEnd={I.arrow({})} onClick={()=>{ store.venue=p.id; go('booking',{p:p.id}); }}>book</Btn>
        </div>
      </div>
    </Glass>
  );
}

function FacilityRow(){
  const f = [
    { ic:I.bolt, t:'LED floodlights' },
    { ic:I.shield, t:'4G rubber-crumb' },
    { ic:I.shower, t:'Hot showers' },
    { ic:I.locker, t:'Secure lockers' },
    { ic:I.cafe, t:'On-site café' },
    { ic:I.whistle, t:'Rebound boards' },
  ];
  return (
    <Glass strong className="rounded-[30px] p-6 md:p-8">
      <div className="grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-3 md:grid-cols-6">
        {f.map((x,i)=>(
          <div key={i} className="flex flex-col items-start gap-3">
            <span className="glass grid h-12 w-12 place-items-center rounded-2xl accent-text"><span style={{width:22,height:22}}>{x.ic({})}</span></span>
            <span className="text-[13.5px] text-white/75">{x.t}</span>
          </div>
        ))}
      </div>
    </Glass>
  );
}

export function Section({ eyebrow, title, action, children }){
  return (
    <section className="mx-auto mt-24 max-w-7xl px-6">
      <div className="mb-7 flex items-end justify-between gap-4">
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="hero-title mt-3 text-4xl md:text-5xl font-semibold lowercase">{title}</h2>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

/* big captioned image tiles — mirrors the live site's "Football" & "What Else" grids */
export function FeatureTiles({ tiles, cols='md:grid-cols-2', aspect='aspect-[16/10]', big=true }){
  return (
    <div className={`grid gap-4 ${cols}`}>
      {tiles.map((t,i)=>(
        <a key={i} href={'#'+t.to}
           className={`ph group relative block ${aspect} overflow-hidden rounded-[28px] fade-up ${t.cls||''}`}
           style={{animationDelay:(i*.06)+'s'}}>
          {t.img ? <img src={t.img} alt={t.t} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" /> : null}
          <div className="pointer-events-none absolute inset-0 transition-opacity duration-300 group-hover:opacity-90"
               style={{background:'linear-gradient(to top, rgba(4,7,10,.88), rgba(4,7,10,.18) 55%, rgba(4,7,10,.04))'}}></div>
          <div className="absolute inset-x-0 bottom-0 p-5 text-center md:p-6">
            <div className={`hero-title font-semibold lowercase ${(t.big ?? big)?'text-3xl md:text-4xl':'text-xl md:text-2xl'}`}>{t.t}</div>
            <div className="mt-1.5 text-[13.5px] text-white/70">{t.d}</div>
            <span className="mt-2.5 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wide accent-text">
              explore <span className="transition group-hover:translate-x-1" style={{width:13,height:13}}>{I.arrow({})}</span>
            </span>
          </div>
        </a>
      ))}
    </div>
  );
}

/* "Football" hero grid — the four headline offerings */
/* The 8 headline tiles — booking first (primary goal), club-building close behind. */
const HOME_TILES = [
  { t:'book a pitch',              d:'brand-new 4g pitches · book online in minutes', to:'booking',         img:PITCH_PHOTO },
  { t:'kids coaching',             d:'notts olympic kids league & weekly coaching',     to:'coaching',        img:'/coaching.jpg' },
  { t:'notts olympic fc',          d:'the club behind the centre — follow & support',   to:'nottsolympic',    img:'/juniors-poster.jpg' },
  { t:'book the performance zone', d:'1-2-1 & small-group coaching space for hire',     to:'performancezone', img:'/academy-poster.jpg' },
  { t:'book an event',             d:'zorb football, darts, tournaments & more',        to:'events',          img:'/corporate.jpg' },
  { t:'kids football party',       d:'parties from just £4 per child — fully hosted',   to:'parties',         img:'/party.jpg' },
  { t:'social kicks',              d:'casual pick-up games — join the whatsapp group',  to:'getagame',        img:'/subs.jpg' },
  /* TODO: real shop/product photo for this tile */
  { t:'the football shop',         d:'balls, grip socks & notts olympic kit',           to:'shop' },
];

export function Home(){
  return (
    <div>
      <Hero variant="stacked" />

      {/* the 8 headline tiles — the hub: everything the centre offers, booking first */}
      <Section eyebrow="play at astro kings" title="what would you like to do?">
        <FeatureTiles tiles={HOME_TILES} cols="md:grid-cols-2" aspect="aspect-[16/10]" big={true} />
      </Section>

      <Section eyebrow="our pitches" title="choose your format"
        action={<a href="#browse" className="hidden md:block"><Btn kind="outline" size="sm" iconEnd={I.arrow({})}>see all pitches</Btn></a>}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{PITCHES.map((p,i)=><PitchCard key={p.id} p={p} i={i} />)}</div>
      </Section>

      <Section eyebrow="everything sorted" title="more than just a pitch"><FacilityRow /></Section>

      <section className="mx-auto mt-24 max-w-7xl px-6">
        <Glass strong className="relative overflow-hidden rounded-[34px] p-10 text-center md:p-16">
          <div className="pointer-events-none absolute -inset-20 opacity-60" style={{background:'radial-gradient(40% 60% at 50% 0%, color-mix(in oklab, var(--accent), transparent 70%), transparent)'}}></div>
          <div className="relative">
            <h3 className="hero-title text-4xl md:text-6xl font-semibold lowercase">ready when you are</h3>
            <p className="mx-auto mt-4 max-w-lg text-[15px] text-white/60">Pick a slot, rally the lads, and we'll have the floodlights on.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href="#booking"><Btn kind="primary" size="lg" iconEnd={I.arrow({})}>book a pitch</Btn></a>
              <a href="#pricing"><Btn kind="outline" size="lg">view pricing</Btn></a>
            </div>
          </div>
        </Glass>
      </section>

      <Footer />
    </div>
  );
}
