import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "./payment.scss";
function Payment() {
  return (
    <div>
      <Header />
      <section className="page_head">
        <Container>
          <h2>
            <span>Payment</span>
          </h2>
        </Container>
      </section>
      <section className="payment_wrap">
        <Container>
          <Row className="justify-content-center">
            <Col lg={9}>
              <div className="payment_cards">
                <Row>
                  <Col lg={4}>
                    <Form.Group className="pay_card d-flex mb-2 align-items-center gap-3">
                      <Form.Check type="radio" id="id1" name="radioselect" />
                      <label className="ms-2" htmlFor="id1">
                        <img src="/images/paypal-card.png" alt="img" />
                      </label>
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group className="pay_card d-flex mb-2 align-items-center gap-3">
                      <Form.Check type="radio" id="id2" name="radioselect" />
                      <label className="ms-2" htmlFor="id2">
                        <img src="/images/master-card.png" alt="img" />
                      </label>
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group className="pay_card d-flex mb-2 align-items-center gap-3">
                      <Form.Check type="radio" id="id3" name="radioselect" />
                      <label className="ms-2" htmlFor="id3">
                        <img src="/images/visa-card.png" alt="img" />
                      </label>
                    </Form.Group>
                  </Col>
                </Row>
              </div>

              <div className="payment_form">
                <Row>
                  <Col lg={12}>
                    <div className="mb-3">
                      <Form.Label>Card Number</Form.Label>
                      <Form.Control required type="text" />
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className="mb-3">
                      <Form.Label>Expiration Date</Form.Label>
                      <Form.Control required type="text" />
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className="mb-3">
                      <Form.Label>CVV</Form.Label>
                      <Form.Control required type="text" />
                    </div>
                  </Col>
                  <Col lg={12}>
                    <div className="mb-3">
                      <Form.Label>Card Holder Name</Form.Label>
                      <Form.Control required type="text" />
                    </div>
                  </Col>
                  <Col lg={12}>
                    <Form.Group className="d-flex mb-2 align-items-center gap-1">
                      <Form.Check type="checkbox" id="id1" />
                      <label className="ms-2" htmlFor="id4">
                        Save my details for future purchases
                      </label>
                    </Form.Group>
                  </Col>
                  <Col lg={12}>
                    <div className="sub_total_wrp">
                      <p className="text-dark">
                        <strong> Subtotal(2 items) </strong>{" "}
                        <span>
                          <strong> $234</strong>
                        </span>
                      </p>
                      <p>
                        Home delivery cost{" "}
                        <span className="text-dark">
                          <strong> $5 </strong>
                        </span>
                      </p>
                    </div>
                    <div className="sub_total_wrp">
                      <p className="text-dark">
                        <strong> Total Amount</strong>{" "}
                        <span>
                          <strong> $234</strong>
                        </span>
                      </p>
                    </div>
                  </Col>
                </Row>
              </div>
              <div className="text-center mt-4">
                <Link className="btn-theme">Pay</Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Footer />
    </div>
  );
}

export default Payment;
