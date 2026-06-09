/* Dashboard.jsx — my bookings (live from the booking engine) */

import { useState } from 'react';
import { I } from '../lib/icons.jsx';
import { go } from '../lib/router.js';
import { Glass, Btn, Tag, PageHead } from '../components/ui.jsx';
import { Footer } from '../components/Nav.jsx';
import { PITCHES, PITCH_PHOTO } from '../lib/data.js';
import { useStore, currentUser } from '../lib/store.js';
import { bookingsFor, extendBooking, cancelBooking, endTimeOf } from '../lib/booking.js';

const STATUS_LABEL = {
  pending_deposit:'awaiting deposit', confirmed:'confirmed',
  completed:'completed', cancelled:'cancelled', no_show:'no-show',
};
const pitchName = (id) => (PITCHES.find(p=>p.id===id)||{}).name || id;

function BookingCard({ b, onMsg }){
  const live = b.status==='confirmed' || b.status==='pending_deposit';
  return (
    <Glass strong className="grid gap-4 rounded-3xl p-4 sm:grid-cols-[120px_1fr]">
      <div className="relative aspect-video overflow-hidden rounded-2xl sm:aspect-auto sm:min-h-[90px]">
        <img src={PITCH_PHOTO} alt={pitchName(b.pitchId)} className="absolute inset-0 h-full w-full object-cover" />
      </div>
      <div className="flex flex-col">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-[17px] font-medium">{pitchName(b.pitchId)}</div>
            <div className="mt-1 text-[13px] text-white/55">{b.day} · {b.startTime}–{b.endTime} · {b.hours}h</div>
          </div>
          <Tag accent={b.status==='confirmed'}>{STATUS_LABEL[b.status]}</Tag>
        </div>

        <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-[12px] text-white/55">
          <span>total <span className="tnum text-white/80">£{b.total}</span></span>
          <span>paid <span className="tnum text-white/80">£{b.amountPaid}</span></span>
          {b.balanceDue>0 && b.status!=='cancelled' ? <span>on arrival <span className="tnum accent-text">£{b.balanceDue}</span></span> : null}
          {b.cancelOutcome==='refunded_credit' ? <span className="accent-text">refunded to credit</span> : null}
          {b.cancelOutcome==='forfeited' ? <span className="text-white/40">deposit forfeited</span> : null}
          {b.cancelOutcome==='venue_cancelled' ? <span className="accent-text">venue cancelled · refunded</span> : null}
        </div>

        {live ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {b.status==='confirmed' ? (
              <Btn kind="glass" size="sm" onClick={()=>{ const r=extendBooking(b.id,1); onMsg(r.ok?`Extended to ${endTimeOf(b.startTime,b.hours+1)} · +£${r.charged} charged`:r.error); }}>extend +1h</Btn>
            ) : null}
            <Btn kind="glass" size="sm" onClick={()=>{ const r=cancelBooking(b.id); onMsg(r.ok?(r.refundCredit?`Cancelled · £${r.refundCredit} added to credit`:'Cancelled · deposit forfeited (within 24h)'):r.error); }}>cancel</Btn>
            <span className="ml-auto self-center tnum text-[12px] text-white/40">ref {b.id}</span>
          </div>
        ) : <div className="mt-3 tnum text-[12px] text-white/35">ref {b.id}</div>}
      </div>
    </Glass>
  );
}

