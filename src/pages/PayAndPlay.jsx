/* PayAndPlay.jsx — U16s/U18s pay & play football. Mirrors the live page:
   hero → intro → daily pay-and-play prices → "next Neymar" prizes. */

import { I } from '../lib/icons.jsx';
import { JUNIORS_VIDEO } from '../lib/data.js';
import { Glass, Btn, Eyebrow } from '../components/ui.jsx';
import { Section } from './Home.jsx';
import { Footer } from '../components/Nav.jsx';

const PAYPLAY = [
  { slot:'after school',    note:'after school', price:'£4.50' },
  { slot:'weekends',        note:'11 till 8',    price:'£4.50' },
  { slot:'school holidays', note:'11 till 6',    price:'£4.50' },
];

export function PayAndPlay(){
  return (
    <div>
      {/* ---------- video hero ---------- */}
      <section className="media-hero relative h-[58vh] min-h-[400px] w-full overflow-hidden">
        <video className="absolute inset-0 h-full w-full object-cover" autoPlay loop muted playsInline preload="metadata">
          <source src={JUNIORS_VIDEO} type="video/mp4" />
        </video>
        <div className="absolute inset-0" style={{background:'linear-gradient(180deg, rgba(4,7,10,.42) 0%, rgba(4,7,10,.32) 38%, rgba(4,7,10,.94) 100%)'}}></div>
        <div className="relative z-10 mx-auto flex h-full max-w-4xl items-center justify-center px-6 text-center">
          <div className="pop text-center">
            <Eyebrow>juniors · u16s</Eyebrow>
            <h1 className="hero-title mt-4 text-5xl font-semibold leading-[1.04] lowercase md:text-7xl">u16s pay and play football</h1>
          </div>
        </div>
      </section>

      {/* ---------- intro ---------- */}
      <section className="mx-auto mt-16 max-w-3xl px-6">
        <h2 className="text-2xl font-semibold lowercase md:text-3xl">u18s pay and play football at astro kings</h2>
        <p className="mt-5 text-[15px] leading-relaxed text-white/65">
          When you’re not in school, come and play football here with your friends — we’ve teamed up with
          <a href="#kingsclub" className="accent-text hover:underline"> Kings Football Academy</a> to offer special prices that make
          playing football affordable every day. All you have to do is come to our main reception desk to buy a wristband,
          and we’ll let you play on one of the 5-a-side pitches with your friends.
        </p>
        <p className="mt-4 text-[15px] leading-relaxed text-white/65">
          There’s no fee to join Kings FA, but you can get an even bigger discount with a
          <a href="#kingsclub" className="accent-text hover:underline"> Kings Football Academy Membership</a> — just turn up and play
          football with your mates. It doesn’t matter what standard you are, come to Astro Kings and play every day!
        </p>
      </section>

      {/* ---------- daily pay and play prices ---------- */}
      <Section eyebrow="turn up & play" title="daily pay and play prices">
        <p className="-mt-2 mb-6 max-w-2xl text-[15px] leading-relaxed text-white/60">
          You don’t have to join the club to play — you can still <span className="text-white/85">pay and play each day</span>.
        </p>
        <div className="overflow-hidden rounded-[28px] glass">
          <div className="grid md:grid-cols-3">
            {PAYPLAY.map((p,i)=>(
              <div key={i} className={`p-7 text-center fade-up ${i>0?'border-t border-white/8 md:border-t-0 md:border-l':''}`} style={{animationDelay:(i*.06)+'s'}}>
                <div className="text-[12px] uppercase tracking-[.2em] text-white/45">{p.slot}</div>
                <div className="mt-4 flex items-end justify-center gap-1"><span className="tnum text-5xl font-semibold">{p.price}</span></div>
                <div className="mt-1 text-[12px] italic text-white/40">{p.note}</div>
                <div className="mt-5 space-y-2 text-[14px] text-white/70">
                  <div className="rounded-xl bg-white/[.04] py-2">Turn up and play</div>
                  <div className="rounded-xl bg-white/[.04] py-2">Friends welcome</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ---------- want to be the next neymar ---------- */}
      <section className="mx-auto mt-20 max-w-6xl px-6">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_360px]">
          <div>
            <h2 className="hero-title text-3xl font-semibold lowercase md:text-4xl">want to be the next neymar?</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-white/65">
              If you’re 16 and have some real footballing talent, film yourself on the pitches and show the world you’re the next Neymar!
            </p>
            <h3 className="mt-8 text-xl font-semibold lowercase">win footy prizes!</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-white/65">
              Not only can you play for just a few pounds at Nottingham’s best 5-a-side football centre, we also have exclusive
              offers and the chance to <span className="text-white">win weekly prizes</span>. Upload vids of your skills and tag us
              for a chance to win weekly prizes!
            </p>
          </div>
          <Glass strong className="rounded-[28px] p-8 text-center accent-ring">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full accent-bg text-[#0b0b0b]"><span style={{width:26,height:26}}>{I.star({})}</span></span>
            <div className="mt-4 text-[20px] font-semibold leading-snug">Post your skills<br/>and Win!</div>
            <a href="#skills" className="mt-6 block"><Btn kind="primary" size="lg" className="w-full" iconEnd={I.arrow({})}>get involved</Btn></a>
          </Glass>
        </div>
      </section>
      <Footer />
    </div>
  );
}
