import { useNavigate } from 'react-router-dom';
import { 
    Agriculture,
    Store,
    Apartment,
    Star,
    VideoCall,
    TrendingUp,
    Person
} from '@mui/icons-material';

const Resources = () => {
  const navigate = useNavigate();

  const handleViewIdeas = () => {
    navigate('/ideas');
  };

  return (
    <div className="resources-content">
      <section className="schemes-section">
        <h3>ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು</h3>
        <div className="schemes-grid">
          <div 
            className="scheme-card"
            onClick={() => navigate('/schemes')}
            style={{ cursor: 'pointer' }}
          >
            <Agriculture />
            <div>
              <p>ಹೊಸ ಯೋಜನೆಗಳು</p>
              <p>ಅರ್ಜಿ ಸಲ್ಲಿಸಿ</p>
            </div>
          </div>
          <div className="scheme-card">
            <Store />
            <div>
              <p>ಮಾರ್ಗದರ್ಶಿ</p>
              <p>ಪರಿಶೀಲನೆ ಮುದ</p>
            </div>
          </div>
        </div>
      </section>
        <section className="schemes-section">
          <h3>ಕಲ್ಪನೆಗಳು ಮತ್ತು ಹೂಡಿಕೆ</h3>
          <div className="schemes-grid">
            <div 
              className="scheme-card"
              onClick={() => navigate('/ideas/create')}
              style={{ cursor: 'pointer' }}
            >
              <Star />
              <div>
                <p>ನಿಮ್ಮ ಕಲ್ಪನೆಯನ್ನು ಹಂಚಿಕೊಳ್ಳಿ</p>
              </div>
            </div>
            <div 
              className="scheme-card"
              onClick={handleViewIdeas}
              style={{ cursor: 'pointer' }}
            >
              <VideoCall />
              <div>
                <p>ಹೊಸ ನೋಡಿ</p>
              </div>
            </div>
          </div>
        </section>
      <section className="schemes-section">
        <h3>ಯಶೋಗಾಥೆಗಳು</h3>
        <div className="schemes-grid">
          <div className="scheme-card">
            <TrendingUp />
            <div>
              <p>ಬೆಳವಣಿಗೆ ವಿಶ್ಲೇಷಣೆ</p>
            </div>
          </div>
          <div className="scheme-card">
            <Person />
            <div>
              <p>ಸಮುದಾಯ ಪ್ರತಿಕ್ರಿಯೆ</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Resources;
import './Resources.css'