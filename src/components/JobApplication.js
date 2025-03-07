import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const JobApplication = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const job = location.state?.job || { title: "Selected Job", company: "Unknown", location: "Unknown" };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Application submitted for:", job.title);
    // Add form submission logic (e.g., API call) here
    alert(`Application submitted for ${job.title} at ${job.company}!`);
    navigate("/");
  };

  return (
    <section className="section__container application__section">
      <h2 className="section__header">Apply for {job.title}</h2>
      <form className="application__form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input type="text" id="name" name="name" required className="form-input" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required className="form-input" />
        </div>
        <div className="form-group">
          <label htmlFor="resume">Upload Resume</label>
          <input type="file" id="resume" name="resume" accept=".pdf,.doc,.docx" className="form-input" />
        </div>
        <button type="submit" className="btn">Submit Application</button>
        <button type="button" className="btn back-btn" onClick={() => navigate("/")}>
          Back to Jobs
        </button>
      </form>
    </section>
  );
};

export default JobApplication;