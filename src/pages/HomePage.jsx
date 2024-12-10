import React, { useState } from 'react';
import Login from '../components/Login';

const HomePage = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <div>
      {!loggedIn ? <Login onLogin={handleLogin} /> : <p>You are logged in</p>}
    </div>
  );
};

export default HomePage;
