import React from 'react';

const Steps = () => {
  return ( 
    <section className="steps" id="about">
      <div className="section__container steps__container">
        <h2 className="section__header">
          Get Hired in 4 <span>Quick Easy Steps</span>
        </h2>
        <p className="section__description">
          Follow Our Simple, Step-by-Step Guide to Quickly Land Your Dream Job
          and Start Your New Career Journey.
        </p>
      </div>

      <div className="steps__grid">
        <div className="steps__card">
          <span><i className="ri-user-fill"></i></span>
          <h4>Create an Account</h4>
          <p>
            Sign up with just a few clicks to unlock exclusive access to a
            world of job opportunities and landing your dream job. It's quick,
            easy, and completely free.
          </p>
        </div>

        <div className="steps__card">
          <span><i className="ri-search-fill"></i></span>
          <h4>Search Job</h4>
          <p>
            Dive into our job database tailored to match your skills and
            preferences. With our advanced search filters, finding the perfect
            job has never been easier.
          </p>
        </div>

        <div className="steps__card">
          <span><i className="ri-file-paper-fill"></i></span>
          <h4>Upload CV/Resume</h4>
          <p>
            Showcase your experience by uploading your CV or resume. Let
            employers know why you're the perfect candidate for their job
            openings.
          </p>
        </div>

        <div className="steps__card">
          <span><i className="ri-briefcase-fill"></i></span>
          <h4>Get Job</h4>
          <p>
            Take the final step towards your new career. Get ready to embark
            on your professional journey and secure the job you've been
            dreaming of.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Steps;