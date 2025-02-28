import React, { useState } from "react";

const JobListings = () => {
  const [flipped, setFlipped] = useState(null);
  const [showApplication, setShowApplication] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const jobs = [
    { title: "React Developer", company: "Google", location: "Remote", desc: "Build cutting-edge web apps." },
    { title: "UI Designer", company: "Figma", location: "San Francisco", desc: "Design intuitive interfaces." },
    { title: "Backend Engineer", company: "Amazon", location: "Seattle", desc: "Optimize server performance." },
  ];

  const handleApply = (job) => {
    setSelectedJob(job);
    setShowApplication(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Application submitted for:", selectedJob.title);
    alert(`Application submitted for ${selectedJob.title} at ${selectedJob.company}!`);
    setShowApplication(false);
  };

  return (
    <section className="section__container1 job__section" id="jobs">
      <h2 className="section__header">Latest Job Openings</h2>
      <div className="job__grid">
        {jobs.map((job, index) => (
          <div
            key={index}
            className={`job__card ${flipped === index ? "flipped" : ""}`}
            onClick={() => setFlipped(flipped === index ? null : index)}
          >
            <div className="job__card-inner">
              <div className="job__card-front">
                <h3>{job.title}</h3>
                <p>{job.company} - {job.location}</p>
                <button className="btn" onClick={() => handleApply(job)}>
                  Apply Now
                </button>
              </div>
              <div className="job__card-back">
                <h3>{job.title}</h3>
                <p>{job.desc}</p>
                <button className="btn" onClick={() => handleApply(job)}>
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {showApplication && (
        <div className="modal">
          <div className="modal__content">
            <h3>Apply for {selectedJob.title}</h3>
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
              <button type="button" className="btn back-btn" onClick={() => setShowApplication(false)}>
                Back to Jobs
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default JobListings;