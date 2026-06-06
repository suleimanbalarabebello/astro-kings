/* KingsClub.jsx — Kings FA's Kings Club (U18s monthly membership) */

import { I } from '../lib/icons.jsx';
import { Glass, Btn, Tag, PageHead } from '../components/ui.jsx';
import { Section } from './Home.jsx';
import { Footer } from '../components/Nav.jsx';

const PAYPLAY = [
  { slot:'after school',   note:'after school',  price:'£4.50' },
  { slot:'weekends',       note:'11 till 8',     price:'£4.50' },
  { slot:'school holidays',note:'11 till 6',     price:'£4.50' },
];
const FACILITIES = [
  { ic:I.shield,  t:'4G pitches', d:'Brand-new rubber-crumb 4G synthetic grass.' },
  { ic:I.bolt,    t:'floodlights', d:'State-of-the-art LED lighting for bright, uniform light.' },
  { ic:I.ball,    t:'5-a-side to 9-a-side pitches', d:'Choose your pitch type and goal size to suit your game.' },
  { ic:I.shower,  t:'changing facilities', d:'Hot showers and secure changing before and after the game.' },
];

export function KingsClub(){
  return (
    <div>
      <PageHead eyebrow="kings fa · kings club" title="kings fa’s kings club"
        sub="Under 18s can play every day for just £14.99 a month with Kings FA’s Kings Club.">
        <a href="#booking"><Btn kind="primary" iconEnd={I.arrow({})}>sign up</Btn></a>
      </PageHead>

      {/* prose + membership card */}
      <section className="mx-auto mt-12 max-w-6xl px-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          <div className="space-y-9">
            <div className="fade-up">
              <h2 className="hero-title text-3xl md:text-4xl font-semibold lowercase">play every day for just £14.99</h2>
              <p className="mt-4 text-[15px] leading-relaxed text-white/65">Kings Football Academy is our resident FA-affiliated football club. Under 18s can train with Kings Football Academy, join a team and play in the YEL, or just come down and train at Astro Kings on their own or with friends and family.</p>
            </div>
            <div className="fade-up">
              <h3 className="text-2xl font-medium lowercase">join the kings club &amp; play every day</h3>
              <p className="mt-4 text-[15px] leading-relaxed text-white/65">Instead of paying day-by-day, U18s can become a Kings Club member and pay a small monthly fee to play every day.</p>
            </div>
            <div className="fade-up">
              <h3 className="text-2xl font-medium lowercase">how to join the kings club</h3>
              <p className="mt-4 text-[15px] leading-relaxed text-white/65">It’s easy to join — just <a href="#booking" className="accent-text hover:underline">sign up here</a>. It doesn’t matter what standard you are; come to Astro Kings and play every day!</p>
            </div>
          </div>

          {/* membership card */}
          <aside>
            <Glass strong className="rounded-[28px] p-7 accent-ring lg:sticky lg:top-28">
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
              <a href="#booking" className="mt-6 block"><Btn kind="primary" size="lg" className="w-full" icon={I.ball({})}>sign up</Btn></a>
              <p className="mt-3 text-center text-[12px] text-white/40">just a monthly fee, paid by Direct Debit</p>
            </Glass>
          </aside>
        </div>
      </section>

      {/* daily pay and play prices */}
      <Section eyebrow="no membership? no problem" title="daily pay and play prices">
        <p className="-mt-2 mb-6 max-w-2xl text-[15px] leading-relaxed text-white/60">You don’t have to join the club to play — you can still <span className="text-white/85">pay and play each day</span>.</p>
        <div className="grid gap-4 md:grid-cols-3">
          {PAYPLAY.map((p,i)=>(
            <Glass key={i} className="rounded-[28px] p-7 text-center fade-up" style={{animationDelay:(i*.06)+'s'}}>
              <div className="text-[12px] uppercase tracking-[.2em] text-white/45">{p.slot}</div>
              <div className="mt-4 flex items-end justify-center gap-1"><span className="tnum text-5xl font-semibold">{p.price}</span></div>
              <div className="mt-1 text-[12px] text-white/45">{p.note}</div>
              <div className="mt-5 space-y-2 text-[14px] text-white/70">
                <div className="rounded-xl bg-white/[.04] py-2">Turn up and play</div>
                <div className="rounded-xl bg-white/[.04] py-2">Friends welcome</div>
              </div>
            </Glass>
          ))}
        </div>
      </Section>

      {/* facilities strip */}
      <section className="mx-auto mt-20 max-w-6xl px-6">
        <Glass strong className="rounded-[30px] p-7 md:p-9">
          <div className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {FACILITIES.map((f,i)=>(
              <div key={i} className="text-center">
                <span className="glass mx-auto grid h-14 w-14 place-items-center rounded-2xl accent-text"><span style={{width:26,height:26}}>{f.ic({})}</span></span>
                <div className="mt-4 text-[15px] font-medium">{f.t}</div>
                <p className="mt-1.5 text-[13px] leading-relaxed text-white/55">{f.d}</p>
              </div>
            ))}
          </div>
        </Glass>
      </section>
      <Footer />
    </div>
  );
}
