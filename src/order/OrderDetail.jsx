import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Footer from "../components/Footer";
import HeaderLogin from "../components/HeaderLogin";
import UserSidebar from "../components/UserSidebar";
import "./order.scss";
function OrderDetail() {
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
              <div className="my_order_wrp orange_bg">
                <div className="card_heading">
                  <h4>Order Details</h4>
                </div>
                <div className="order_dtl_list">
                  <ul>
                    <li className="d-flex my-3">
                      Order Number:{" "}
                      <span className="ms-auto text-end"> 344567</span>
                    </li>
                    <li className="d-flex my-3">
                      Product Name:{" "}
                      <span className="ms-auto text-end"> Text T-shirt</span>
                    </li>
                    <li className="d-flex my-3">
                      Order Date:{" "}
                      <span className="ms-auto text-end"> 06-march-2024</span>
                    </li>
                    <li className="d-flex my-3">
                      Size <span className="ms-auto text-end"> XL</span>
                    </li>
                    <li className="d-flex my-3">
                      Color{" "}
                      <span className="ms-auto text-end">
                        {" "}
                        913, north plaza mall, motera, ahmedabad, Gujarat,
                        300678
                      </span>
                    </li>
                    <li className="d-flex my-3">
                      Price <span className="ms-auto text-end"> $657</span>
                    </li>
                    <li className="d-flex my-3">
                      Pay Type <span className="ms-auto text-end"> PPD</span>
                    </li>
                  </ul>
                </div>
                <div className="order_track">
                  <h3 className="text-center mb-4 mt-3">Order Track</h3>
                  <div className="track_wrap d-flex justify-content-between gap-4  flex-wrap">
                    <div className="track_inr text-center">
                      <h5>Order Placed</h5>
                      <p>6 March 2024</p>
                    </div>
                    <div className="track_inr text-center">
                      <h5>Total</h5>
                      <p>$23</p>
                    </div>
                    <div className="track_inr text-center">
                      <h5>Ship to</h5>
                      <p>AriyanMital</p>
                    </div>
                    <div className="track_inr text-center">
                      <h5>Order Id</h5>
                      <p>456525</p>
                    </div>
                  </div>
                </div>
                <div className="order_status">
                  <h3 className="text-center">
                    Order Status: <span>Shipping</span>{" "}
                  </h3>
                  <p className="text-center">
                    Estimate Delivery Date: 04 march - 05 march
                  </p>

                  <div className="d-flex justify-content-around align-items-center gap-4 mt-4 position-relative">
                    <div className="line_wrp">
                      <span className="active"></span>
                    </div>
                    <div className="status_inr text-center active">
                      <div className="status_icon active">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M20.4984 1.40625L9.50156 15.9047L3 9.40781L0 12.4078L9.99844 22.4062L24 4.40625L20.4984 1.40625Z"
                            fill="white"
                          />
                        </svg>
                      </div>
                      <h5>Order Placed</h5>
                      <p>2 march</p>
                    </div>
                    <div className="status_inr text-center active">
                      <div className="status_icon ">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M18 18.5C18.83 18.5 19.5 17.83 19.5 17C19.5 16.17 18.83 15.5 18 15.5C17.17 15.5 16.5 16.17 16.5 17C16.5 17.83 17.17 18.5 18 18.5ZM19.5 9.5H17V12H21.46L19.5 9.5ZM6 18.5C6.83 18.5 7.5 17.83 7.5 17C7.5 16.17 6.83 15.5 6 15.5C5.17 15.5 4.5 16.17 4.5 17C4.5 17.83 5.17 18.5 6 18.5ZM20 8L23 12V17H21C21 18.66 19.66 20 18 20C16.34 20 15 18.66 15 17H9C9 18.66 7.66 20 6 20C4.34 20 3 18.66 3 17H1V6C1 4.89 1.89 4 3 4H17V8H20ZM3 6V15H3.76C4.31 14.39 5.11 14 6 14C6.89 14 7.69 14.39 8.24 15H15V6H3Z"
                            fill="white"
                          />
                        </svg>
                      </div>
                      <h5>Dispatched</h5>
                      <p>2 march</p>
                    </div>
                    <div className="status_inr text-center">
                      <div className="status_icon">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M20.4984 1.40625L9.50156 15.9047L3 9.40781L0 12.4078L9.99844 22.4062L24 4.40625L20.4984 1.40625Z"
                            fill="white"
                          />
                        </svg>
                      </div>
                      <h5>Delivered</h5>
                      <p>5 march - 6 march</p>
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

export default OrderDetail;
