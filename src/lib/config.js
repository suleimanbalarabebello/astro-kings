/* config.js — booking rules in one place so they're trivial to change */

export const DEPOSIT_PERCENT   = 0.20;   // deposit = 20% of total, DEDUCTED from it (not added on top)
export const HOLD_MINUTES      = 15;     // a pending reservation holds the slot(s) this long
export const CANCEL_WINDOW_HRS = 24;     // >24h before start → refund as credit; inside → forfeit
export const NO_SHOW_LIMIT     = 2;      // future "require full prepayment" threshold — DEFINED, NOT ENFORCED yet
export const MAX_HOURS         = 3;      // longest bookable run (consecutive 1h slots)

export const STUDENT_DOMAIN_RE = /\.ac\.uk$/i;  // student status derived from email domain

/* Simulated Stripe test cards (we have no backend; this mirrors Stripe's test-mode behaviour). */
export const TEST_CARDS = {
  '4242424242424242': { ok: true },
  '4000000000000002': { ok: false, error: 'Your card was declined.' },
  '4000000000009995': { ok: false, error: 'Insufficient funds.' },
};

export const pounds = (n) => '£' + Math.round(n);
