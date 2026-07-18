/* NottsOlympic.jsx — Notts Olympic Football Club: the club that runs the centre.
   Goal: grow followers, supporters and sponsorship (site's secondary objective).
   Content modelled on nottsolympic.com's structure — all copy re-branded here.
   TODO: client to supply real club history, team list, fixtures, crest,
   photos, social handles and sponsorship pack/pricing. */

import { I } from '../lib/icons.jsx';
import { CONTACT } from '../lib/data.js';
import { Glass, Btn, Tag, Eyebrow, PageHead, CountUp } from '../components/ui.jsx';
import { EnquiryForm } from '../components/Enquiry.jsx';
import { Section } from './Home.jsx';
import { Footer } from '../components/Nav.jsx';

/* TODO: replace with the club's real teams & age groups */
const TEAMS = [
  { name:'First team',   d:'Senior men’s side — league & cup football.' },
  { name:'Development',  d:'The pathway squad for emerging senior players.' },
  { name:'Juniors',      d:'Boys & girls age groups from U7 to U16.' },
  { name:'Walking football', d:'Slower pace, same game — open to all.' },
];

const SUPPORT = [
  { ic:I.user,   t:'follow the club',  d:'Match updates, results and behind-the-scenes on our socials.', cta:'follow us', to:CONTACT.instagram, ext:true },
  { ic:I.ball,   t:'come to a game',   d:'Home fixtures are played right here at the centre — free entry.', cta:'see fixtures', to:'#contact' },      /* TODO: fixtures page/link */
  { ic:I.trophy, t:'sponsor the club', d:'Shirt, pitchside and matchday sponsorship packages for local businesses.', cta:'enquire below', to:'#nottsolympic' },
];

export function NottsOlympic(){
  return (
    <div>
      <PageHead eyebrow="the club behind the centre" title="notts olympic fc"
        sub="Notts Olympic Football Club now operates Astro Kings — a community club with senior, junior and walking football, built on this ground. Follow us, support us, or partner with us.">
        <a href={CONTACT.instagram} target="_blank" rel="noreferrer"><Btn kind="primary" iconEnd={I.arrow({})}>follow the club</Btn></a>
      </PageHead>

      {/* club stats — TODO: real numbers */}
      <div className="mx-auto mt-10 max-w-6xl px-6">
        <Glass strong className="grid gap-4 rounded-[30px] p-7 sm:grid-cols-4 fade-up">
          {[['1966','club founded'],['12','teams'],['200+','registered players'],['NG8','our home ground']].map(([v,l],i)=>(
            <div key={i}><div className="tnum text-4xl font-semibold accent-text"><CountUp value={v} /></div><div className="mt-1 text-[13px] text-white/55">{l}</div></div>
          ))}
        </Glass>
      </div>

      {/* story */}
      <section className="mx-auto mt-16 max-w-3xl px-6">
        <h2 className="hero-title text-3xl font-semibold lowercase md:text-4xl">a community club with a home of its own</h2>
        {/* TODO: replace with the club's real history */}
        <p className="mt-5 text-[15px] leading-relaxed text-white/65">
          Notts Olympic FC is a grassroots football club rooted in west Nottingham. Taking on the running of the
          Astro Kings centre means every booking, party and league played here directly supports the club — keeping
          football affordable for local families and giving our teams a permanent home.
        </p>
        <p className="mt-4 text-[15px] leading-relaxed text-white/65">
          From the first team to our youngest juniors, the club is run by volunteers and funded by the community
          it serves. The more the centre thrives, the more the club can do.
        </p>
      </section>

      {/* teams */}
      <Section eyebrow="who plays here" title="our teams">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TEAMS.map((t,i)=>(
            <Glass key={t.name} className="rounded-3xl p-6 fade-up" style={{animationDelay:(i*.05)+'s'}}>
              <span className="glass grid h-12 w-12 place-items-center rounded-2xl accent-text"><span style={{width:22,height:22}}>{I.ball({})}</span></span>
              <div className="mt-4 text-[16px] font-medium lowercase">{t.name}</div>
              <p className="mt-2 text-[13.5px] leading-relaxed text-white/55">{t.d}</p>
            </Glass>
          ))}
        </div>
        <p className="mt-4 text-[13px] text-white/45">Want to play for Notts Olympic? <a href="#coaching" className="accent-text hover:underline">Juniors start here</a> or <a href="#contact" className="accent-text hover:underline">get in touch</a> about senior trials.</p>
      </Section>

      {/* support the club */}
      <Section eyebrow="get behind us" title="three ways to support">
        <div className="grid gap-4 md:grid-cols-3">
          {SUPPORT.map((s,i)=>(
            <Glass key={s.t} strong className="flex flex-col rounded-3xl p-6 fade-up" style={{animationDelay:(i*.06)+'s'}}>
              <span className="glass grid h-12 w-12 place-items-center rounded-2xl accent-text"><span style={{width:22,height:22}}>{s.ic({})}</span></span>
              <div className="mt-4 text-[17px] font-medium lowercase">{s.t}</div>
              <p className="mt-2 flex-1 text-[14px] leading-relaxed text-white/55">{s.d}</p>
              <a href={s.to} {...(s.ext?{target:'_blank',rel:'noreferrer'}:{})} className="mt-4"><Btn kind="outline" size="sm" iconEnd={I.arrow({})}>{s.cta}</Btn></a>
            </Glass>
          ))}
        </div>
      </Section>

      {/* sponsorship enquiry */}
      <section className="mx-auto mt-20 max-w-6xl px-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
          <div>
            <Eyebrow>partner with us</Eyebrow>
            <h2 className="hero-title mt-3 text-3xl font-semibold lowercase md:text-4xl">sponsor notts olympic</h2>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/65">
              Put your business in front of hundreds of local players and families every week — on shirts, pitchside
              boards and matchday coverage. {/* TODO: real sponsorship tiers & pricing pack */}
              Packages start from a season of shirt sponsorship down to single-event support; every pound goes back
              into grassroots football.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {['Shirt sponsorship','Pitchside boards','Matchday sponsor','Junior kit sponsor'].map(t=>(
                <Tag key={t}>{t}</Tag>
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
