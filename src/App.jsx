import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import ProfileDetail from './components/ProfileDetail';
import Register from './components/Register';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage />

          }
        />
        <Route
          path="/login"
          element={
            <HomePage />

          }
        />
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/profile"
          element={
            <Layout>
              <ProfileDetail />
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Register />

          }
        />
      </Routes>
    </Router>
  );
};

export default App;
