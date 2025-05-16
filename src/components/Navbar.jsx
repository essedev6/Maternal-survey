import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import '../styles/NavBar.css';

const Navbar = () => {
  const { currentUser, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          MaternalHealth
        </Link>
        
        <div className="navbar-links">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
          <NavLink to="/survey" className="nav-link">
            Survey
          </NavLink>
          
          {currentUser ? (
            <>
              <NavLink to="/dashboard" className="nav-link">
                Dashboard
              </NavLink>
              <button onClick={logout} className="logout-button">
                Logout
              </button>
            </>
          ) : (
            <NavLink to="/login" className="nav-link">
              Admin Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;