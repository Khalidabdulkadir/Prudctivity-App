import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faListCheck,
  faCalendarAlt,
  faNoteSticky,
  faClock,
  faBrain
} from '@fortawesome/free-solid-svg-icons';
import '../styles/Sidebar.css';

const Sidebar = ({ isOpen }) => {
  const navItems = [
    { path: '/tasks', icon: faListCheck, text: 'Tasks' },
    { path: '/calendar', icon: faCalendarAlt, text: 'Calendar' },
    { path: '/notes', icon: faNoteSticky, text: 'Notes' },
    { path: '/pomodoro', icon: faClock, text: 'Pomodoro' },
    { path: '/feynman', icon: faBrain, text: 'Feynman' }
  ];

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <nav className="nav-menu">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `nav-item ${isActive ? 'active' : ''}`
            }
          >
            <FontAwesomeIcon icon={item.icon} />
            <span>{item.text}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
