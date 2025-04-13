import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Steps from './components/Steps';
import Intern from './components/Intern';
import Latest from './components/Latest';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import JobApplication from './components/JobApplication';
// import ApplicationDetails from './components/ApplicationDetails';
import AdminDashboard from './components/AdminDashboard';
import './App.css';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main>
            <Routes>
              <Routeq
                path="/"
                element={
                  <>
                    <Header />
                    <Steps />
                    <Intern />
                    <Latest />
                  </>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={<Dashboard />} />
              {/* <Route path="/application/:id" element={<ApplicationDetails />} /> */}
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;