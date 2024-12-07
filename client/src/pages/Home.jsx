import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import SkillsDevelopment from '../components/home/SkillsDevelopment';
import Resources from '../components/home/Resources';
import { NotificationsNone } from '@mui/icons-material';
import '../styles/Home.css';

const Home = () => {
  const [activeSegment, setActiveSegment] = useState('skills');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = () => {
    // Navigate to the profile section when Login is clicked
    navigate('/profile');
  };

  return (
    <div className="home-container">
      <header className="header">
        <div className="header-segments">
          <div
            className={`segment ${activeSegment === 'skills' ? 'active' : ''}`}
            onClick={() => setActiveSegment('skills')}
          >
            <h2>ಕೌಶಲ್ಯ ಅಭಿವೃದ್ಧಿ</h2>
          </div>
          <div
            className={`segment ${activeSegment === 'resources' ? 'active' : ''}`}
            onClick={() => setActiveSegment('resources')}
          >
            <h2>ಸಂಪನ್ಮೂಲಗಳು</h2>
          </div>
        </div>
        <div className="header-right">
          <NotificationsNone />
          <button className="login-button" onClick={handleLogin}>
            Login
          </button>
        </div>
      </header>

      {activeSegment === 'skills' ? <SkillsDevelopment /> : <Resources />}
    </div>
  );
};

export default Home;
