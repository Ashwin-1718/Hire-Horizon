import React, { useState } from "react";

const Intern = () => {
  const [showApplication, setShowApplication] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const jobs = [
    { 
      id: 1, 
      company: "Google", 
      location: "UK", 
      title: "Project Manager", 
      desc: "Manage project timelines and budgets to ensure successful delivery of projects on schedule, while maintaining clear communication with stakeholders.", 
      positions: 2, 
      salary: "$95,000/Year", 
      logo: "assets/google.png" 
    },
    { 
      id: 2, 
      company: "Amazon", 
      location: "INDIA", 
      title: "Front-end Developer", 
      desc: "Design and implement user interfaces using HTML, CSS, and JavaScript, collaborating closely with designers and back-end developers.", 
      positions: 20, 
      salary: "$1,01,000/Year", 
      logo: "assets/amazon.png" 
    },

    { 
      id: 3, 
      company: "Microsoft", 
      location: "INDIA", 
      title: "Mern Stack Developer", 
      desc: "Develop scalable and efficient backend systems and applications using Python, utilizing your proficiency in Python programming and software development.", 
      positions: 9, 
      salary: "$80,000/Year", 
      logo: "assets/microsoft.png" 
    },
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
    <section className="section__container job__container" id="job">
      <h2 className="section__header">
        <span>Latest & Top</span> Internships Openings
      </h2>
      <p className="section__description">
        Discover Exciting New Opportunities and High-Demand Positions Available Now in Top Industries and Companies
      </p>

      <div className="job__grid">
        {jobs.map((job) => (
          <div key={job.id} className="job__card">
            <div className="job__card__header">
              <img src={job.logo} alt={`${job.company} logo`} />
              <div>
                <h5>{job.company}</h5>
                <h6>{job.location}</h6>
              </div>
            </div>
            <h4>{job.title}</h4>
            <p>{job.desc}</p>
            <div className="job__card__footer">
              <span>{job.positions} Positions</span>
              <span>Full Time</span>
              <span>{job.salary}</span>
            </div>
            <button className="btn apply-btn" onClick={() => handleApply(job)}>
              Apply Now
            </button>
          </div>
        ))}
      </div>

      {showApplication && selectedJob && (
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
              <button type="submit" className="btn submit-btn">
                Submit Application
              </button>
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

export default Intern;