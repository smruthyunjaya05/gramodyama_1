import React, { useState } from 'react';
import './Profile.css';  // Import the CSS file

const Profile = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Predefined username and password
  const predefinedUsername = 'abc';
  const predefinedPassword = 'abc';

  // User details
  const userDetails = {
    username: 'user123',
    fullName: 'John Doe',
    email: 'johndoe@example.com',
    phone: '+1234567890',
    address: '123 Main St, Anytown, USA',
    investments: '$5000',
    coursesCompleted: 5,
    totalSpent: '$1000',
    membershipStatus: 'Premium',
    lastLogin: '2024-12-01',
  };

  // Handle login logic
  const handleLogin = () => {
    if (username === predefinedUsername && password === predefinedPassword) {
      setIsLoggedIn(true);
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <div className="profile-container">
      <div className="wrapper">
        {!isLoggedIn ? (
          <div className="login_box">
            <div className="login-header">
              <span>Login</span>
            </div>

            <div className="input_box">
              <input
                type="text"
                id="user"
                className="input-field"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label htmlFor="user" className="label">Username</label>
              <i className="bx bx-user icon"></i>
            </div>

            <div className="input_box">
              <input
                type="password"
                id="pass"
                className="input-field"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor="pass" className="label">Password</label>
              <i className="bx bx-lock-alt icon"></i>
            </div>

            <div className="remember-forgot">
              <div className="remember-me">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Remember me</label>
              </div>

              <div className="forgot">
                <a href="#">Forgot password?</a>
              </div>
            </div>

            <div className="input_box">
              <input
                type="submit"
                className="input-submit"
                value="Login"
                onClick={handleLogin}
              />
            </div>

            <div className="register">
              <span>Don't have an account? <a href="#">Register</a></span>
            </div>
          </div>
        ) : (
          // Show user details after login
          <div className="user-details-box">
            <h2>Welcome, {userDetails.fullName}!</h2>
            <div className="user-details">
              <p><strong>Username:</strong> {userDetails.username}</p>
              <p><strong>Email:</strong> {userDetails.email}</p>
              <p><strong>Phone:</strong> {userDetails.phone}</p>
              <p><strong>Address:</strong> {userDetails.address}</p>
              <p><strong>Investments:</strong> {userDetails.investments}</p>
              <p><strong>Courses Completed:</strong> {userDetails.coursesCompleted}</p>
              <p><strong>Total Spent:</strong> {userDetails.totalSpent}</p>
              <p><strong>Membership Status:</strong> {userDetails.membershipStatus}</p>
              <p><strong>Last Login:</strong> {userDetails.lastLogin}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
