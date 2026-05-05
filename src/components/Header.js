import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header className="app-header">
      <div className="header-inner">
        <NavLink to="/" className="brand">
          Aniwatch
        </NavLink>

        <nav className="nav-links">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
          <NavLink to="/favorites" className="nav-link">
            Favorites
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
