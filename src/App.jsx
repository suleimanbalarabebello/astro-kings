/* App.jsx — stadium-night stage, hash router + page switch */

import { useRoute } from './lib/router.js';
import { TopNav } from './components/Nav.jsx';
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
};

export default function App(){
  const { name, params } = useRoute();
  const render = PAGES[name] || PAGES.home;
  const showChrome = name !== 'login';

  return (
    <div className="ak-stage">
      <div className="ak-grain"></div>
      {showChrome ? <TopNav /> : null}
      <main key={name}>{render(params)}</main>
    </div>
  );
}
