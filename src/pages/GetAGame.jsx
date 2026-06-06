/* GetAGame.jsx — subs bench: join casual games / find a game when you have no team */

import { I } from '../lib/icons.jsx';
import { Glass, Btn, Field, PageHead } from '../components/ui.jsx';
import { Section } from './Home.jsx';
import { Footer } from '../components/Nav.jsx';

export function GetAGame(){
  const steps = [
    { n:'01', t:'register your interest', d:'Tell us which days you can play — Monday through Sunday.' },
    { n:'02', t:'join the whatsapp group', d:'We add you to the Subs Bench group for your area.' },
    { n:'03', t:'get the call-up', d:'When a game is short, we ping the group. First to reply plays.' },
    { n:'04', t:'turn up & play', d:'Be the super sub at Nottingham’s best 5-a-side centre.' },
  ];
  const forWho = [
    { ic:I.pin,  t:'new to the area', d:'Meet people and get straight into regular football.' },
    { ic:I.bolt, t:'after extra games', d:'Top up your week with casual, no-commitment matches.' },
    { ic:I.user, t:'building fitness', d:'Stay active with friendly games at your own pace.' },
  ];
  return (
    <div>
      <PageHead eyebrow="get a game · subs bench" title="be the super sub"
        sub="Players drop out at the last minute all the time. Rather than everyone missing out, join the Subs Bench and get invited to games that need an extra body — no team required.">
        <a href="#getagame"><Btn kind="primary" iconEnd={I.arrow({})}>join the subs bench</Btn></a>
      </PageHead>

      <Section eyebrow="how it works" title="four steps to a game">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s,i)=>(
            <Glass key={i} className="rounded-3xl p-6 fade-up" style={{animationDelay:(i*.05)+'s'}}>
              <div className="tnum text-3xl font-semibold accent-text">{s.n}</div>
              <div className="mt-4 text-[17px] font-medium lowercase">{s.t}</div>
              <p className="mt-2 text-[14px] leading-relaxed text-white/55">{s.d}</p>
            </Glass>
          ))}
        </div>
      </Section>

      <section className="mx-auto mt-24 max-w-6xl px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          <div className="grid gap-4 sm:grid-cols-3">
            {forWho.map((w,i)=>(
              <Glass key={i} className="rounded-3xl p-6 fade-up" style={{animationDelay:(i*.05)+'s'}}>
                <span className="glass grid h-12 w-12 place-items-center rounded-2xl accent-text"><span style={{width:22,height:22}}>{w.ic({})}</span></span>
                <div className="mt-4 text-[16px] font-medium lowercase">{w.t}</div>
                <p className="mt-2 text-[13.5px] leading-relaxed text-white/55">{w.d}</p>
              </Glass>
            ))}
          </div>
          <Glass strong className="rounded-[30px] p-8">
            <h3 className="text-2xl font-medium lowercase">register here</h3>
            <p className="mt-2 text-[14px] text-white/55">Get invites to football games that need a sub.</p>
            <div className="mt-6 space-y-4">
              <Field label="your name" icon={I.user({})}><input className="w-full bg-transparent text-[14px] outline-none placeholder:text-white/35" placeholder="First & last" /></Field>
              <Field label="mobile (for whatsapp)" icon={I.user({})}><input className="w-full bg-transparent text-[14px] outline-none placeholder:text-white/35" placeholder="07…" /></Field>
            </div>
            <div className="mt-5"><Btn kind="primary" size="lg" className="w-full" iconEnd={I.arrow({})}>join the bench</Btn></div>
            <p className="mt-4 text-[12px] text-white/40">No commitment — play as often or as little as you like.</p>
          </Glass>
        </div>
      </section>
      <Footer />
    </div>
  );
}
