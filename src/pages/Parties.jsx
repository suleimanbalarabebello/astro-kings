/* Parties.jsx — kids football birthday parties */

import { I } from '../lib/icons.jsx';
import { Glass, Btn, Tag, Placeholder, PageHead, Eyebrow } from '../components/ui.jsx';
import { EnquiryForm } from '../components/Enquiry.jsx';
import { Section } from './Home.jsx';
import { Footer } from '../components/Nav.jsx';

export function Parties(){
  const pkgs = [
    { n:'Championship', price:'£85', dur:'1 hour', tag:'',
      feat:['12 players included','30 min coaching','30 min match play','LED-lit 4G pitch','Optional cabin hire +£25'] },
    { n:'Premiership', price:'£159.99', dur:'2 hours', tag:'most popular',
      feat:['12 players included','45 min games + 45 min match','Party photo & hot food','Certificate for every player','Trophy for the birthday child','Extra players £14.99 each'] },
    { n:'Kings', price:'£249.99', dur:'2 hours', tag:'all-in',
      feat:['Everything in Premiership','Birthday cake','Sweet party bags + medals for all','Special medal, trophy & football','Extra players £24.99 each'] },
  ];
  return (
    <div>
      <PageHead eyebrow="kids football parties" title="parties they’ll never forget"
        sub="Fully hosted football birthday parties on floodlit 4G — coaching, matches, mini-tournaments, photos and prizes. Built around your child, run by qualified Kings Academy coaches.">
        <a href="#party-enquiry"><Btn kind="primary" iconEnd={I.arrow({})}>enquire now</Btn></a>
      </PageHead>

      <div className="mx-auto mt-10 max-w-6xl px-6">
        <Placeholder label="party · kids celebrating on the 4g" className="aspect-[21/9] w-full rounded-[34px] fade-up" />
      </div>

      <div className="mx-auto mt-12 max-w-6xl px-6">
        <div className="grid gap-4 md:grid-cols-3">
          {pkgs.map((m,i)=>(
            <Glass key={m.n} strong={i===1} className={`flex flex-col rounded-[28px] p-7 fade-up ${i===1?'accent-ring':''}`} style={{animationDelay:(i*.06)+'s'}}>
              {m.tag ? <Tag accent className="self-start mb-3">{m.tag}</Tag> : <span className="mb-3 h-6"></span>}
              <div className="text-[19px] font-medium lowercase">{m.n}</div>
              <div className="mt-1 text-[13px] text-white/45">{m.dur} · 12 players</div>
              <div className="mt-5 flex items-end gap-1"><span className="tnum text-5xl font-semibold">{m.price}</span></div>
              <ul className="mt-6 flex-1 space-y-3 text-[14px] text-white/70">
                {m.feat.map(f=><li key={f} className="flex items-center gap-3"><span className="glass grid h-6 w-6 place-items-center rounded-full accent-text"><span style={{width:13,height:13}}>{I.check({})}</span></span>{f}</li>)}
              </ul>
              <a href="#about" className="mt-7"><Btn kind={i===1?'primary':'outline'} size="lg" className="w-full">book {m.n.toLowerCase()}</Btn></a>
            </Glass>
          ))}
        </div>

        <Glass strong className="mt-8 flex flex-col items-center justify-between gap-4 rounded-3xl p-7 text-center md:flex-row md:text-left">
          <div><div className="text-[16px] font-medium">Every party is built to your preference</div><div className="mt-1 text-[14px] text-white/55">Skills training, matches, games or a mini-tournament — plus photos & video. All dietary requirements catered for.</div></div>
          <a href="#about"><Btn kind="glass" iconEnd={I.arrow({})}>talk to the team</Btn></a>
        </Glass>
      </div>
      {/* party enquiry */}
      <section id="party-enquiry" className="mx-auto mt-20 max-w-6xl px-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_440px]">
          <div>
            <Eyebrow>book a party</Eyebrow>
            <h2 className="hero-title mt-3 text-3xl font-semibold lowercase md:text-4xl">enquire about a kids party</h2>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/65">
              Tell us the date you have in mind, how many children, and the age group — we’ll come back with
              availability and a full price the same day.
            </p>
          </div>
          <Glass strong className="rounded-[30px] p-7">
            <div className="text-[12px] uppercase tracking-wide text-white/45">party enquiry</div>
            <div className="mt-4">
              <EnquiryForm cta="enquire about a party" placeholder="e.g. Saturday 14th, 12 kids, age 8…" />
            </div>
          </Glass>
        </div>
      </section>
      <Footer />
    </div>
  );
}
