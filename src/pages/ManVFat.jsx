/* ManVFat.jsx — Man v Fat Football: the 5-a-side weight-loss league */

import { I } from '../lib/icons.jsx';
import { CONTACT } from '../lib/data.js';
import { Glass, Btn, Tag, PageHead } from '../components/ui.jsx';
import { Map } from '../components/Map.jsx';
import { Section } from './Home.jsx';
import { Footer } from '../components/Nav.jsx';

const SIGNUP = 'https://www.manvfatfootball.org/nottingham';

export function ManVFat(){
  return (
    <div>
      <PageHead eyebrow="man v fat football · nottingham" title="man v fat football"
        sub="Where the biggest losers win! A 5-a-side league for guys who want to lose weight, get fitter and enjoy the beautiful game — no fad diets, just sustainable change.">
        <a href={SIGNUP} target="_blank" rel="noreferrer"><Btn kind="primary" iconEnd={I.arrow({})}>register your interest</Btn></a>
      </PageHead>

      {/* stats band */}
      <div className="mx-auto mt-10 max-w-6xl px-6">
        <Glass strong className="grid gap-4 rounded-[30px] p-7 sm:grid-cols-4 fade-up">
          {[['14','week league'],['95%','of players lose weight'],['70lbs','lost by some players'],['FA','officially endorsed']].map(([v,l],i)=>(
            <div key={i}><div className="tnum text-4xl font-semibold accent-text">{v}</div><div className="mt-1 text-[13px] text-white/55">{l}</div></div>
          ))}
        </Glass>
      </div>

      {/* how it works (prose) + price/contact card */}
      <section className="mx-auto mt-16 max-w-6xl px-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-10">
            <div className="fade-up">
              <h2 className="hero-title text-3xl md:text-4xl font-semibold lowercase">how man v fat football works</h2>
              <p className="mt-4 text-[15px] leading-relaxed text-white/65">MAN v FAT Football is a 5-a-side football league for guys who want to lose weight. Every player is in the same situation and wants the same thing — to enjoy football, lose weight and get healthier. This isn’t a fad diet; the whole ethos is to encourage sustainable lifestyle changes.</p>
              <p className="mt-3 text-[15px] leading-relaxed text-white/65">Uniquely, the league is decided not just on points won, but on pounds lost. We back every player with resources, inspiration and support to help them lose weight, get fitter and enjoy the beautiful game.</p>
            </div>

            <div className="fade-up">
              <h3 className="text-2xl font-medium lowercase">join a team & play when you’re ready</h3>
              <p className="mt-4 text-[15px] leading-relaxed text-white/65">Leagues aren’t just decided on the games won on the pitch, but also on the weight lost off it — so you can join a team as a non-playing member. You’ll be in every week supporting your team, with your weight loss counting toward its success. When you’ve lost enough to feel comfortable, you get involved on the pitch.</p>
              <p className="mt-3 text-[15px] leading-relaxed text-white/65">With 95% of players losing weight and some shedding up to 70lbs during the 14-week league, it’s no wonder the Football Association has officially endorsed the leagues.</p>
            </div>

            <div className="fade-up">
              <h3 className="text-2xl font-medium lowercase">the man v fat origins</h3>
              <p className="mt-4 text-[15px] leading-relaxed text-white/65">Set up by Andrew Shanahan — who lost five stone himself and was fed up with weight-loss classes aimed only at women — MAN v FAT combines football with easy-to-follow diet and lifestyle advice, plus 24/7 online and offline support.</p>
              <p className="mt-3 text-[15px] leading-relaxed text-white/65">There are the traditional weigh-ins before each game, followed by a 30-minute game of five-a-side. Extra goal bonuses are awarded for the pounds lost by players — so it becomes a real team effort.</p>
              <p className="mt-4 text-[14px] leading-relaxed text-white/50">Players can join up at <a href={SIGNUP} target="_blank" rel="noreferrer" className="accent-text hover:underline">manvfatfootball.org/nottingham</a>, call Ryan James on 07715 439 165 or email football@manvfat.com.</p>
            </div>

            <div className="relative aspect-[2/1] w-full overflow-hidden rounded-3xl fade-up">
              <img src="/manvfat-tile.jpg" alt="Man v Fat matchday at Astro Kings" className="absolute inset-0 h-full w-full object-cover" />
            </div>
          </div>

          {/* price + contact card */}
          <aside>
            <Glass strong className="rounded-[28px] p-7 accent-ring lg:sticky lg:top-28">
              <Tag accent>fa endorsed</Tag>
              <div className="mt-4 text-[19px] font-medium lowercase">man v fat</div>
              <div className="mt-1 text-[13px] text-white/45">monthly membership</div>
              <div className="mt-4 flex items-end gap-1"><span className="tnum text-5xl font-semibold">£28.50</span><span className="mb-1.5 text-[13px] text-white/45">/mo</span></div>
              <div className="mt-6 space-y-3 border-t border-white/10 pt-6 text-[14px] text-white/75">
                <div className="flex items-center gap-2.5"><span className="accent-text" style={{width:16,height:16}}>{I.user({})}</span>Ryan James</div>
                <div className="flex items-center gap-2.5"><span className="accent-text">●</span>07715 439 165</div>
                <div className="flex items-center gap-2.5"><span className="accent-text">●</span>football@manvfat.com</div>
              </div>
              <a href={SIGNUP} target="_blank" rel="noreferrer" className="mt-7 block"><Btn kind="primary" size="lg" className="w-full" iconEnd={I.arrow({})}>sign up</Btn></a>
              <p className="mt-3 text-center text-[12px] text-white/40">register at manvfatfootball.org</p>
            </Glass>
          </aside>
        </div>
      </section>

      {/* how to find us */}
      <Section eyebrow="getting here" title="how to find us">
        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          <Glass strong className="rounded-[30px] p-8">
            <p className="text-[15px] leading-relaxed text-white/65">Astro Kings 5-a-side football centre is located next to Harvey Hadden Sports Village in Bilborough, Nottingham, NG8.</p>
            <p className="mt-3 text-[15px] leading-relaxed text-white/65">The ground is easily accessible from M1 Junction 26 — just 4 minutes from the motorway to the pitches. Ideal for players in Ilkeston, Beeston, Bilborough, Stapleford and Hucknall.</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {['M1 Junction 26 · 4 min','Free parking','Floodlit 4G','Changing & showers'].map(t=>(
                <span key={t} className="glass rounded-full px-3 py-1.5 text-[12.5px] text-white/70">{t}</span>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-2.5 text-[14px] text-white/75"><span className="accent-text" style={{width:16,height:16}}>{I.pin({})}</span>{CONTACT.addr}<span className="text-white/30">·</span><span className="accent-text">{CONTACT.phone}</span></div>
          </Glass>
          <div className="aspect-square w-full overflow-hidden rounded-3xl glass">
            <Map className="h-full w-full" />
          </div>
        </div>
      </Section>
      <Footer />
    </div>
  );
}
