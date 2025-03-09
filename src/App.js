import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Steps from './components/Steps';
import VideoSection from './components/VideoSection';
import JobListings from './components/JobListings';
import JobApplication from './components/JobApplication';
import Footer from './components/Footer';
import Latest from './components/Latest';
import './App.css';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');

  console.log("App.js - Current searchTerm:", searchTerm); // Debug: Check searchTerm

  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={
              <>
                <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <Steps />
                {/* <VideoSection /> */}
                <JobListings searchTerm={searchTerm} />
                <Latest searchTerm={searchTerm} />
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