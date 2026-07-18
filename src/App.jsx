/* App.jsx — stadium-night stage, hash router + page switch */

import { useEffect } from 'react';
import { useRoute } from './lib/router.js';
import { TopNav, BookBar } from './components/Nav.jsx';
import { Home } from './pages/Home.jsx';
import { Browse } from './pages/Browse.jsx';
import { Venue } from './pages/Venue.jsx';
import { Booking } from './pages/Booking.jsx';
import { Dashboard } from './pages/Dashboard.jsx';
import { Pricing } from './pages/Pricing.jsx';
import { Leagues } from './pages/Leagues.jsx';
import { About } from './pages/About.jsx';
import { Auth } from './pages/Auth.jsx';
import { GetAGame } from './pages/GetAGame.jsx';
import { Juniors } from './pages/Juniors.jsx';
import { PayAndPlay } from './pages/PayAndPlay.jsx';
import { SkillsWin } from './pages/SkillsWin.jsx';
import { Parties } from './pages/Parties.jsx';
import { Academy } from './pages/Academy.jsx';
import { Clubs } from './pages/Clubs.jsx';
import { Events } from './pages/Events.jsx';
import { ManVFat } from './pages/ManVFat.jsx';
import { KingsClub } from './pages/KingsClub.jsx';
import { Coaching } from './pages/Coaching.jsx';
import { NottsOlympic } from './pages/NottsOlympic.jsx';
import { PerformanceZone } from './pages/PerformanceZone.jsx';
import { Shop } from './pages/Shop.jsx';
import { Contact } from './pages/Contact.jsx';

const PAGES = {
  home: () => <Home />,
  browse: () => <Browse />,
  venue: (params) => <Venue params={params} />,
  booking: (params) => <Booking params={params} />,
  dashboard: () => <Dashboard />,
  pricing: () => <Pricing />,
  leagues: () => <Leagues />,
  about: () => <About />,
  login: () => <Auth />,
  getagame: () => <GetAGame />,
  juniors: () => <Juniors />,
  payandplay: () => <PayAndPlay />,
  skills: () => <SkillsWin />,
  parties: () => <Parties />,
  academy: () => <Academy />,
  clubs: () => <Clubs />,
  events: () => <Events />,
  manvfat: () => <ManVFat />,
  kingsclub: () => <KingsClub />,
  coaching: () => <Coaching />,
  nottsolympic: () => <NottsOlympic />,
  performancezone: () => <PerformanceZone />,
  shop: () => <Shop />,
  contact: () => <Contact />,
};

export default function App(){
  const { name, params } = useRoute();
  const render = PAGES[name] || PAGES.home;
  const showChrome = name !== 'login';

  // start every page at the top (hash links don't reset scroll on their own)
  useEffect(() => { window.scrollTo(0, 0); }, [name, params]);

  // persistent mobile Book-a-Pitch bar — everywhere except the booking flow itself and login
  const showBookBar = showChrome && name !== 'booking';

  return (
    <div className="ak-stage">
      <div className="ak-grain"></div>
      {showChrome ? <TopNav /> : null}
      {/* bottom padding on mobile stops the sticky bar overlapping page content */}
      <main key={name} className={showBookBar ? 'pb-24 md:pb-0' : ''}>{render(params)}</main>
      {showBookBar ? <BookBar /> : null}
    </div>
  );
}
