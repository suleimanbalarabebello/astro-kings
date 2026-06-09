/* Calendar.jsx — liquid-glass month calendar with month/year navigation.
   value/onChange use ISO day-keys ('YYYY-MM-DD'); past dates are disabled. */

import { useState } from 'react';
import { toKey, fromKey, startOfToday, isSameDay, monthLabel } from '../lib/dates.js';
import { Glass } from './ui.jsx';

const WEEK = ['Mo','Tu','We','Th','Fr','Sa','Su'];

function NavBtn({ onClick, children, label }){
  return (
    <button onClick={onClick} aria-label={label}
      className="glass glass-soft grid h-8 w-8 place-items-center rounded-full text-[14px] text-white/75 transition hover:bg-white/12">
      {children}
    </button>
  );
}

export function Calendar({ value, onChange, className='' }){
  const today = startOfToday();
  const selected = value ? fromKey(value) : null;
  const [view, setView] = useState(new Date((selected||today).getFullYear(), (selected||today).getMonth(), 1));

  const year = view.getFullYear(), month = view.getMonth();
  const startWeekday = (new Date(year, month, 1).getDay() + 6) % 7;   // Monday-first
  const daysInMonth = new Date(year, month+1, 0).getDate();

  const cells = [];
  for (let i=0; i<startWeekday; i++) cells.push(null);
  for (let d=1; d<=daysInMonth; d++) cells.push(new Date(year, month, d));

  const shiftMonth = (n) => setView(new Date(year, month+n, 1));
  const shiftYear  = (n) => setView(new Date(year+n, month, 1));

  return (
    <Glass strong className={`glass-menu rounded-3xl p-4 ${className}`}>
      <div className="flex items-center justify-between gap-1">
        <NavBtn onClick={()=>shiftYear(-1)} label="previous year">«</NavBtn>
        <NavBtn onClick={()=>shiftMonth(-1)} label="previous month">‹</NavBtn>
        <div className="flex-1 text-center text-[13px] font-medium">{monthLabel(view)}</div>
        <NavBtn onClick={()=>shiftMonth(1)} label="next month">›</NavBtn>
        <NavBtn onClick={()=>shiftYear(1)} label="next year">»</NavBtn>
      </div>

      <div className="mt-3 grid grid-cols-7 gap-1 text-center text-[10px] uppercase tracking-wide text-white/35">
        {WEEK.map(w=><div key={w}>{w}</div>)}
      </div>
      <div className="mt-1 grid grid-cols-7 gap-1">
        {cells.map((d,i)=>{
          if (!d) return <div key={i} />;
          const past   = d < today;
          const isSel  = selected && isSameDay(d, selected);
          const isToday = isSameDay(d, today);
          return (
            <button key={i} disabled={past} onClick={()=>onChange(toKey(d))}
              className={`grid h-9 place-items-center rounded-xl text-[13px] tnum transition
                ${past ? 'cursor-not-allowed text-white/20'
                  : isSel ? 'accent-bg font-semibold text-[#0b0b0b]'
                  : 'glass glass-soft text-white/80 hover:bg-white/12'}
                ${isToday && !isSel ? 'ring-1 ring-[var(--accent)]' : ''}`}>
              {d.getDate()}
            </button>
          );
        })}
      </div>
    </Glass>
  );
}
