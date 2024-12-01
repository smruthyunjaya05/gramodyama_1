import { useState } from 'react';
import SkillsDevelopment from '../components/home/SkillsDevelopment';
import Resources from '../components/home/Resources';
import { NotificationsNone } from '@mui/icons-material';
import '../styles/Home.css';

const Home = () => {
  const [activeSegment, setActiveSegment] = useState('skills');

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
        </div>
      </header>

      {activeSegment === 'skills' ? <SkillsDevelopment /> : <Resources />}
    </div>
  );
};

export default Home;