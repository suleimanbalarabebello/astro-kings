/* data.js — domain data, slots, contact + shared booking store */

export const ROUTES = ['home', 'browse', 'venue', 'booking', 'dashboard', 'pricing', 'leagues', 'about', 'login', 'getagame', 'juniors', 'payandplay', 'skills', 'parties', 'academy', 'clubs', 'events', 'manvfat', 'kingsclub'];

export const HERO_VIDEO = '/hero.mp4';
export const HERO_POSTER = '/hero-poster.jpg';   // still frame shown while the video loads
export const PITCH_PHOTO = '/pitch.jpg';         // floodlit pitches photo used on Browse pitch cards
export const GETAGAME_VIDEO = '/getagame.mp4';   // background for the Get a Game hero
export const KINGSCLUB_VIDEO = '/kingsclub.mp4'; // background for the Kings Club hero
export const JUNIORS_VIDEO = '/juniors.mp4';     // background for the Juniors (pay & play) hero
export const ACADEMY_VIDEO = '/academy.mp4';     // background for the Academy (coaching & camps) hero

export const PITCHES = [
  { id:'classic', name:'Classic 5-a-side', price:60, unit:'/hr', size:'5v5', goals:'12ft × 4ft goals', tag:'Most booked', desc:'Rebound boards · 4G surface', spec:['Rebound boards','12ft × 4ft goals','4G rubber-crumb'] },
  { id:'samba',   name:'Samba 5-a-side',   price:60, unit:'/hr', size:'5v5', goals:'12ft × 6ft goals', tag:'', desc:'Bigger goals · rebound boards', spec:['Rebound boards','12ft × 6ft goals','4G rubber-crumb'] },
  { id:'big',     name:'The Big One',      price:90, unit:'/hr', size:'9v9', goals:'9v9 goals', tag:'9v9', desc:'Convertible · FA configurable', spec:['9v9 goals','Convertible layout','LED floodlights'] },
  { id:'mini',    name:'Mini Soccer',      price:90, unit:'/hr', size:'7v7', goals:'12ft × 6ft goals', tag:'FA approved', desc:'For juniors · FA approved', spec:['FA approved','12ft × 6ft goals','Junior friendly'] },
];

/* full operating day, 30-min slots from 08:00 to 21:30 (venue closes 22:00) */
export const SLOTS = (() => {
  const out = [];
  for (let h = 8; h < 22; h++) out.push(`${String(h).padStart(2,'0')}:00`, `${String(h).padStart(2,'0')}:30`);
  return out;
})();

export const TIME_BANDS = {
  morning:   { label:'08–12', from:8,  to:12 },
  afternoon: { label:'12–17', from:12, to:17 },
  evening:   { label:'17–22', from:17, to:22 },
};
export const slotsInBand = (band) => {
  const b = TIME_BANDS[band]; if (!b) return SLOTS;
  return SLOTS.filter((s) => { const h = +s.split(':')[0]; return h >= b.from && h < b.to; });
};

export const CONTACT = {
  phone:'0115 888 0442',
  email:'play@astro-kings.com',
  addr:'Wigman Rd, Nottingham NG8 4PB',
  strap:"Nottingham's best 5-a-side football centre",
};

/* lightweight cross-page handoff (which pitch/slot the user picked) */
export const store = { venue:'classic', day:'', time:'19:00', players:'5v5' };
