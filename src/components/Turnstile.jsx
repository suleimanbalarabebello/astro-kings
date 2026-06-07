/* Turnstile.jsx — real Cloudflare Turnstile captcha widget.

   Loads the Turnstile script once, renders an explicit widget, and reports the
   verification token via onVerify. Token verification must also happen
   server-side (/siteverify) before this is production-secure — see config.js. */

import { useEffect, useRef } from 'react';
import { TURNSTILE_SITE_KEY } from '../lib/config.js';

const SCRIPT_ID = 'cf-turnstile-script';
const SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

function ensureScript(){
  if (document.getElementById(SCRIPT_ID)) return;
  const s = document.createElement('script');
  s.id = SCRIPT_ID; s.src = SRC; s.async = true; s.defer = true;
  document.head.appendChild(s);
}

export function Turnstile({ onVerify, onExpire, className = '' }){
  const holder = useRef(null);
  const widgetId = useRef(null);

  useEffect(() => {
    ensureScript();
    let cancelled = false;

    const render = () => {
      if (cancelled) return;
      const api = window.turnstile;
      if (api && holder.current && widgetId.current == null) {
        widgetId.current = api.render(holder.current, {
          sitekey: TURNSTILE_SITE_KEY,
          theme: 'dark',
          callback: (token) => onVerify && onVerify(token),
          'expired-callback': () => onExpire && onExpire(),
          'error-callback':   () => onExpire && onExpire(),
        });
      } else {
        setTimeout(render, 200);   // script still loading — try again shortly
      }
    };
    render();

    return () => {
      cancelled = true;
      try { if (widgetId.current != null && window.turnstile) window.turnstile.remove(widgetId.current); } catch (e) { /* ignore */ }
      widgetId.current = null;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <div ref={holder} className={className} />;
}
