
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <>
      <section className="main_footer ptb80 pb-0">
        <Container>
          <Row className="align-items-start">
            <Col xl={4} lg={6} md={6}>
              <div className="footer_content">
                <h2 className="logo">LOGO</h2>
                <p>
                  They are sure to bring your group together. Custom T-shirts
                  have the power to create lasting memories, start new
                  traditions, and unite groups for a common purpose.{" "}
                </p>
                <div className="footer_social">
                  <Link>
                    <img src="/images/fb.png" alt="img" />
                  </Link>
                  <Link>
                    <img src="/images/instagram.png" alt="img" />
                  </Link>
                  <Link>
                    <img src="/images/twitter.png" alt="img" />
                  </Link>
                  <Link>
                    <img src="/images/youtube.png" alt="img" />
                  </Link>
                  <Link>
                    <img src="/images/linkedin.png" alt="img" />
                  </Link>
                </div>
              </div>
            </Col>
            <Col xl={2} lg={6} md={6}>
              <div className="footer-box footer-box-one">
                <h4>Quick links</h4>
                <ul>
                  <li>
                    <Link to="/about-us">About Us</Link>
                  </li>
                  <li>
                    <Link to="/contact">Contact Us</Link>
                  </li>
                  <li>
                    <Link to="/terms-conditions">Terms & Conditions</Link>
                  </li>
                  <li>
                    <Link to="/privacy-policy">Privacy Policy</Link>
                  </li>
                </ul>
              </div>
            </Col>
            <Col xl={2} lg={6} md={6}>
              <div className="footer-box footer-box-two">
                <h4>MY ACCOUNT</h4>
                <ul>
                  <li>
                    <Link to="#">Track My Order</Link>
                  </li>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                  <li>
                    <Link to="/faq">Help</Link>
                  </li>
                </ul>
              </div>
            </Col>
            <Col xl={4} lg={6} md={6}>
              <div className="footer-box footer-box-three">
                <h4>Get in touch </h4>
                <p>5th Street, 21st floor, New York, USA</p>
                <Link>abcd123@gmail.com</Link> <br />
                <Link>+1 376 635 6533</Link>
              </div>
            </Col>
          </Row>
        </Container>
        <Container>
          <div className="footer-bottom d-flex justify-content-between">
            <div className="copy-right">
              <p>
                Copyright <span className="las la-copyright"></span> 2012 - 2024{" "}
                <Link target="_blank" to="https://ozvid.com/">
                  Ozvid Technologies Pvt. Ltd.
                </Link>
              </p>
            </div>
            <div className="payment_cards">
              <Link>
                <img src="/images/applepay.png" alt="card-img" />
              </Link>
              <Link>
                <img src="/images/debit.png" alt="card-img" />
              </Link>
              <Link>
                <img src="/images/paypal.png" alt="card-img" />
              </Link>
              <Link>
                <img src="/images/master.png" alt="card-img" />
              </Link>
              <Link>
                <img src="/images/visa.png" alt="card-img" />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Footer;
