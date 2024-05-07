
import React from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import HeaderLogin from "../components/HeaderLogin";
import "./blog.scss";
const Blog = () => {
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
              <section className="blog_right">
                <Row>
                  <Col lg={6}>
                    <div className="blog_box">
                      <img src="../images/blog1.png" alt="img" />
                      <h4>
                        Make yourself happy with our T-shirt customer designer
                      </h4>
                      <div className="d-flex align-items-center flex-wrap my-3">
                        <p className="date mb-0 me-1">August 20, 2022 </p>
                        <svg
                          width="27"
                          height="1"
                          viewBox="0 0 27 1"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect width="27" height="1" fill="#6B6B6B" />
                        </svg>
                        <p className="mb-0 ms-1">
                          By <span className="text-dark"> Admin</span>
                        </p>
                      </div>
                      <p>
                        Nullam imperdiet, sem at fringilla lobortis, sem nibh
                        fringilla nibh, idae gravida mi purus sit amet erat. Ut
                        dictum nisi massa.Maecenas id justo rhoncus, volutpat
                        nunc sit amet, facilisiulum scelerisque..
                      </p>
                      <Link to="/blog-detail" className="btn-theme">
                        Read More
                      </Link>
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className="blog_box">
                      <img src="../images/blog1.png" alt="img" />
                      <h4>
                        Make yourself happy with our T-shirt customer designer
                      </h4>
                      <div className="d-flex align-items-center flex-wrap my-3">
                        <p className="date mb-0 me-1">August 20, 2022 </p>
                        <svg
                          width="27"
                          height="1"
                          viewBox="0 0 27 1"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect width="27" height="1" fill="#6B6B6B" />
                        </svg>
                        <p className="mb-0 ms-1">
                          By <span className="text-dark"> Admin</span>
                        </p>
                      </div>
                      <p>
                        Nullam imperdiet, sem at fringilla lobortis, sem nibh
                        fringilla nibh, idae gravida mi purus sit amet erat. Ut
                        dictum nisi massa.Maecenas id justo rhoncus, volutpat
                        nunc sit amet, facilisiulum scelerisque..
                      </p>
                      <Link to="/blog-detail" className="btn-theme">
                        Read More
                      </Link>
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className="blog_box">
                      <img src="../images/blog1.png" alt="img" />
                      <h4>
                        Make yourself happy with our T-shirt customer designer
                      </h4>
                      <div className="d-flex align-items-center flex-wrap my-3">
                        <p className="date mb-0 me-1">August 20, 2022 </p>
                        <svg
                          width="27"
                          height="1"
                          viewBox="0 0 27 1"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect width="27" height="1" fill="#6B6B6B" />
                        </svg>
                        <p className="mb-0 ms-1">
                          By <span className="text-dark"> Admin</span>
                        </p>
                      </div>
                      <p>
                        Nullam imperdiet, sem at fringilla lobortis, sem nibh
                        fringilla nibh, idae gravida mi purus sit amet erat. Ut
                        dictum nisi massa.Maecenas id justo rhoncus, volutpat
                        nunc sit amet, facilisiulum scelerisque..
                      </p>
                      <Link to="/blog-detail" className="btn-theme">
                        Read More
                      </Link>
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className="blog_box">
                      <img src="../images/blog1.png" alt="img" />
                      <h4>
                        Make yourself happy with our T-shirt customer designer
                      </h4>
                      <div className="d-flex align-items-center flex-wrap my-3">
                        <p className="date mb-0 me-1">August 20, 2022 </p>
                        <svg
                          width="27"
                          height="1"
                          viewBox="0 0 27 1"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect width="27" height="1" fill="#6B6B6B" />
                        </svg>
                        <p className="mb-0 ms-1">
                          By <span className="text-dark"> Admin</span>
                        </p>
                      </div>
                      <p>
                        Nullam imperdiet, sem at fringilla lobortis, sem nibh
                        fringilla nibh, idae gravida mi purus sit amet erat. Ut
                        dictum nisi massa.Maecenas id justo rhoncus, volutpat
                        nunc sit amet, facilisiulum scelerisque..
                      </p>
                      <Link to="/blog-detail" className="btn-theme">
                        Read More
                      </Link>
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className="blog_box">
                      <img src="../images/blog1.png" alt="img" />
                      <h4>
                        Make yourself happy with our T-shirt customer designer
                      </h4>
                      <div className="d-flex align-items-center flex-wrap my-3">
                        <p className="date mb-0 me-1">August 20, 2022 </p>
                        <svg
                          width="27"
                          height="1"
                          viewBox="0 0 27 1"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect width="27" height="1" fill="#6B6B6B" />
                        </svg>
                        <p className="mb-0 ms-1">
                          By <span className="text-dark"> Admin</span>
                        </p>
                      </div>
                      <p>
                        Nullam imperdiet, sem at fringilla lobortis, sem nibh
                        fringilla nibh, idae gravida mi purus sit amet erat. Ut
                        dictum nisi massa.Maecenas id justo rhoncus, volutpat
                        nunc sit amet, facilisiulum scelerisque..
                      </p>
                      <Link to="/blog-detail" className="btn-theme">
                        Read More
                      </Link>
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className="blog_box">
                      <img src="../images/blog1.png" alt="img" />
                      <h4>
                        Make yourself happy with our T-shirt customer designer
                      </h4>
                      <div className="d-flex align-items-center flex-wrap my-3">
                        <p className="date mb-0 me-1">August 20, 2022 </p>
                        <svg
                          width="27"
                          height="1"
                          viewBox="0 0 27 1"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect width="27" height="1" fill="#6B6B6B" />
                        </svg>
                        <p className="mb-0 ms-1">
                          By <span className="text-dark"> Admin</span>
                        </p>
                      </div>
                      <p>
                        Nullam imperdiet, sem at fringilla lobortis, sem nibh
                        fringilla nibh, idae gravida mi purus sit amet erat. Ut
                        dictum nisi massa.Maecenas id justo rhoncus, volutpat
                        nunc sit amet, facilisiulum scelerisque..
                      </p>
                      <Link to="/blog-detail" className="btn-theme">
                        Read More
                      </Link>
                    </div>
                  </Col>
                </Row>
              </section>
            </Col>
          </Row>
        </Container>
      </section>
      <Footer />
    </>
  );
};

export default Blog;
