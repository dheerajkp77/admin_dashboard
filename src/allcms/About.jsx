
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HeaderLogin from "../components/HeaderLogin";
import useToken from "../hooks/useToken";
import { staticPages } from "../services/services";
import { constant } from "../utils/constants";
import "./about.scss";

const About = () => {
  const token = useToken();

  const { data: about } = useQuery({
    queryKey: ["About"],
    queryFn: async () => {
      const resp = await staticPages(constant.CMS_ABOUT);
      return resp?.data?.data ?? "";
    },
  });

  return (
    <>
      {token ? <HeaderLogin /> : <Header />}
      <section className="page_head">
        <Container>
          <h2>
            <span>About Us</span>
          </h2>
        </Container>
      </section>
      <section className="about_sec">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <div className="about_inr">
                <h3>{about?.title}</h3>
                <div dangerouslySetInnerHTML={{ __html: about?.description }} />

                <ul>
                  <li>Top quality prints using the latest technology</li>
                  <li>Mix and match colors, sizes, and designs</li>
                  <li>Fast and free standard shipping</li>
                  <li>Customer happiness guarantee</li>
                </ul>
                <Link
                  className="btn-theme"
                  to={token ? "/shirt-customization" : "/login"}
                >
                  Customize T-shirt
                </Link>
              </div>
            </Col>
            <Col lg={6}>
              <div className="about_img">
                <img src="/images/about.png" alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* <section className="meet_team">
        <div className="section_heading">
          <h2>Meet our team!</h2>
        </div>
        <Container>
          <Row>
            <Col lg={3}>
              <div className="team_box">
                <img src="/images/team1.png" alt="" />
                <h4>Arlena mcCoy</h4>
                <p>Designer</p>
              </div>
            </Col>
            <Col lg={3}>
              <div className="team_box">
                <img src="/images/team2.png" alt="" />
                <h4>Arlena mcCoy</h4>
                <p>Designer</p>
              </div>
            </Col>
            <Col lg={3}>
              <div className="team_box">
                <img src="/images/team3.png" alt="" />
                <h4>Arlena mcCoy</h4>
                <p>Designer</p>
              </div>
            </Col>
            <Col lg={3}>
              <div className="team_box">
                <img src="/images/team4.png" alt="" />
                <h4>Arlena mcCoy</h4>
                <p>Designer</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="testimonial">
        <Container>
          <div className="section_heading">
            <h2>What People Are Saying</h2>
          </div>
          <Row>
            <Col lg={4}>
              <div className="review_box">
                <div className="reviw_inr d-flex flex-wrap gap-3">
                  <div className="review_img">
                    <img src="/images/review.png" alt="" />
                  </div>
                  <div className="review_rt">
                    <h5>Arlena mcCoy</h5>
                    <p>
                      <strong>Director</strong>{" "}
                    </p>
                    <div className="stars mb-2">
                      <svg
                        width="25"
                        height="23"
                        viewBox="0 0 25 23"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.5 0L15.3064 8.63729H24.3882L17.0409 13.9754L19.8473 22.6127L12.5 17.2746L5.15268 22.6127L7.95911 13.9754L0.611794 8.63729H9.69357L12.5 0Z"
                          fill="#378CE7"
                        />
                      </svg>

                      <svg
                        width="25"
                        height="23"
                        viewBox="0 0 25 23"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.5 0L15.3064 8.63729H24.3882L17.0409 13.9754L19.8473 22.6127L12.5 17.2746L5.15268 22.6127L7.95911 13.9754L0.611794 8.63729H9.69357L12.5 0Z"
                          fill="#378CE7"
                        />
                      </svg>

                      <svg
                        width="25"
                        height="23"
                        viewBox="0 0 25 23"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.5 0L15.3064 8.63729H24.3882L17.0409 13.9754L19.8473 22.6127L12.5 17.2746L5.15268 22.6127L7.95911 13.9754L0.611794 8.63729H9.69357L12.5 0Z"
                          fill="#378CE7"
                        />
                      </svg>

                      <svg
                        width="25"
                        height="23"
                        viewBox="0 0 25 23"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.5 0L15.3064 8.63729H24.3882L17.0409 13.9754L19.8473 22.6127L12.5 17.2746L5.15268 22.6127L7.95911 13.9754L0.611794 8.63729H9.69357L12.5 0Z"
                          fill="#378CE7"
                        />
                      </svg>

                      <svg
                        width="25"
                        height="23"
                        viewBox="0 0 25 23"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.5 0L15.3064 8.63729H24.3882L17.0409 13.9754L19.8473 22.6127L12.5 17.2746L5.15268 22.6127L7.95911 13.9754L0.611794 8.63729H9.69357L12.5 0Z"
                          fill="#378CE7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <p className="mb-0">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam
                </p>
              </div>
            </Col>
            <Col lg={4}>
              <div className="review_box">
                <div className="reviw_inr d-flex flex-wrap gap-3">
                  <div className="review_img">
                    <img src="/images/review.png" alt="" />
                  </div>
                  <div className="review_rt">
                    <h5>Arlena mcCoy</h5>
                    <p>
                      <strong>Director</strong>{" "}
                    </p>
                    <div className="stars mb-2">
                      <svg
                        width="25"
                        height="23"
                        viewBox="0 0 25 23"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.5 0L15.3064 8.63729H24.3882L17.0409 13.9754L19.8473 22.6127L12.5 17.2746L5.15268 22.6127L7.95911 13.9754L0.611794 8.63729H9.69357L12.5 0Z"
                          fill="#378CE7"
                        />
                      </svg>

                      <svg
                        width="25"
                        height="23"
                        viewBox="0 0 25 23"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.5 0L15.3064 8.63729H24.3882L17.0409 13.9754L19.8473 22.6127L12.5 17.2746L5.15268 22.6127L7.95911 13.9754L0.611794 8.63729H9.69357L12.5 0Z"
                          fill="#378CE7"
                        />
                      </svg>

                      <svg
                        width="25"
                        height="23"
                        viewBox="0 0 25 23"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.5 0L15.3064 8.63729H24.3882L17.0409 13.9754L19.8473 22.6127L12.5 17.2746L5.15268 22.6127L7.95911 13.9754L0.611794 8.63729H9.69357L12.5 0Z"
                          fill="#378CE7"
                        />
                      </svg>

                      <svg
                        width="25"
                        height="23"
                        viewBox="0 0 25 23"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.5 0L15.3064 8.63729H24.3882L17.0409 13.9754L19.8473 22.6127L12.5 17.2746L5.15268 22.6127L7.95911 13.9754L0.611794 8.63729H9.69357L12.5 0Z"
                          fill="#378CE7"
                        />
                      </svg>

                      <svg
                        width="25"
                        height="23"
                        viewBox="0 0 25 23"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.5 0L15.3064 8.63729H24.3882L17.0409 13.9754L19.8473 22.6127L12.5 17.2746L5.15268 22.6127L7.95911 13.9754L0.611794 8.63729H9.69357L12.5 0Z"
                          fill="#378CE7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <p className="mb-0">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam
                </p>
              </div>
            </Col>
            <Col lg={4}>
              <div className="review_box">
                <div className="reviw_inr d-flex flex-wrap gap-3">
                  <div className="review_img">
                    <img src="/images/review.png" alt="" />
                  </div>
                  <div className="review_rt">
                    <h5>Arlena mcCoy</h5>
                    <p>
                      <strong>Director</strong>{" "}
                    </p>
                    <div className="stars mb-2">
                      <svg
                        width="25"
                        height="23"
                        viewBox="0 0 25 23"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.5 0L15.3064 8.63729H24.3882L17.0409 13.9754L19.8473 22.6127L12.5 17.2746L5.15268 22.6127L7.95911 13.9754L0.611794 8.63729H9.69357L12.5 0Z"
                          fill="#378CE7"
                        />
                      </svg>

                      <svg
                        width="25"
                        height="23"
                        viewBox="0 0 25 23"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.5 0L15.3064 8.63729H24.3882L17.0409 13.9754L19.8473 22.6127L12.5 17.2746L5.15268 22.6127L7.95911 13.9754L0.611794 8.63729H9.69357L12.5 0Z"
                          fill="#378CE7"
                        />
                      </svg>

                      <svg
                        width="25"
                        height="23"
                        viewBox="0 0 25 23"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.5 0L15.3064 8.63729H24.3882L17.0409 13.9754L19.8473 22.6127L12.5 17.2746L5.15268 22.6127L7.95911 13.9754L0.611794 8.63729H9.69357L12.5 0Z"
                          fill="#378CE7"
                        />
                      </svg>

                      <svg
                        width="25"
                        height="23"
                        viewBox="0 0 25 23"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.5 0L15.3064 8.63729H24.3882L17.0409 13.9754L19.8473 22.6127L12.5 17.2746L5.15268 22.6127L7.95911 13.9754L0.611794 8.63729H9.69357L12.5 0Z"
                          fill="#378CE7"
                        />
                      </svg>

                      <svg
                        width="25"
                        height="23"
                        viewBox="0 0 25 23"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.5 0L15.3064 8.63729H24.3882L17.0409 13.9754L19.8473 22.6127L12.5 17.2746L5.15268 22.6127L7.95911 13.9754L0.611794 8.63729H9.69357L12.5 0Z"
                          fill="#378CE7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <p className="mb-0">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section> */}
      <Footer />
    </>
  );
};

export default About;
