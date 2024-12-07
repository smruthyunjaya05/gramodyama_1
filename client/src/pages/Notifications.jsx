import React from 'react';
import StockTrends from '../components/stock/StockTrends';

const Notifications = () => {
  return (
    <div className="notifications-container">
      <h2>💬 ಹೂಡಿಕೆ ಮುಂಚೂಣಿಯ ಮಾಹಿತಿಗಳು / ಷೇರು ಒತ್ತಡ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್</h2>
      <StockTrends />
    </div>
  );
};

export default Notifications;
