import React from "react";

const Navbar = () => {
  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Job-Hunt</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#home">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#about">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#jobs">Jobs</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#services">Services</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#client">Client</a>
              </li>
            </ul>
            <button className="btn btn-outline-success" type="submit">
              Register
            </button>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="bootstrap">
        <h1 className="text-center p-3 bg-light fw-bold">
          Welcome to AK-Job-Hunt! Your Dream Job Awaits 🚀
        </h1>
        <div className="nav-left">
          <a href="/">
            <img src="assets/AK1.png" width="120px" alt="Logo" />
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
