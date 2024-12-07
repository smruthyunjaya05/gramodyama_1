import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Header from './Header'; // Import the Header component

const Layout = () => {
  return (
    <div className="app-container">
      <Header /> {/* Add the Header component here */}
      <main className="main-content">
        <Outlet /> {/* Render page-specific content */}
      </main>
      <Navbar /> {/* Navbar remains at the bottom */}
    </div>
  );
};

export default Layout;
