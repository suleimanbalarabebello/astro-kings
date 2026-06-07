/* StripeCard.jsx — real Stripe Elements card field (test mode).

   Active only when STRIPE_PUBLISHABLE_KEY is set in config.js; otherwise the
   booking flow falls back to its built-in simulated card inputs. Charging real
   money still requires a backend PaymentIntent — here the card field is real
   Stripe UI/validation and the charge itself is simulated. */

import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useElements } from '@stripe/react-stripe-js';
import { STRIPE_PUBLISHABLE_KEY } from '../lib/config.js';

export const stripeEnabled = !!STRIPE_PUBLISHABLE_KEY;

const stripePromise = stripeEnabled ? loadStripe(STRIPE_PUBLISHABLE_KEY) : null;

const CARD_STYLE = {
  style: {
    base: {
      color: '#fff', fontSize: '14px', fontFamily: 'inherit',
      '::placeholder': { color: 'rgba(255,255,255,0.35)' },
      iconColor: 'rgba(255,255,255,0.55)',
    },
    invalid: { color: '#fca5a5', iconColor: '#fca5a5' },
  },
};

function Inner({ onChange }){
  useElements();
  return (
    <div className="glass glass-soft rounded-2xl px-4 py-3.5">
      <CardElement options={CARD_STYLE} onChange={(e) => onChange && onChange(e.complete, e.error?.message)} />
    </div>
  );
}

export function StripeCard({ onChange }){
  if (!stripeEnabled) return null;
  return (
    <Elements stripe={stripePromise}>
      <Inner onChange={onChange} />
    </Elements>
  );
}
