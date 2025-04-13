import React, { useEffect } from "react";

const Header = ({ searchTerm, setSearchTerm }) => {
  const handleSearch = (e) => {
    if (e.key === 'Enter' || e.target.className === 'search__btn') {
      const value = e.target.value || searchTerm;
      console.log("Header.js - Search triggered with value:", value);
      setSearchTerm(value);

      // Wait for state to update, then scroll
      setTimeout(() => {
        const jobListingsSection = document.getElementById('jobs');
        if (jobListingsSection) {
          const offset = 60;
          const elementPosition = jobListingsSection.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: elementPosition - offset,
            behavior: 'smooth',
          });
        }
      }, 100);
    }
  };

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

      <section className="search__section">
        <div className="search__container">
          <input
            type="text"
            className="search__input"
            placeholder="Search jobs by title (e.g., React Developer, UI Designer)"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              console.log("Header.js - Input changed to:", e.target.value);
            }}
            onKeyPress={handleSearch}
          />
          <button className="search__btn" onClick={handleSearch}>
            Search
          </button>
        </div>
      </section>
    </>
  );
};

export default Header;