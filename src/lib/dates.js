/* dates.js — date helpers. Availability is keyed by an ISO day-key ('YYYY-MM-DD')
   so the calendar can span months/years without collisions. */

export const WD = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
export const MO = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const pad = (n) => String(n).padStart(2, '0');

export const toKey   = (d) => `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
export const fromKey = (k) => { const [y,m,dd] = k.split('-').map(Number); return new Date(y, m-1, dd); };

export const startOfToday = () => { const d = new Date(); d.setHours(0,0,0,0); return d; };
export const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate()+n); return x; };
export const isSameDay = (a, b) => toKey(a) === toKey(b);

export const label      = (d) => `${WD[d.getDay()]} ${d.getDate()} ${MO[d.getMonth()]}`;  // 'Mon 9 Jun'
export const shortLabel = (d) => `${WD[d.getDay()]} ${pad(d.getDate())}`;                  // 'Mon 09'
export const monthLabel = (d) => `${MO[d.getMonth()]} ${d.getFullYear()}`;                 // 'Jun 2026'
export const keyLabel   = (k) => label(fromKey(k));                                        // from an ISO key
export const todayKey   = () => toKey(startOfToday());

/* map a short label ('Today','Fri','Sat'…) to the next matching ISO day-key */
export const nextByLabel = (lbl) => {
  if (lbl === 'Today') return todayKey();
  const idx = WD.indexOf(lbl);
  if (idx < 0) return todayKey();
  const t = startOfToday();
  for (let i = 0; i < 7; i++) { const d = addDays(t, i); if (d.getDay() === idx) return toKey(d); }
  return todayKey();
};
