import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Routes, Route } from 'react-router-dom';
import Callback from './Callback';

const App = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <div className="App">
      <Routes>
        <Route path="/callback" element={<Callback />} />
        <Route
          path="/"
          element={
            !isAuthenticated ? (
              <button onClick={() => loginWithRedirect()}>Log In / Sign Up</button>
            ) : (
              <div>
                <h1>Welcome to the main page!</h1>
                <button onClick={() => logout({ returnTo: window.location.origin })}>Log Out</button>
              </div>
            )
          }
        />
      </Routes>
    </div>
  );
};

export default App;
