import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Steps from './components/Steps';
import VideoSection from './components/VideoSection';
import JobListings from './components/JobListings';
import JobApplication from './components/JobApplication'; 
import Footer from './components/Footer';
import './App.css';

export default function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={
              <>
                <Header />
                <Steps />
                <VideoSection />
                <JobListings />
              </>
            } />
            <Route path="/apply" element={<JobApplication />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}