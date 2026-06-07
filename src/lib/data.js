/* data.js — domain data, slots, contact + shared booking store */

export const ROUTES = ['home', 'browse', 'venue', 'booking', 'dashboard', 'pricing', 'leagues', 'about', 'login', 'getagame', 'juniors', 'parties', 'academy', 'clubs', 'events', 'manvfat', 'kingsclub'];

export const HERO_VIDEO = '/hero.mp4';
export const HERO_POSTER = '/hero-poster.jpg';   // still frame shown while the video loads
export const GETAGAME_VIDEO = '/getagame.mp4';   // background for the Get a Game hero

export const PITCHES = [
  { id:'classic', name:'Classic 5-a-side', price:60, unit:'/hr', size:'5v5', goals:'12ft × 4ft goals', tag:'Most booked', desc:'Rebound boards · 4G surface', spec:['Rebound boards','12ft × 4ft goals','4G rubber-crumb'] },
  { id:'samba',   name:'Samba 5-a-side',   price:60, unit:'/hr', size:'5v5', goals:'12ft × 6ft goals', tag:'', desc:'Bigger goals · rebound boards', spec:['Rebound boards','12ft × 6ft goals','4G rubber-crumb'] },
  { id:'big',     name:'The Big One',      price:90, unit:'/hr', size:'9v9', goals:'9v9 goals', tag:'9v9', desc:'Convertible · FA configurable', spec:['9v9 goals','Convertible layout','LED floodlights'] },
  { id:'mini',    name:'Mini Soccer',      price:90, unit:'/hr', size:'7v7', goals:'12ft × 6ft goals', tag:'FA approved', desc:'For juniors · FA approved', spec:['FA approved','12ft × 6ft goals','Junior friendly'] },
];

export const SLOTS = ['17:00','17:30','18:00','18:30','19:00','19:30','20:00','20:30','21:00','21:30'];
export const TAKEN = new Set(['18:00','19:30','20:30']);

export const CONTACT = {
  phone:'0115 888 0442',
  email:'play@astro-kings.com',
  addr:'Wigman Rd, Nottingham NG8 4PB',
  strap:"Nottingham's best 5-a-side football centre",
};

/* lightweight cross-page handoff (which pitch/slot the user picked) */
export const store = { venue:'classic', day:'Fri', date:'06 Jun', time:'19:00', players:'5v5' };
