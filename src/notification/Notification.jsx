import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Footer from "../components/Footer";
import HeaderLogin from "../components/HeaderLogin";
import UserSidebar from "../components/UserSidebar";
import "./notification.scss";
function Notification() {
  return (
    <div>
      <HeaderLogin />
      <section className="page_head">
        <Container>
          <h2>
            <span>User</span>
          </h2>
        </Container>
      </section>

      <section className="user_section">
        <Container>
          <Row>
            <Col lg={4}>
              <UserSidebar />
            </Col>
            <Col lg={8}>
              <div className="notification_wrap">
                <div className="card_heading">
                  <h4>Notification</h4>
                </div>
                <div className="Notification_card">
                  <div className="d-flex align-items-center">
                    <h5>Hey product is waiting in your cart</h5>
                    <span className="dot"></span>
                  </div>
                  <div className="notication_inr d-flex gap-4 ">
                    <div className="not_img">
                      <img src="/images/notification_img.png" alt="img" />
                    </div>
                    <div className="not_content">
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        In tristique malesuada elit, ut facilisis tellus
                        elementum id. Nullam id consectetur diam. Pellentesque
                        nec tristique sapien etiam non augue lacus.
                      </p>
                      <div className="time_wrp">
                        <span>4 march 2024</span>
                        <svg
                          width="4"
                          height="4"
                          viewBox="0 0 4 4"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx="2" cy="2" r="2" fill="#6B6B6B" />
                        </svg>
                        <span>12:12 am</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="Notification_card">
                  <div className="d-flex align-items-center">
                    <h5>Hey product is waiting in your cart</h5>
                    <span className="dot"></span>
                  </div>
                  <div className="notication_inr d-flex gap-4 ">
                    <div className="not_img">
                      <img src="/images/notification_img.png" alt="img" />
                    </div>
                    <div className="not_content">
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        In tristique malesuada elit, ut facilisis tellus
                        elementum id. Nullam id consectetur diam. Pellentesque
                        nec tristique sapien etiam non augue lacus.
                      </p>
                      <div className="time_wrp">
                        <span>4 march 2024</span>
                        <svg
                          width="4"
                          height="4"
                          viewBox="0 0 4 4"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx="2" cy="2" r="2" fill="#6B6B6B" />
                        </svg>
                        <span>12:12 am</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="Notification_card">
                  <div className="d-flex align-items-center">
                    <h5>Hey product is waiting in your cart</h5>
                    <span className="dot"></span>
                  </div>
                  <div className="notication_inr d-flex gap-4 ">
                    <div className="not_img">
                      <img src="/images/notification_img.png" alt="img" />
                    </div>
                    <div className="not_content">
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        In tristique malesuada elit, ut facilisis tellus
                        elementum id. Nullam id consectetur diam. Pellentesque
                        nec tristique sapien etiam non augue lacus.
                      </p>
                      <div className="time_wrp">
                        <span>4 march 2024</span>
                        <svg
                          width="4"
                          height="4"
                          viewBox="0 0 4 4"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx="2" cy="2" r="2" fill="#6B6B6B" />
                        </svg>
                        <span>12:12 am</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Footer />
    </div>
  );
}

export default Notification;
