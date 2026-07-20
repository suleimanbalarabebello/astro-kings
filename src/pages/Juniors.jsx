/* Juniors.jsx — football for U18s: hub + memberships, coaching, camps, parties */

import { I } from '../lib/icons.jsx';
import { JUNIORS_VIDEO } from '../lib/data.js';
import { Glass, Btn, Tag, Eyebrow } from '../components/ui.jsx';
import { Section, FeatureTiles } from './Home.jsx';
import { Footer } from '../components/Nav.jsx';

const JUNIOR_TILES = [
  { t:'coaching',        d:'weekends & holiday kids football coaching', to:'academy',    img:'/coaching.jpg' },
  { t:'u18s pay & play', d:'play for just £3.50 every day',             to:'payandplay', img:'/payandplay-tile.jpg' },
  { t:'birthday parties',d:'from just £4 per child',                    to:'parties',    img:'/party.jpg' },
];

export function Juniors(){
  const plans = [
    { n:'U18s Pay & Play', price:'£3.50', unit:'/day', note:'every day', feat:['Drop-in junior football','Supervised 4G pitches','No membership needed','Bring your mates'], tag:'' },
    { n:'U18s Kings Club', price:'£14.99', unit:'/mo', note:'most popular', feat:['Unlimited pay & play','Member-only sessions','Kit & training perks','Priority on holiday camps'], tag:'most popular' },
  ];
  return (
    <div>
      {/* video hero */}
      <section className="media-hero relative h-[58vh] min-h-[400px] w-full overflow-hidden">
        <video className="absolute inset-0 h-full w-full object-cover" autoPlay loop muted playsInline preload="metadata">
          <source src={JUNIORS_VIDEO} type="video/mp4" />
        </video>
        <div className="absolute inset-0" style={{background:'linear-gradient(180deg, rgba(4,7,10,.42) 0%, rgba(4,7,10,.32) 38%, rgba(4,7,10,.94) 100%)'}}></div>
        <div className="relative z-10 mx-auto flex h-full max-w-4xl items-center justify-center px-6 text-center">
          <div className="pop text-center">
            <Eyebrow>football for u18s</Eyebrow>
            <h1 className="hero-title mt-4 text-5xl font-semibold leading-[1.04] lowercase md:text-6xl">u18’s football at astro kings</h1>
            <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-white/70">We’re the best place in Nottingham for junior parties and coaching.</p>
            <a href="#parties" className="mt-6 inline-block"><Btn kind="primary" iconEnd={I.arrow({})}>kids parties</Btn></a>
          </div>
        </div>
      </section>

      {/* play football at astro kings — intro */}
      <section className="mx-auto mt-16 max-w-3xl px-6 text-center fade-up">
        <h2 className="hero-title text-4xl md:text-5xl font-semibold lowercase">play football at astro kings</h2>
        <p className="mt-5 text-[15px] leading-relaxed text-white/65">As well as having the best all-weather 4G pitches in Nottingham, our floodlights are state-of-the-art LEDs. We also cater for <span className="text-white/85">corporate events</span>, <span className="text-white/85">birthday parties</span>, <span className="text-white/85">tournaments &amp; events</span> and <span className="text-white/85">Bubble Football</span>. Whatever you have in mind, <a href="#about" className="accent-text hover:underline">contact us</a> — we guarantee you’ll have the best footballing experience in the area.</p>
      </section>

      {/* three tiles — coaching · pay & play · birthday parties */}
      <section className="mx-auto mt-12 max-w-7xl px-6">
        <FeatureTiles tiles={JUNIOR_TILES} cols="md:grid-cols-3" aspect="aspect-[4/3]" big={false} />
      </section>

      {/* memberships */}
      <Section eyebrow="junior memberships" title="pay & play or join the club">
        <div className="grid gap-4 md:grid-cols-2">
          {plans.map((m,i)=>(
            <Glass key={m.n} strong={i===1} className={`flex flex-col rounded-[28px] p-7 fade-up ${i===1?'accent-ring':''}`} style={{animationDelay:(i*.06)+'s'}}>
              {m.tag ? <Tag accent className="self-start mb-3">{m.tag}</Tag> : <span className="mb-3 h-6"></span>}
              <div className="text-[19px] font-medium lowercase">{m.n}</div>
              <div className="mt-1 text-[13px] text-white/45">{m.note}</div>
              <div className="mt-5 flex items-end gap-1"><span className="tnum text-5xl font-semibold">{m.price}</span><span className="mb-1.5 text-[13px] text-white/45">{m.unit}</span></div>
              <ul className="mt-6 flex-1 space-y-3 text-[14px] text-white/70">
                {m.feat.map(f=><li key={f} className="flex items-center gap-3"><span className="glass grid h-6 w-6 place-items-center rounded-full accent-text"><span style={{width:13,height:13}}>{I.check({})}</span></span>{f}</li>)}
              </ul>
              <a href="#booking" className="mt-7"><Btn kind={i===1?'primary':'outline'} size="lg" className="w-full">{i===1?'join kings club':'book a session'}</Btn></a>
            </Glass>
          ))}
        </div>
      </Section>
      <Footer />
    </div>
  );
}
