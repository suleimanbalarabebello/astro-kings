/* Parties.jsx — Book a Kids Football Party: info on the packages + a contact
   form for enquiries direct to us.

   Look: playful party identity — pink + cyan on a warm-dark backdrop, scoped
   to this page. */

import { I } from '../lib/icons.jsx';
import { scrollToId } from '../lib/router.js';
import { CONTACT } from '../lib/data.js';
import { Glass, Btn, Tag, Eyebrow } from '../components/ui.jsx';
import { EnquiryForm } from '../components/Enquiry.jsx';
import { Section } from './Home.jsx';
import { Footer } from '../components/Nav.jsx';

const PINK = '#FF5CA8';
const CYAN = '#35D6E8';

export function Parties(){
  const pkgs = [
    { n:'Championship', price:'£85', dur:'1 hour', tag:'', c:CYAN,
      feat:['12 players included','30 min coaching','30 min match play','LED-lit 4G pitch','Optional cabin hire +£25'] },
    { n:'Premiership', price:'£159.99', dur:'2 hours', tag:'most popular', c:PINK,
      feat:['12 players included','45 min games + 45 min match','Party photo & hot food','Certificate for every player','Trophy for the birthday child','Extra players £14.99 each'] },
    { n:'Kings', price:'£249.99', dur:'2 hours', tag:'all-in', c:CYAN,
      feat:['Everything in Premiership','Birthday cake','Sweet party bags + medals for all','Special medal, trophy & football','Extra players £24.99 each'] },
  ];
  const jump = (id)=>(e)=>{ e.preventDefault(); scrollToId(id); };

  return (
    /* scope the brand accent to PINK for this page (buttons, links, glows) */
    <div style={{ '--accent': PINK, '--accent-2': '#FF9AC6' }}>
      {/* page-scoped party backdrop */}
      <div className="pointer-events-none fixed inset-0" style={{ zIndex:-1, background:
        'radial-gradient(70% 55% at 12% 0%, rgba(255,92,168,.16), transparent 55%),'+
        'radial-gradient(70% 55% at 90% 6%, rgba(53,214,232,.14), transparent 55%),'+
        'radial-gradient(95% 70% at 50% 120%, rgba(255,92,168,.09), transparent 60%),'+
        'linear-gradient(180deg, #0d070c 0%, #0a080b 55%, #070608 100%)' }}></div>

      {/* ---------- image hero ---------- */}
      <section className="media-hero relative h-[60vh] min-h-[420px] w-full overflow-hidden">
        <img src="/party.jpg" alt="Kids football party at Astro Kings" fetchpriority="high" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0" style={{background:'linear-gradient(180deg, rgba(7,6,8,.5) 0%, rgba(7,6,8,.36) 34%, rgba(7,6,8,.96) 100%)'}}></div>
        <div className="pointer-events-none absolute inset-0" style={{background:'radial-gradient(60% 70% at 18% 20%, rgba(255,92,168,.2), transparent 55%), radial-gradient(55% 70% at 85% 85%, rgba(53,214,232,.16), transparent 55%)'}}></div>

        <div className="relative z-10 mx-auto flex h-full max-w-4xl items-center justify-center px-6 text-center">
          <div className="pop">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[.22em] text-white backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full" style={{background:PINK, boxShadow:`0 0 10px ${PINK}`}}></span>
              kids football parties
            </span>
            <h1 className="hero-title mt-5 text-5xl font-semibold lowercase leading-[.98] md:text-7xl">a party they’ll<br/><span style={{color:PINK}}>never forget</span></h1>
            <div className="mx-auto mt-5 h-[3px] w-40 rounded-full" style={{background:`linear-gradient(90deg, transparent, ${PINK}, ${CYAN})`}}></div>
            <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-white/80">
              Fully hosted football birthday parties on floodlit 4G — coaching, matches, mini-tournaments, photos and
              prizes. Built around your child, run by qualified coaches.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <a href="#party-enquiry" onClick={jump('party-enquiry')}><Btn kind="primary" size="lg" iconEnd={I.arrow({})}>enquire now</Btn></a>
              <a href="#packages" onClick={jump('packages')}><Btn kind="outline" size="lg">see packages</Btn></a>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- packages ---------- */}
      <div id="packages"></div>
      <Section eyebrow="party packages" title="pick your party">
        <div className="grid gap-4 md:grid-cols-3">
          {pkgs.map((m,i)=>(
            <Glass key={m.n} strong={i===1} className={`flex flex-col rounded-[28px] p-7 transition-transform duration-300 hover:-translate-y-1.5 fade-up ${i===1?'accent-ring':''}`} style={{animationDelay:(i*.06)+'s'}}>
              {m.tag ? <Tag accent className="self-start mb-3">{m.tag}</Tag> : <span className="mb-3 h-6"></span>}
              <div className="text-[19px] font-medium lowercase" style={{color:m.c}}>{m.n}</div>
              <div className="mt-1 text-[13px] text-white/45">{m.dur} · 12 players</div>
              <div className="mt-5 flex items-end gap-1"><span className="tnum text-5xl font-semibold">{m.price}</span></div>
              <ul className="mt-6 flex-1 space-y-3 text-[14px] text-white/75">
                {m.feat.map(f=><li key={f} className="flex items-center gap-3"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full" style={{background:m.c+'1e',color:m.c}}><span style={{width:13,height:13}}>{I.check({})}</span></span>{f}</li>)}
              </ul>
              <a href="#party-enquiry" onClick={jump('party-enquiry')} className="mt-7"><Btn kind={i===1?'primary':'outline'} size="lg" className="w-full">book {m.n.toLowerCase()}</Btn></a>
            </Glass>
          ))}
        </div>

        <Glass strong className="mt-4 flex flex-col items-center justify-between gap-4 rounded-3xl p-7 text-center md:flex-row md:text-left">
          <div><div className="text-[16px] font-medium">Every party is built around your child</div><div className="mt-1 text-[14px] text-white/55">Skills training, matches, games or a mini-tournament — plus photos & video. All dietary requirements catered for.</div></div>
          <a href="#party-enquiry" onClick={jump('party-enquiry')}><Btn kind="glass" iconEnd={I.arrow({})}>talk to the team</Btn></a>
        </Glass>
      </Section>

      {/* ---------- enquire direct ---------- */}
      <section id="party-enquiry" className="mx-auto mt-24 max-w-6xl px-6">
        <Glass strong className="relative overflow-hidden rounded-[34px] p-8 md:p-12">
          <div className="pointer-events-none absolute -left-16 -bottom-16 h-64 w-64 rounded-full opacity-20 blur-3xl" style={{background:PINK}}></div>
          <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <Eyebrow>enquire direct</Eyebrow>
              <h2 className="hero-title mt-3 text-3xl font-semibold lowercase md:text-4xl">book a kids party</h2>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/65">
                Tell us the date you have in mind, how many children and the age group — we’ll come back the same day
                with availability and a full price. Or reach us directly:
              </p>
              <div className="mt-5 space-y-2.5 text-[14px]">
                <a href={'tel:'+CONTACT.phone.replace(/\s/g,'')} className="flex items-center gap-3 text-white/80 hover:text-white"><span className="grid h-9 w-9 place-items-center rounded-full" style={{background:PINK+'22',color:PINK}}><span style={{width:16,height:16}}>{I.clock({})}</span></span>{CONTACT.phone}</a>
                <a href={'mailto:'+CONTACT.email} className="flex items-center gap-3 text-white/80 hover:text-white"><span className="grid h-9 w-9 place-items-center rounded-full" style={{background:CYAN+'22',color:CYAN}}><span style={{width:16,height:16}}>{I.arrow({})}</span></span>{CONTACT.email}</a>
              </div>
            </div>
            <Glass strong className="rounded-[30px] p-7">
              <div className="text-[12px] uppercase tracking-wide text-white/45">party enquiry</div>
              <div className="mt-4">
                <EnquiryForm cta="enquire about a party" placeholder="e.g. Saturday 14th, 12 kids, age 8…" />
              </div>
            </Glass>
          </div>
        </Glass>
      </section>
      <Footer />
    </div>
  );
}
