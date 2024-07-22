import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Callback from './components/Callback';
import Login from './components/Login';
import WebsiteBuilder from './components/WebsiteBuilder';
import './App.css';

const App = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={isAuthenticated ? 'authenticated' : 'unauthenticated'}>
      <Routes>
        <Route path="/callback" element={<Callback />} />
        <Route 
          path="/" 
          element={
            isAuthenticated ? 
              <Navigate to="/builder" replace /> : 
              <Login />
          } 
        />
        <Route 
          path="/builder" 
          element={
            isAuthenticated ? 
              <WebsiteBuilder /> : 
              <Navigate to="/" replace />
          } 
        />
      </Routes>
    </div>
  );
};

export default App;