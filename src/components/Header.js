import React from "react";

const Header = () => {
  return (
    <>
    
      <header className="section__container header__container" id="home">
        <img src="/assets/google.png" alt="Google" />
        <img src="/assets/twitter.png" alt="Twitter" />
        <img src="/assets/amazon.png" alt="Amazon" />
        <img src="/assets/figma.png" alt="Figma" />
        <img src="/assets/linkedin.png" alt="LinkedIn" />
        <img src="/assets/microsoft.png" alt="Microsoft" />
        <img src="/assets/Instagram.png" alt="Instagram" />
        <img src="/assets/YouTube.jpg" alt="YouTube" />

        <h2>
          <img src="/assets/JB.jpg" alt="JB" />
          NextGenJobs || HireAnywhere <br />
          CareerPulse Pro👌
        </h2>
        <h1>Search, Apply &<br />Get Your <span>Dream Job</span></h1>
        <p>
          Your future starts here. Discover countless opportunities, take action
          by applying to jobs that match your skills and aspirations, and
          transform your career.
        </p>
        <div className="header__btns">
          <button className="btn">Browse Jobs</button>
          <a href="#">
            <span><i className="ri-play-fill"></i></span>
            How It Works?
          </a>
        </div>
      </header>
      
      {/* <audio autoPlay loop>
        <source src="/assets/LONOWN - AVANGARD (Slowed  Reverb).mp3"/>
      </audio> */}

    </>
  );
};

export default Header;