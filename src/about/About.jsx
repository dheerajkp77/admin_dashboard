
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
// import "swiper/css";
// import "swiper/css/pagination";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "./about.scss";

const About = () => {
  return (
    <div className="bg-dark-theme">
      <Header />
      <section className="banner-section">
        <Container>
          <Row>
            <Col lg={12}>
              <div className="breadcrumb-area">
                <h2>About Us</h2>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item">
                      <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      <span>About Us</span>
                    </li>
                  </ol>
                </nav>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Footer />
    </div>
  );
};

export default About;
