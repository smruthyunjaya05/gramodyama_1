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
    return (
      <div className="resources-content">
        <section className="schemes-section">
          <h3>ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು</h3>
          <div className="schemes-grid">
            <div className="scheme-card">
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
  
        <section className="ideas-section">
          <h3>ಕಲ್ಪನೆಗಳು ಮತ್ತು ಹೂಡಿಕೆ</h3>
          <div className="share-section">
            <button className="share-button">
              ನಿಮ್ಮ ಕಲ್ಪನೆಯನ್ನು ಹಂಚಿಕೊಳ್ಳಿ
            </button>
          </div>
          <div className="action-buttons">
            <div className="action-row">
              <Star className="icon" />
              <VideoCall className="icon" />
            </div>
            <button className="post-button">
              ಹೊಸ ನೋಡಿ
            </button>
          </div>
        </section>
  
        <section className="success-section">
          <h3>ಯಶೋಗಾಥೆಗಳು</h3>
          <div className="success-grid">
            <div className="success-card">
              <TrendingUp />
              <p>ಬೆಳವಣಿಗೆ ವಿಶ್ಲೇಷಣೆ</p>
            </div>
            <div className="success-card">
              <Person />
              <p>ಸಮುದಾಯ ಪ್ರತಿಕ್ರಿಯೆ</p>
            </div>
          </div>
        </section>
      </div>
    );
  };
  
  export default Resources;