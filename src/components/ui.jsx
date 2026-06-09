/* ui.jsx — design primitives (glass, buttons, fields, headings…) */

import { useState, useEffect, useRef } from 'react';
import logoWhite from '../assets/astro-kings-logo-white.png';

/* CountUp — animates a numeric value up to its target when scrolled into view.
   Keeps any prefix/suffix (£, %, lbs); non-numeric values (e.g. "FA") render as-is. */
export function CountUp({ value, duration = 1400, className = '' }){
  const ref = useRef(null);
  const m = String(value).match(/^(\D*)(\d[\d,]*\.?\d*)(.*)$/);
  const [display, setDisplay] = useState(m ? m[1] + '0' + m[3] : value);

  useEffect(() => {
    if (!m) { setDisplay(value); return; }
    const prefix = m[1], suffix = m[3];
    const target = parseFloat(m[2].replace(/,/g, ''));
    const decimals = (m[2].split('.')[1] || '').length;
    let raf, start = null, started = false;

    const run = (ts) => {
      if (start == null) start = ts;
      const p = Math.min(1, (ts - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);                  // easeOutCubic
      setDisplay(prefix + (target * eased).toFixed(decimals) + suffix);
      if (p < 1) raf = requestAnimationFrame(run);
      else setDisplay(prefix + target.toFixed(decimals) + suffix);
    };

    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !started) { started = true; raf = requestAnimationFrame(run); io.disconnect(); }
    }, { threshold: 0.35 });
    if (ref.current) io.observe(ref.current);

    return () => { if (raf) cancelAnimationFrame(raf); io.disconnect(); };
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  return <span ref={ref} className={className}>{display}</span>;
}

/* ---------------------------------------------------------------- logo */
export function Logo({ className='', h=30 }){
  return <img src={logoWhite} alt="Astro Kings" style={{ height:h }} className={className} draggable="false" />;
}

/* ---------------------------------------------------------------- glass + ui */
export function Glass({ as:Tag='div', className='', strong=false, soft=false, style, children, ...rest }){
  return <Tag className={`glass ${strong?'glass-strong':''} ${soft?'glass-soft':''} ${className}`} style={style} {...rest}>{children}</Tag>;
}

export function Btn({ kind='primary', size='md', className='', icon, iconEnd, children, ...rest }){
  const sz = size==='lg' ? 'h-14 px-7 text-[15px]' : size==='sm' ? 'h-9 px-4 text-[13px]' : 'h-12 px-6 text-[14px]';
  const base = `inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 active:scale-[.97] whitespace-nowrap`;
  let look;
  if (kind==='primary') look = 'text-[#0b0b0b] accent-bg accent-glow hover:brightness-110';
  else if (kind==='glass') look = 'glass glass-soft text-white hover:bg-white/10';
  else if (kind==='ghost') look = 'text-white/80 hover:text-white hover:bg-white/8';
  else if (kind==='outline') look = 'text-white border border-white/22 hover:border-white/45 hover:bg-white/5';
  return (
    <button className={`${base} ${sz} ${look} ${className}`} {...rest}>
      {icon ? <span className="-ml-0.5 grid place-items-center" style={{width:18,height:18}}>{icon}</span> : null}
      {children}
      {iconEnd ? <span className="-mr-0.5 grid place-items-center" style={{width:18,height:18}}>{iconEnd}</span> : null}
    </button>
  );
}

export function Tag({ children, accent=false, className='' }){
  return <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-wide ${accent?'text-[#0b0b0b] accent-bg':'glass text-white/80'} ${className}`}>{children}</span>;
}

export function Eyebrow({ children, className='' }){
  return (
    <div className={`inline-flex items-center gap-2.5 text-[11px] uppercase tracking-[.22em] text-white/55 ${className}`}>
      <span className="h-1.5 w-1.5 rounded-full accent-bg" style={{boxShadow:'0 0 10px var(--accent)'}}></span>
      {children}
    </div>
  );
}

export function Field({ label, icon, children, className='' }){
  return (
    <label className={`block ${className}`}>
      {label ? <span className="mb-2 block text-[12px] uppercase tracking-wide text-white/45">{label}</span> : null}
      <span className="glass glass-soft flex h-12 items-center gap-2.5 rounded-2xl px-4 text-white/85">
        {icon ? <span className="text-white/45" style={{width:18,height:18}}>{icon}</span> : null}
        {children}
      </span>
    </label>
  );
}

export function Placeholder({ label, className='', style, children }){
  return <div className={`ph rounded-2xl ${className}`} style={style}>{children}{label ? <span className="ph-label">{label}</span> : null}</div>;
}

export function Stat({ value, label, align='left' }){
  return (
    <div className={align==='right'?'text-right':''}>
      <div className="tnum text-3xl md:text-4xl font-semibold">{value}</div>
      <div className="mt-1 text-[13px] text-white/55">{label}</div>
    </div>
  );
}

/* page heading band used across inner pages */
export function PageHead({ eyebrow, title, sub, children }){
  return (
    <div className="fade-up mx-auto max-w-6xl px-6 pt-28 md:pt-36">
      <Eyebrow>{eyebrow}</Eyebrow>
      <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="hero-title text-5xl md:text-[64px] font-semibold lowercase">{title}</h1>
          {sub ? <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/60">{sub}</p> : null}
        </div>
        {children}
      </div>
    </div>
  );
}
