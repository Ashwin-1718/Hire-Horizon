import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchApplications = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/applications');
        setApplications(res.data);
      } catch (err) {
        console.error('Failed to fetch applications', err);
      }
    };

    fetchApplications();
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleViewDetails = (appId) => {
    navigate(`/application/${appId}`);
  };

  return (
    <section className="dashboard__container">
      <h2 className="dashboard__header">Your Dashboard</h2>
      {user && (
        <div className="welcome__section">
          <p>Welcome, {user.name}!</p>
          <button className="logout__btn" onClick={handleLogout}>Logout</button>
        </div>
      )}
      <h3 className="applications__header">Your Applied Jobs</h3>
      {applications.length === 0 ? (
        <p className="no__applications">No applications yet.</p>
      ) : (
        <div className="applications__grid">
          {applications.map((app) => (
            <div key={app._id} className="application__card">
              <div className="application__header">
                {app.logo && (
                  <img
                    src={app.logo}
                    alt={`${app.company} logo`}
                    className="company__logo"
                    onError={(e) => (e.target.src = 'https://logo.clearbit.com/default.com')}
                  />
                )}
                <div className="application__info">
                  <h4>{app.jobTitle}</h4>
                  <p className="company__name">{app.company}</p>
                </div>
              </div>
              <div className="application__footer">
                <p className="application__date">
                  Applied on: {new Date(app.appliedAt).toLocaleDateString()}
                </p>
                <button
                  className="details__btn"
                  onClick={() => handleViewDetails(app._id)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Dashboard;