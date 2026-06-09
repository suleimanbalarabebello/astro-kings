/* Dashboard.jsx — my bookings (live from the booking engine) */

import { useState } from 'react';
import { I } from '../lib/icons.jsx';
import { go } from '../lib/router.js';
import { Glass, Btn, Tag, Field, PageHead } from '../components/ui.jsx';
import { StripeCard, stripeEnabled } from '../components/StripeCard.jsx';
import { Footer } from '../components/Nav.jsx';
import { PITCHES, PITCH_PHOTO } from '../lib/data.js';
import { useStore, currentUser } from '../lib/store.js';
import { bookingsFor, extendBooking, extendQuote, cancelBooking, confirmAttendance, endTimeOf } from '../lib/booking.js';

const STATUS_LABEL = {
  pending_deposit:'awaiting deposit', confirmed:'confirmed',
  completed:'completed', cancelled:'cancelled', no_show:'no-show',
};
const pitchName = (id) => (PITCHES.find(p=>p.id===id)||{}).name || id;

function ExtendModal({ booking, onClose, onDone }){
  const q = extendQuote(booking.id, 1);
  const [card,setCard] = useState('');
  const [cardComplete,setCardComplete] = useState(false);
  const [err,setErr] = useState('');
  const [success,setSuccess] = useState(null);
  function pay(){
    if (!q.ok) return;
    if (stripeEnabled && !cardComplete){ setErr('Enter your card details.'); return; }
    if (!stripeEnabled && card.replace(/\s/g,'').length < 12){ setErr('Enter your card details.'); return; }
    const r = extendBooking(booking.id, 1, { card: stripeEnabled ? '4242424242424242' : card });
    if (!r.ok){ setErr(r.error); return; }
    setSuccess({ endTime: r.booking.endTime, charged: r.charged });
  }
  return (
    <div className="fixed inset-0 z-[60] grid place-items-center p-4">
      <button aria-label="close" onClick={onClose} className="menu-scrim absolute inset-0" />
      <Glass strong className="glass-menu pop relative w-full max-w-md rounded-[28px] p-6">
        <div className="flex items-center justify-between">
          <div className="text-[12px] uppercase tracking-wide text-white/45">extend booking</div>
          <button onClick={onClose} className="grid h-8 w-8 place-items-center rounded-full text-white/50 hover:bg-white/10"><span style={{width:16,height:16}}>{I.x({})}</span></button>
        </div>

        {success ? (
          <div className="py-4 text-center">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-full accent-bg text-[#0b0b0b]"><span style={{width:30,height:30}}>{I.check({})}</span></span>
            <div className="hero-title mt-4 text-2xl font-semibold lowercase">payment successful</div>
            <p className="mx-auto mt-2 max-w-xs text-[14px] text-white/65">1 hour added — your booking now runs to <span className="text-white">{success.endTime}</span>. <span className="tnum">£{success.charged}</span> paid.</p>
            <Btn kind="primary" className="mt-6 w-full" onClick={()=>onDone(`1 hour added — your booking now ends at ${success.endTime}`)}>done</Btn>
          </div>
        ) : !q.ok ? (
          <>
            <div className={`mt-4 rounded-2xl border px-4 py-3 text-[13px] ${q.maxed?'border-amber-400/30 bg-amber-500/10 text-amber-200':'border-red-400/30 bg-red-500/10 text-red-200'}`}>{q.error}</div>
            <Btn kind="glass" className="mt-5 w-full" onClick={onClose}>close</Btn>
          </>
        ) : (
          <>
            <div className="mt-3 text-[18px] font-medium">{pitchName(booking.pitchId)} · +1 hour</div>
            <div className="mt-1 text-[13px] text-white/55">extends to {q.newEndTime} · added £{q.addedCost}</div>
            <div className="mt-4 rounded-2xl glass glass-soft p-3 text-[13px]">
              <div className="flex justify-between"><span className="text-white/60">Pay now {q.paymentMode==='full'?'(in full)':'(20% deposit)'}</span><span className="tnum accent-text">£{q.chargeNow}</span></div>
              {q.paymentMode!=='full' && (q.addedCost-q.chargeNow)>0 ? <div className="mt-1 flex justify-between"><span className="text-white/60">On arrival</span><span className="tnum">£{q.addedCost - q.chargeNow}</span></div> : null}
            </div>
            <div className="mt-4">
              {stripeEnabled ? (
                <StripeCard onChange={(c)=>{ setCardComplete(c); setErr(''); }} />
              ) : (
                <Field label="card number" icon={I.lock({})}><input value={card} onChange={e=>{setCard(e.target.value);setErr('');}} className="w-full bg-transparent text-[14px] tnum outline-none placeholder:text-white/35" placeholder="4242 4242 4242 4242" /></Field>
              )}
            </div>
            {err ? <div className="mt-3 text-[13px] text-red-300">{err}</div> : null}
            <div className="mt-5 flex gap-2">
              <Btn kind="glass" className="flex-1" onClick={onClose}>cancel</Btn>
              <Btn kind="primary" className="flex-1" onClick={pay}>pay £{q.chargeNow}</Btn>
            </div>
            <div className="mt-2 text-center text-[11px] text-white/40">test mode · use 4242 4242 4242 4242</div>
          </>
        )}
      </Glass>
    </div>
  );
}

function BookingCard({ b, onMsg, onExtend }){
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

        {b.status==='confirmed' && !b.attendanceConfirmed ? (
          <div className="mt-3 flex items-center gap-2 rounded-xl border border-amber-400/25 bg-amber-500/10 px-3 py-2 text-[12px] text-amber-200">
            <span style={{width:14,height:14}}>{I.clock({})}</span> Confirm you’re coming, or your slot may be released.
          </div>
        ) : null}
        {b.status==='confirmed' && b.attendanceConfirmed ? (
          <div className="mt-3 flex items-center gap-1.5 text-[12px] accent-text"><span style={{width:14,height:14}}>{I.check({})}</span> attendance confirmed</div>
        ) : null}

        {live ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {b.status==='confirmed' && !b.attendanceConfirmed ? (
              <Btn kind="primary" size="sm" onClick={()=>{ confirmAttendance(b.id); onMsg('Thanks — attendance confirmed. See you on the pitch!'); }}>confirm attendance</Btn>
            ) : null}
            {b.status==='confirmed' ? (
              <Btn kind="glass" size="sm" onClick={()=>onExtend(b)}>extend +1h</Btn>
            ) : null}
            <Btn kind="glass" size="sm" onClick={()=>{ const r=cancelBooking(b.id); onMsg(r.ok?((r.waitlistOffered?`Cancelled · offered to ${r.waitlistOffered} on the waitlist · `:'Cancelled · ')+(r.refundCredit?`£${r.refundCredit} added to credit`:'deposit forfeited (within 24h)')):r.error); }}>cancel</Btn>
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
  const [extending,setExtending] = useState(null);

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
              <div className="space-y-3">{upcoming.map(b=><BookingCard key={b.id} b={b} onMsg={setMsg} onExtend={setExtending} />)}</div>
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
      {extending ? <ExtendModal booking={extending} onClose={()=>setExtending(null)} onDone={(m)=>{ setMsg(m); setExtending(null); }} /> : null}
    </div>
  );
}
