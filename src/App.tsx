import { NavLink, Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import Explore from './pages/Explore'
import Merchant from './pages/Merchant'
import Research from './pages/Research'

function Logo() {
  return (
    <span className="logo" aria-label="LineStatus">
      <span className="logo__dots">
        <i className="d d--good" />
        <i className="d d--warn" />
        <i className="d d--bad" />
      </span>
      <span className="logo__word">
        Line<span>Status</span>
      </span>
    </span>
  )
}

export default function App() {
  return (
    <div className="app">
      <header className="topbar">
        <NavLink to="/" className="topbar__brand">
          <Logo />
        </NavLink>
        <nav className="topbar__nav">
          <NavLink to="/" end className="topbar__link">
            Overview
          </NavLink>
          <NavLink to="/explore" className="topbar__link">
            Live map
          </NavLink>
          <NavLink to="/merchant" className="topbar__link">
            Merchant
          </NavLink>
          <NavLink to="/research" className="topbar__link">
            Research
          </NavLink>
        </nav>
        <div className="topbar__cta">
          <NavLink to="/explore" className="btn btn--sm btn--ghost">
            See the line
          </NavLink>
          <NavLink to="/merchant" className="btn btn--sm btn--primary">
            Merchant console
          </NavLink>
        </div>
      </header>

      <main className="app__main">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/merchant" element={<Merchant />} />
          <Route path="/research" element={<Research />} />
          <Route path="*" element={<Landing />} />
        </Routes>
      </main>

      <footer className="footer">
        <div className="footer__inner">
          <Logo />
          <p className="footer__tag">
            The live status layer for real places. Wait bands, crowd levels, and confidence —
            without exposing personal data.
          </p>
          <div className="footer__links">
            <NavLink to="/explore">Live map</NavLink>
            <NavLink to="/merchant">Merchant console</NavLink>
            <NavLink to="/research">Research & competition</NavLink>
          </div>
          <p className="footer__fine">
            Prototype · seeded demo data for the fictional “Riverside” metro. No backend, no
            tracking. © 2026 LineStatus.
          </p>
        </div>
      </footer>
    </div>
  )
}
