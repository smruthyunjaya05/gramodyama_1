import React from 'react';
import '../styles/header.css';
import headerLogo from '../assets/logo.png'; // Adjust path if needed
import bannerImage from '../assets/gramodyama.jpg'; // Add the banner image

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <img src={bannerImage} alt="Banner" className="header-banner" />
        <img src={headerLogo} alt="Header Logo" className="header-logo" />
      </div>
    </header>
  );
};

export default Header;
