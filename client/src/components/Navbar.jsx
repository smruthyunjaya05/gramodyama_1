import { NavLink } from 'react-router-dom';
import { Home, Description, Notifications, Person } from '@mui/icons-material';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/" end>
        <Home />
        <span>ಮುಖಪುಟ</span>
      </NavLink>
      
      <NavLink to="/notifications">
        <Notifications />
        <span>ಸೂಚನೆಗಳು</span>
      </NavLink>
      <NavLink to="/profile">
        <Person />
        <span>ಪ್ರೊಫೈಲ್</span>
      </NavLink>
    </nav>
  );
};

export default Navbar; 