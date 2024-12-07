import React from "react";
import '../styles/profile.css';

const ProfilePage = () => {
  return (
    <div className="container">
      {/* Sidebar */}
      <aside className="sidebar">
        <ul>
          <li className="sidebar-item active">ಡ್ಯಾಶ್‌ಬೋರ್ಡ್</li>
          <li className="sidebar-item">ಪ್ರಮಾಣಪತ್ರಗಳು</li>
          <li className="sidebar-item">ಸಹಾಯ ಮತ್ತು ಬೆಂಬಲ</li>
        </ul>
      </aside>

      {/* Left Content */}
      <section className="left-content">
        <header className="header">
          <img
            src="https://via.placeholder.com/100"
            alt="ಪ್ರೊಫೈಲ್"
            className="profile-image"
          />
          <div>
            <h1 className="profile-name">ಜಾನ್ ಡೋ</h1>
            <p className="profile-role">ಪ್ರಮಾಣೀಕೃತ ಹಣಕಾಸು ಶಿಕ್ಷಕ</p>
            <p className="profile-tagline">ಕೃಷಿ ಆಧಾರಿತ ಕಲಿಕೆಗೆ ಹಿತೈಷಿ</p>
          </div>
        </header>

        <section className="section">
          <h2>ಪ್ರೊಫೈಲ್ ಮಾಹಿತಿ</h2>
          <p>
            ಜಾನ್ ಡೋ ಕೃಷಿಕರಿಗೆ ಹಣಕಾಸು ವಿಷಯಗಳಲ್ಲಿ ನೆರವಾಗುವ ಅನುಭವೀ ಹಣಕಾಸು ಶಿಕ್ಷಕ. 
            ಅವರು ಶಾಶ್ವತ ಕೃಷಿ ವಿಧಾನಗಳು ಮತ್ತು ಹಣಕಾಸು ಯೋಜನೆ ಕುರಿತು ಕಾರ್ಯಾಗಾರಗಳು ಮತ್ತು 
            ವೆಬಿನಾರ್‌ಗಳನ್ನು ನಡೆಸಿದ್ದಾರೆ.
          </p>
        </section>

        <section className="section">
          <h2>ಪ್ರಮಾಣಪತ್ರಗಳು</h2>
          <ul>
            <li>ಕೃಷಿಗೆ ಹಣಕಾಸು ವಿಶ್ಲೇಷಕ ಪ್ರಮಾಣಪತ್ರ</li>
            <li>ಶಾಶ್ವತ ಕೃಷಿ ವಿಧಾನಗಳ ಪ್ರಮಾಣಪತ್ರ</li>
            <li>ಹೂಡಿಕೆ ಮತ್ತು ಹಣಕಾಸು ಯೋಜನೆ</li>
          </ul>
        </section>

        <section className="section">
          <h2>ಮುನ್ಸೂಚಿತ ನಿಯೋಜನೆಗಳು</h2>
          <div className="appointment">
            <p>ಹಣಕಾಸು ಯೋಜನೆ ಕಾರ್ಯಾಗಾರ</p>
            <p>10 ಡಿಸೆಂಬರ್, 2024</p>
          </div>
          <div className="appointment">
            <p>ಬೆಳೆ ವಿಮೆ ಸೆಮಿನಾರ್</p>
            <p>15 ಡಿಸೆಂಬರ್, 2024</p>
          </div>
        </section>
      </section>
    </div>
  );
};

export default ProfilePage;
