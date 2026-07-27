/* router.js — tiny hash router (history-free, prototype-faithful) */

import { useState, useEffect } from 'react';
import { ROUTES } from './data.js';

export function parseHash(){
  const raw = (location.hash || '#home').replace(/^#/, '');
  const [name, q] = raw.split('?');
  const params = {};
  if (q) q.split('&').forEach(kv => { const [k,v] = kv.split('='); params[k] = decodeURIComponent(v||''); });
  return { name: ROUTES.includes(name) ? name : 'home', params };
}

export function go(name, params){
  let h = '#' + name;
  if (params && Object.keys(params).length) h += '?' + Object.entries(params).map(([k,v])=>k+'='+encodeURIComponent(v)).join('&');
  if (location.hash === h) { window.dispatchEvent(new Event('hashchange')); }
  else location.hash = h;
  try { document.querySelector('#scroller')?.scrollTo({ top: 0, behavior: 'instant' }); } catch(e){}
  window.scrollTo(0,0);
}

/* smooth-scroll to an in-page section by id, clearing the fixed nav.
   Used for on-page anchors (#story, #partner, #register …) that must NOT be
   treated as routes by the hash router. */
export function scrollToId(id){
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 88;
  window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
}

export function useRoute(){
  const [r, setR] = useState(parseHash());
  useEffect(()=>{
    const on = ()=> setR(parseHash());
    window.addEventListener('hashchange', on);
    return ()=> window.removeEventListener('hashchange', on);
  },[]);
  return r;
}
