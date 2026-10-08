import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import logo from '../../../docs/octofitapp-small.png';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Teams from './components/Teams.jsx';
import Users from './components/Users.jsx';
import Workouts from './components/Workouts.jsx';

const navigation = [
  ['Activities', '/activities'],
  ['Leaderboard', '/leaderboard'],
  ['Teams', '/teams'],
  ['Members', '/users'],
  ['Workouts', '/workouts'],
];

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="container-fluid app-header-inner">
          <NavLink className="brand-link" to="/activities" aria-label="OctoFit Tracker home">
            <img src={logo} alt="" className="brand-logo" />
            <span className="brand-name">OctoFit <strong>Tracker</strong></span>
          </NavLink>
          <nav className="nav app-navigation" aria-label="Main navigation">
            {navigation.map(([label, path]) => (
              <NavLink key={path} className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to={path}>
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="container app-main">
        <Routes>
          <Route path="/" element={<Navigate to="/activities" replace />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate to="/activities" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;