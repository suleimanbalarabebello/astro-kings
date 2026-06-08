/* KingsClub.jsx — Kings FA's Kings Club (U18s monthly membership).
   Mirrors the live page: image hero → membership + prose → daily prices → facilities. */

import { I } from '../lib/icons.jsx';
import { KINGSCLUB_VIDEO } from '../lib/data.js';
import { Glass, Btn, Eyebrow } from '../components/ui.jsx';
import { Section } from './Home.jsx';
import { Footer } from '../components/Nav.jsx';

const PAYPLAY = [
  { slot:'after school',    note:'after school', price:'£4.50' },
  { slot:'weekends',        note:'11 till 8',    price:'£4.50' },
  { slot:'school holidays', note:'11 till 6',    price:'£4.50' },
];
const FACILITIES = [
  { ic:I.shield,  t:'4G pitches', d:'Brand-new rubber-crumb based 4G synthetic grass.' },
  { ic:I.bolt,    t:'floodlights', d:'State-of-the-art LED lighting for a bright, uniform light.' },
  { ic:I.ball,    t:'5-a-side to 9-a-side pitches', d:'Choose your pitch type and goal size to make your game more competitive.' },
  { ic:I.shower,  t:'changing facilities', d:'Hot showers and secure changing facilities before and after the game.' },
];

export function KingsClub(){
  return (
    <div>
      {/* ---------- image hero ---------- */}
      <section className="relative h-[64vh] min-h-[440px] w-full overflow-hidden">
        <video className="absolute inset-0 h-full w-full object-cover" autoPlay loop muted playsInline preload="metadata">
          <source src={KINGSCLUB_VIDEO} type="video/mp4" />
        </video>
        <div className="absolute inset-0" style={{background:'linear-gradient(180deg, rgba(4,7,10,.40) 0%, rgba(4,7,10,.30) 38%, rgba(4,7,10,.94) 100%)'}}></div>
        <div className="relative z-10 mx-auto flex h-full max-w-6xl items-center justify-center px-6 text-center">
          <div className="pop text-center">
            <Eyebrow>kings fa · u18s</Eyebrow>
            <h1 className="hero-title mt-4 text-5xl font-semibold leading-[1.02] lowercase md:text-7xl">kings fa’s<br/>kings club</h1>
          </div>
        </div>
      </section>

      {/* ---------- prose + membership card ---------- */}
      <section className="mx-auto -mt-10 max-w-6xl px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
          <div className="space-y-9">
            <div className="fade-up">
              <h2 className="hero-title text-3xl font-semibold lowercase md:text-4xl">under 18s can play every day for just £14.99 with kings fa’s kings club!</h2>
              <p className="mt-4 text-[15px] leading-relaxed text-white/65">
                Kings Football Academy is our resident FA-affiliated football club. Under 18s can <span className="text-white">train with Kings Football Academy</span>,
                join a team and play in the YEL, or just come down and train at Astro Kings on their own or with friends and family.
              </p>
            </div>
            <div className="fade-up">
              <h3 className="text-2xl font-medium lowercase">join the kings fa kings club and play everyday!</h3>
              <p className="mt-4 text-[15px] leading-relaxed text-white/65">
                Instead of paying £3.50 per session, U18s can become a Kings Club member and pay a small monthly fee to play every day.
              </p>
            </div>
            <div className="fade-up">
              <h3 className="text-2xl font-medium lowercase">how to join the kings fa club</h3>
              <p className="mt-4 text-[15px] leading-relaxed text-white/65">
                It’s easy to join the club — just simply <a href="#login" className="accent-text hover:underline">sign up here</a>.
                It doesn’t matter what standard you are, come to Astro Kings and play every day!
              </p>
            </div>
            <div className="fade-up">
              <h3 className="text-2xl font-medium lowercase">more information</h3>
              <p className="mt-4 text-[15px] leading-relaxed text-white/65">
                Find out more on <a href="#clubs" className="accent-text hover:underline">Kings FA’s website</a>.
              </p>
            </div>
          </div>

          {/* membership card */}
          <aside>
            <div className="text-[15px] font-semibold leading-snug">Kings FA’s Kings Club<br/>Monthly Membership</div>
            <p className="mt-3 text-[13px] text-white/55">It’s just a monthly fee paid by Direct Debit.</p>
            <Glass strong className="mt-5 rounded-[28px] p-7 accent-ring lg:sticky lg:top-28">
              <div className="text-center text-[12px] uppercase tracking-[.2em] text-white/45">kings fa membership</div>
              <div className="mt-4 flex items-end justify-center gap-0.5">
                <span className="mb-3 text-xl font-semibold text-white/70">£</span>
                <span className="tnum text-6xl font-semibold leading-none">14</span>
                <span className="tnum mb-7 text-2xl font-semibold">.99</span>
              </div>
              <div className="text-center text-[12px] text-white/45">per month</div>
              <div className="mt-6 space-y-2 text-center text-[14px] text-white/80">
                <div className="rounded-xl bg-white/[.04] py-2.5">Week days till 6pm</div>
                <div className="rounded-xl bg-white/[.04] py-2.5">Weekends all day</div>
              </div>
              <a href="#login" className="mt-6 block"><Btn kind="primary" size="lg" className="w-full" icon={I.ball({})}>sign up</Btn></a>
            </Glass>
          </aside>
        </div>
      </section>

      {/* ---------- daily pay and play prices ---------- */}
      <Section eyebrow="no membership? no problem" title="daily pay and play prices">
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

      {/* ---------- facilities strip (coral-ringed icons) ---------- */}
      <section className="mx-auto mt-20 max-w-6xl px-6">
        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {FACILITIES.map((f,i)=>(
            <div key={i} className="text-center fade-up" style={{animationDelay:(i*.05)+'s'}}>
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-full border-2 border-[var(--accent)] accent-text"><span style={{width:26,height:26}}>{f.ic({})}</span></span>
              <div className="mt-4 text-[15px] font-semibold">{f.t}</div>
              <p className="mt-1.5 text-[13px] leading-relaxed text-white/55">{f.d}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
