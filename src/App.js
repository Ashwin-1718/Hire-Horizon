import React from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Steps from './components/Steps';
import Footer from './components/Footer';
import './App.css';
// import './utils.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Header />
      <Steps />
      <Footer />
    </div>
  );
}

export default App;