import React, { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const JobApplication = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext); // Access user from AuthContext
  const [loading, setLoading] = useState(false); // Add loading state
  const job = location.state?.job || { title: "Selected Job", company: "Unknown", location: "Unknown" };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please login to apply for jobs');
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/applications', {
        jobId: job.id,
        jobTitle: job.title,
        company: job.company,
      });
      alert(`Application submitted for ${job.title} at ${job.company}!`);
      navigate("/");
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to submit application';
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section__container application__section">
      <h2 className="section__header">Apply for {job.title}</h2>
      <form className="application__form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input type="text" id="name" name="name" required className="form-input" disabled={loading} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required className="form-input" disabled={loading} />
        </div>
        <div className="form-group">
          <label htmlFor="resume">Upload Resume</label>
          <input type="file" id="resume" name="resume" accept=".pdf,.doc,.docx" className="form-input" disabled={loading} />
        </div>
        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Application'}
        </button>
        <button type="button" className="btn back-btn" onClick={() => navigate("/")} disabled={loading}>
          Back to Jobs
        </button>
      </form>
    </section>
  );
};

export default JobApplication;