export function Dashboard(){
  useStore();
  const user = currentUser();
  const [msg,setMsg] = useState('');

  if (!user){
    return (
      <div>
        <PageHead eyebrow="my bookings" title="log in to continue" sub="Sign in to see your upcoming games, payment splits and store credit.">
          <a href="#login"><Btn kind="primary" iconEnd={I.arrow({})}>log in</Btn></a>
        </PageHead>
        <Footer />
      </div>
    );
  }

  const all = bookingsFor(user.id);
  const upcoming = all.filter(b=>['confirmed','pending_deposit'].includes(b.status));
  const past = all.filter(b=>['completed','cancelled','no_show'].includes(b.status));

  return (
    <div>
      <PageHead eyebrow={`welcome back, ${user.name.split(' ')[0]||'captain'}`} title="my bookings"
        sub="Your upcoming games, store credit and loyalty — all in one place.">
        <a href="#booking"><Btn kind="primary" iconEnd={I.arrow({})}>book again</Btn></a>
      </PageHead>

      {msg ? <div className="mx-auto mt-6 max-w-6xl px-6"><div className="rounded-2xl glass glass-soft px-4 py-3 text-[13px] accent-text">{msg}</div></div> : null}

      <div className="mx-auto mt-10 grid max-w-6xl gap-6 px-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-3">
            {[[`£${user.accountCredit}`,'account credit'],[String(all.filter(b=>b.status==='confirmed').length),'confirmed games'],[String(user.noShowCount),'no-shows']].map(([v,l],i)=>(
              <Glass key={i} className="rounded-3xl p-5"><div className="tnum text-3xl font-semibold accent-text">{v}</div><div className="mt-1 text-[12px] text-white/50">{l}</div></Glass>
            ))}
          </div>

          <div>
            <div className="mb-3 text-[12px] uppercase tracking-wide text-white/45">upcoming</div>
            {upcoming.length ? (
              <div className="space-y-3">{upcoming.map(b=><BookingCard key={b.id} b={b} onMsg={setMsg} />)}</div>
            ) : (
              <Glass className="rounded-3xl p-8 text-center text-[14px] text-white/55">No upcoming games yet. <a href="#booking" className="accent-text">Book a pitch →</a></Glass>
            )}
          </div>

          {past.length ? (
            <div>
              <div className="mb-3 text-[12px] uppercase tracking-wide text-white/45">past & cancelled</div>
              <Glass className="divide-y divide-white/8 rounded-3xl">
                {past.map(b=>(
                  <div key={b.id} className="flex items-center justify-between px-5 py-4">
                    <div className="flex items-center gap-3"><span className="glass grid h-9 w-9 place-items-center rounded-xl accent-text"><span style={{width:16,height:16}}>{I.ball({})}</span></span>
                      <div><div className="text-[14px]">{pitchName(b.pitchId)}</div><div className="text-[12px] text-white/45">{b.day} · {b.startTime} · {STATUS_LABEL[b.status]}</div></div></div>
                    <button onClick={()=>go('booking',{p:b.pitchId})} className="text-[13px] accent-text">rebook</button>
                  </div>
                ))}
              </Glass>
            </div>
          ) : null}
        </div>

        <aside className="space-y-4">
          <Glass strong className="rounded-3xl p-6">
            <div className="flex items-center gap-2 text-[12px] uppercase tracking-wide text-white/45"><span className="accent-text" style={{width:16,height:16}}>{I.trophy({})}</span> your league</div>
            <div className="mt-3 text-[16px] font-medium">Wednesday Div 2</div>
            <div className="mt-4 space-y-2.5">
              {[['1','FC Knock-it-long','21'],['2','Allstars','18'],['3','Your team','17'],['4','Toon Army','14']].map(([pos,n,pts])=>(
                <div key={pos} className={`flex items-center justify-between rounded-xl px-3 py-2 text-[13px] ${n==='Your team'?'accent-ring bg-white/5':''}`}>
                  <span className="flex items-center gap-3"><span className="tnum w-4 text-white/40">{pos}</span>{n}</span>
                  <span className="tnum text-white/70">{pts} pts</span>
                </div>
              ))}
            </div>
            <a href="#leagues"><Btn kind="glass" size="sm" className="mt-4 w-full" iconEnd={I.arrow({})}>full table</Btn></a>
          </Glass>

          <Glass className="rounded-3xl p-6">
            <div className="text-[12px] uppercase tracking-wide text-white/45">loyalty · gold</div>
            <div className="mt-3 flex items-center justify-between text-[13px] text-white/55"><span>2 games to a free pitch</span><span className="tnum accent-text">10/12</span></div>
            <div className="mt-2 flex gap-1">{Array.from({length:12}).map((_,i)=><span key={i} className={`h-2 flex-1 rounded-full ${i<10?'accent-bg':'bg-white/10'}`}></span>)}</div>
          </Glass>
        </aside>
      </div>
      <Footer />
    </div>
  );
}
