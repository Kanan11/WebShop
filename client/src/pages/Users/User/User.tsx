import React, { useState } from 'react';
import Login from '../Login/Login';
import './User.scss'

interface Users {
  username: string;
  password: string;
  name: string;
  email: string;
}

const User: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<Users | null>(JSON.parse(localStorage.getItem('loggedInUser') || 'null'));

  const handleLogin = (user: Users) => {
    setLoggedInUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser'); // remove logged-in user from localStorage
    setLoggedInUser(null);
  };

  return (
    <div>
      {loggedInUser ? (
        <div>
          <h1>Welcome, {loggedInUser.name}!</h1>
          <p>Email address: {loggedInUser.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <Login /* onLogin={handleLogin} */ />
      )}
    </div>
  );
};

export default User;
