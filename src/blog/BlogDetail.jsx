
import React from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { FaCheck, FaClock, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import HeaderLogin from "../components/HeaderLogin";
import "./blog.scss";
const BlogDetail = () => {
  return (
    <>
      <HeaderLogin />
      <section className="page_head">
        <Container>
          <h2>
            <span>Blog</span>
          </h2>
        </Container>
      </section>
      <section className="blog_sec">
        <Container>
          <Row>
            <Col lg={3}>
              <div className="blog_filter">
                <div className="blog_search">
                  <Form>
                    <Form.Group className="mb-3 search">
                      <Form.Control type="text" placeholder="Search" />

                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M21.0002 21L16.6572 16.657M16.6572 16.657C17.4001 15.9141 17.9894 15.0322 18.3914 14.0615C18.7935 13.0909 19.0004 12.0506 19.0004 11C19.0004 9.94939 18.7935 8.90908 18.3914 7.93845C17.9894 6.96782 17.4001 6.08588 16.6572 5.34299C15.9143 4.6001 15.0324 4.01081 14.0618 3.60877C13.0911 3.20672 12.0508 2.99979 11.0002 2.99979C9.9496 2.99979 8.90929 3.20672 7.93866 3.60877C6.96803 4.01081 6.08609 4.6001 5.34321 5.34299C3.84288 6.84332 3 8.87821 3 11C3 13.1218 3.84288 15.1567 5.34321 16.657C6.84354 18.1573 8.87842 19.0002 11.0002 19.0002C13.122 19.0002 15.1569 18.1573 16.6572 16.657Z"
                          stroke="#8E8E8E"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Form.Group>
                  </Form>
                </div>
                <div className="latest_post">
                  <h4>Latest Post</h4>
                  <div className="post_wrp d-flex gap-3 mb-4">
                    <img src="../images/post.png" alt="img" />
                    <div className="post_rt">
                      <span>Design Services, HaruTheme</span>
                      <p className="text-dark">
                        10 Steps to Writing the Perfect Prospectus
                      </p>
                    </div>
                  </div>
                  <div className="post_wrp d-flex gap-3 mb-4">
                    <img src="../images/post.png" alt="img" />
                    <div className="post_rt">
                      <span>Design Services, HaruTheme</span>
                      <p className="text-dark">
                        10 Steps to Writing the Perfect Prospectus
                      </p>
                    </div>
                  </div>
                  <div className="post_wrp d-flex gap-3 mb-4">
                    <img src="../images/post.png" alt="img" />
                    <div className="post_rt">
                      <span>Design Services, HaruTheme</span>
                      <p className="text-dark">
                        10 Steps to Writing the Perfect Prospectus
                      </p>
                    </div>
                  </div>
                  <div className="post_wrp d-flex gap-3 ">
                    <img src="../images/post.png" alt="img" />
                    <div className="post_rt">
                      <span>Design Services, HaruTheme</span>
                      <p className="text-dark">
                        10 Steps to Writing the Perfect Prospectus
                      </p>
                    </div>
                  </div>
                </div>
                <div className="blog_add">
                  <img src="../images/blog-add.png" alt="img" />
                </div>
              </div>
            </Col>

            <Col lg={9}>
              <section className="blog-details-content">
                <h2 className="title">
                  Make yourself happy with our T-shirt customer designer
                </h2>
                <div className="blog-preview-img">
                  <img src="../images/shop-dtl.png" alt="Blog Details" />
                </div>
                <ul className="tag-list">
                  <li className="active">
                    <a href="author.php">
                      {" "}
                      <FaUser />
                      By Alicia Davis
                    </a>
                  </li>
                  <li>
                    <FaClock /> Jan 12,2022{" "}
                  </li>
                </ul>
                <p>
                  {" "}
                  Nullam imperdiet, sem at fringilla lobortis, sem nibh
                  fringilla nibh, idae gravida mi purus sit amet erat. Ut dictum
                  nisi massa.Maecenas id justo rhoncus, volutpat nunc sit amet,
                  facilisiulum scelerisque..
                </p>
                <p>
                  {" "}
                  Nullam imperdiet, sem at fringilla lobortis, sem nibh
                  fringilla nibh, idae gravida mi purus sit amet erat. Ut dictum
                  nisi massa.Maecenas id justo rhoncus, volutpat nunc sit amet,
                  facilisiulum scelerisque..
                </p>
                <blockquote>
                  <p>
                    Nullam imperdiet, sem at fringilla lobortis, sem nibh
                    fringilla nibh, idae gravida mi purus sit amet erat. Ut
                    dictum nisi massa.Maecenas id justo rhoncus, volutpat nunc
                    sit amet, facilisiulum scelerisque.. Nullam imperdiet, sem
                    at fringilla lobortis, sem nibh fringilla nibh.
                  </p>
                </blockquote>
                <p>
                  {" "}
                  Nullam imperdiet, sem at fringilla lobortis, sem nibh
                  fringilla nibh, idae gravida mi purus sit amet erat. Ut dictum
                  nisi massa.Maecenas id justo rhoncus, volutpat nunc sit amet,
                  facilisiulum scelerisque..
                </p>
                <p>
                  {" "}
                  Nullam imperdiet, sem at fringilla lobortis, sem nibh
                  fringilla nibh, idae gravida mi purus sit amet erat. Ut dictum
                  nisi massa.Maecenas id justo rhoncus, volutpat nunc sit amet,
                  facilisiulum scelerisque..{" "}
                </p>
                <div className="blog-article-content">
                  <h4 className="mb-3">T-shirt customer designer</h4>
                  <ul>
                    <li>
                      <FaCheck /> Nullam imperdiet, sem at fringilla lobortis,
                      sem nibh fringilla nibh
                    </li>
                    <li>
                      <FaCheck />
                      Nullam imperdiet, sem at fringilla lobortis, sem nibh
                      fringilla nibh
                    </li>
                    <li>
                      <FaCheck /> Nullam imperdiet, sem at fringilla lobortis,
                      sem nibh fringilla nibh . elit.
                    </li>
                    <li>
                      <FaCheck />
                      Nullam imperdiet, sem at fringilla lobortis, sem nibh
                      fringilla nibh
                    </li>
                    <li>
                      <FaCheck /> Nullam imperdiet, sem at fringilla lobortis,
                      sem nibh fringilla nibh
                    </li>
                  </ul>
                </div>
                <div className="blog-comments-area">
                  <div className="comments-wrap">
                    <div className="comment-title">
                      <h4>03 Comments</h4>
                    </div>
                    <ul className="comment-form">
                      <li>
                        <img src="../images/profile.jpg" alt="Image" />
                        <h3>Robert John</h3>
                        <span>January 19, 2022 AT 06:30 PM</span>
                        <p>
                          Nullam imperdiet, sem at fringilla lobortis, sem nibh
                          fringilla nibh, idae gravida mi purus sit amet erat.
                          Ut dictum nisi massa.Maecenas id justo rhoncus,
                          volutpat nunc sit amet, facilisiulum scelerisque..
                        </p>
                        <a href="#"> Reply</a>
                      </li>
                      <li className="pl-80">
                        <img src="../images/profile.jpg" alt="Image" />
                        <h3>Christine Hill</h3>
                        <span>January 19, 2022 AT 06:30 PM</span>
                        <p>
                          Nullam imperdiet, sem at fringilla lobortis, sem nibh
                          fringilla nibh, idae gravida mi purus sit amet erat.
                          Ut dictum nisi massa.Maecenas id justo rhoncus,
                          volutpat nunc sit amet, facilisiulum scelerisque..
                        </p>
                        <a href="#"> Reply</a>
                      </li>
                      <li>
                        <img src="../images/profile.jpg" alt="Image" />
                        <h3>Rosalina D. William</h3>
                        <span>January 19, 2022 AT 06:30 PM</span>
                        <p>
                          Nullam imperdiet, sem at fringilla lobortis, sem nibh
                          fringilla nibh, idae gravida mi purus sit amet erat.
                          Ut dictum nisi massa.Maecenas id justo rhoncus,
                          volutpat nunc sit amet, facilisiulum scelerisque..
                        </p>
                        <a href="#"> Reply</a>
                      </li>
                    </ul>
                  </div>
                  <div className="comments-form">
                    <div className="contact-form">
                      <h4 className="mb-3">Leave A Reply</h4>
                      <p className="mb-4">
                        Your email address will not be published. Required
                        fields are marked *
                      </p>
                      <form id="contactForm" noValidate="true">
                        <div className="row">
                          <div className="col-lg-6 col-sm-6">
                            <div className="form-group">
                              <Form.Control
                                type="text"
                                className="form-control"
                                placeholder="Your Name"
                              />
                            </div>
                          </div>
                          <div className="col-lg-6 col-sm-6">
                            <div className="form-group">
                              <Form.Control
                                type="email"
                                className="form-control"
                                placeholder="Your Email"
                              />
                            </div>
                          </div>
                          <div className="col-lg-12 col-sm-12">
                            <div className="form-group">
                              <Form.Control
                                type="text"
                                className="form-control"
                                placeholder="Your Website"
                              />
                            </div>
                          </div>
                          <div className="col-lg-12 col-md-12">
                            <div className="form-group">
                              <Form.Control
                                as="textarea"
                                className="form-control"
                                style={{ height: "150px" }}
                                placeholder="Your Message.."
                                defaultValue={""}
                              />
                            </div>
                          </div>

                          <div className="col-lg-12 col-md-12">
                            <button type="submit" className="btn-theme">
                              Post A Comment
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </section>
            </Col>
          </Row>
        </Container>
      </section>
      <Footer />
    </>
  );
};

export default BlogDetail;
