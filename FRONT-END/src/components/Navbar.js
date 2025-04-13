import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
// import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Job-Hunt
          </Link>
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
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/#about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/#jobs">
                  Jobs
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/#services">
                  Services
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/#client">
                  Client
                </Link>
              </li>
            </ul>

            <form className="d-flex me-3" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search jobs..."
                aria-label="Search"
              />
            </form>

            <div className="nav-auth">
              {user ? (
                <>
                  <Link to="/dashboard" className="btn btn-outline-primary me-2">
                    Dashboard
                  </Link>
                  {user.role === 'admin' && (
                    <Link to="/admin" className="btn btn-outline-danger me-2">
                      Admin
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="btn btn-outline-danger"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn btn-outline-primary me-2">
                    Login
                  </Link>
                  <Link to="/signup" className="btn btn-outline-primary">
                    Signup
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="bootstrap">
        <h1 className="text-center p-3 bg-light fw-bold">
          Welcome to AK-Job-Hunt! Your Dream Job Awaits 🚀
        </h1>
        <div className="nav-left">
          <Link to="/">
            <img src="assets/AK1.png" width="120px" alt="Logo" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;