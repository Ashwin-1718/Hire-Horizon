import React, { useState, useMemo, useContext } from "react";
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
// import "./Latest.css";

const Latest = () => {
  const [showApplication, setShowApplication] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state
  const { user } = useContext(AuthContext);

  const jobs = [
    { 
      id: 1, 
      company: "Figma", 
      location: "USA", 
      title: "Senior Product Engineer", 
      desc: "Lead the development of innovative product solutions, leveraging your expertise in engineering and product management to drive success.", 
      positions: 12, 
      salary: "$1,45,000/Year", 
      logo: "assets/figma.png" 
    },
    { 
      id: 2, 
      company: "Google", 
      location: "UK", 
      title: "Project Manager", 
      desc: "Manage project timelines and budgets to ensure successful delivery of projects on schedule, while maintaining clear communication with stakeholders.", 
      positions: 2, 
      salary: "$95,000/Year", 
      logo: "assets/google.png" 
    },
    { 
      id: 3, 
      company: "LinkedIn", 
      location: "AHMEDABAD", 
      title: "Full Stack Developer", 
      desc: "Develop and maintain both front-end and back-end components of web applications, utilizing a wide range of programming languages and frameworks.", 
      positions: 10, 
      salary: "$35,000/Year", 
      logo: "assets/linkedin.png" 
    },
    { 
      id: 4, 
      company: "Amazon", 
      location: "INDIA", 
      title: "Front-end Developer", 
      desc: "Design and implement user interfaces using HTML, CSS, and JavaScript, collaborating closely with designers and back-end developers.", 
      positions: 20, 
      salary: "$1,01,000/Year", 
      logo: "assets/amazon.png" 
    },
    { 
      id: 5, 
      company: "Twitter", 
      location: "USA", 
      title: "ReactJS Developer", 
      desc: "Specialize in building dynamic and interactive user interfaces using the ReactJS library, leveraging your expertise in JavaScript and front-end development.", 
      positions: 6, 
      salary: "$98,000/Year", 
      logo: "assets/twitter.png" 
    },
    {
      "id": 6,
      "company": "Microsoft",
      "location": "INDIA",
      "title": "Mern Stack Developer",
      "desc": "Microsoft is seeking a talented MERN Stack Developer to design, develop, and maintain scalable web applications.",
      "positions": 9,
      "salary": "$80,000/Year",
      "logo": "assets/microsoft.png"
    },
    { 
      id: 7, 
      company: "YouTube", 
      location: "INDIA", 
      title: "Back-end Developer", 
      desc: "Develop scalable and efficient backend systems and applications using Python, utilizing your proficiency in Python programming and software development.", 
      positions: 9, 
      salary: "$80,000/Year", 
      logo: "assets/YouTube.jpg" 
    },
  ];

  const handleApply = (job) => {
    if (!user) {
      alert('Please login to apply for jobs');
      return;
    }

    // Show the modal with the selected job
    setSelectedJob(job);
    setShowApplication(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return; // Prevent multiple submissions
    setLoading(true);

    try {
      await axios.post('http://localhost:5000/api/applications', {
        jobId: selectedJob.id,
        jobTitle: selectedJob.title,
        company: selectedJob.company,
      });
      alert(`Application submitted for ${selectedJob.title} at ${selectedJob.company}!`);
      setShowApplication(false);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to submit application';
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter(job =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <section className="section__container job__container" id="job">
      <h2 className="section__header">
        <span>Latest & Top</span> Job Openings
      </h2>
      <p className="section__description">
        Discover Exciting New Opportunities and High-Demand Positions Available Now in Top Industries and Companies
      </p>

      <section className="search__section">
        <div className="search__container">
          <input
            type="text"
            className="search__input"
            placeholder="Search jobs by title (e.g., Project Manager)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
           <button className="search__btn" >
            Search
          </button>
        </div>
        
      </section>

      <div className="job__grid">
        {filteredJobs.length === 0 ? (
          <p className="no__results">No jobs found for "{searchTerm}". Try another title!</p>
        ) : (
          filteredJobs.map((job) => (
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
          ))
        )}
      </div>

      {showApplication && selectedJob && (
        <div className="modal">
          <div className="modal__content">
            <h3>Apply for {selectedJob.title}</h3>
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
              <button type="submit" className="btn submit-btn" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit Application'}
              </button>
              <button type="button" className="btn back-btn" onClick={() => setShowApplication(false)} disabled={loading}>
                Back to Jobs
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Latest;