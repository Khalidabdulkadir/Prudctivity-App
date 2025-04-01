import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { useThemeContext } from '../context/ThemeContext';
import '../styles/Navbar.css';

const Navbar = ({ toggleSidebar }) => {
  const { isDarkMode, toggleTheme } = useThemeContext();

  return (
    <nav className="navbar">
      <div className="navbar-start">
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <h1>Student Productivity App</h1>
      </div>
      <div className="navbar-end">
        <button className="theme-toggle" onClick={toggleTheme}>
          <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
