/* config.js — booking rules in one place so they're trivial to change */

export const DEPOSIT_PERCENT   = 0.20;   // deposit = 20% of total, DEDUCTED from it (not added on top)
export const HOLD_MINUTES      = 15;     // a pending reservation holds the slot(s) this long
export const CANCEL_WINDOW_HRS = 24;     // >24h before start → refund as credit; inside → forfeit
export const NO_SHOW_LIMIT     = 2;      // legacy threshold (kept for compatibility)
export const MAX_HOURS         = 2;      // longest bookable run (consecutive 1h slots)

/* Escalating no-show defence */
export const NO_SHOW_PREPAY_AT = 1;      // after this many no-shows → full prepayment required (no deposit)
export const NO_SHOW_FEE_AT    = 2;      // after this many no-shows → also add a no-show fee
export const NO_SHOW_FEE       = 10;     // £ surcharge added for repeat offenders
export const CONFIRM_WINDOW_HRS = 2;     // must confirm attendance at least this long before kick-off
export const PAYPLAY_PRICE      = 4.5;    // U18 daily pay & play, per person

export const STUDENT_DOMAIN_RE = /\.ac\.uk$/i;  // student status derived from email domain

/* Cloudflare Turnstile site key. This is Cloudflare's official ALWAYS-PASSES test
   key — it renders a real, working widget on any domain with no account needed.
   For production: replace with the owner's real site key (challenges.cloudflare.com)
   AND verify the token server-side at /siteverify. */
export const TURNSTILE_SITE_KEY = '1x00000000000000000000AA';

/* Stripe publishable TEST key (pk_test_…). Leave blank to use the built-in
   simulated card field. Paste the owner's test key to activate real Stripe
   Elements. Taking actual payments still needs a backend PaymentIntent. */
export const STRIPE_PUBLISHABLE_KEY = '';

/* Simulated Stripe test cards (we have no backend; this mirrors Stripe's test-mode behaviour). */
export const TEST_CARDS = {
  '4242424242424242': { ok: true },
  '4000000000000002': { ok: false, error: 'Your card was declined.' },
  '4000000000009995': { ok: false, error: 'Insufficient funds.' },
};

export const pounds = (n) => '£' + Math.round(n);
