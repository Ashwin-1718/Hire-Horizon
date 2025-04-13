import React from 'react';

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="section__container footer__container">
          <div className="footer__col">
            <div className="footer__logo">
              <a href="#" className="logo">Hire-<span>Horizon</span></a>
            </div>
            <p>
              Our platform is designed to help you find the perfect job and
              achieve your professional dreams.
            </p>
          </div>
          <div className="footer__col">
            <h4>Quick Links</h4>
            <ul className="footer__links">
              <li><a href="#">Home</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Jobs</a></li>
              <li><a href="#">Testimonials</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>
          <div className="footer__col">
            <h4>Follow Us</h4>
            <ul className="footer__links">
              <li><a href="https://github.com/Ashwin-1718">GitHub</a></li>
              <li><a href="https://www.instagram.com/ashwin.yadav28/">Instagram</a></li>
              <li><a href="#">LinkedIn</a></li>
              <li><a href="#">Twitter</a></li>
              <li><a href="#">Youtube</a></li>
            </ul>
          </div>
          <div className="footer__col">
            <h4>Contact Us</h4>
            <ul className="footer__links">
              <li>
                <a href="#">
                  <span><i className="ri-phone-fill"></i></span> +91 9898605110
                </a>
              </li>
              <li>
                <a href="#">
                  <span><i className="ri-map-pin-2-fill"></i></span> 123 Any Street,
                  Anytown, New Ranip
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="container">
          <p><b>© Design By Ashwin♪ || Hire-Horizon App.</b></p>
        </div>
      </footer>
    </>
  );
};

export default Footer;