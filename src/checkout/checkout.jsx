

import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import * as yup from "yup";
import Footer from "../components/Footer";
import useDetails from "../hooks/useDetails";
import { phoneRegExp } from "../utils/functions";
import "./checkout.scss";
import { useQuery } from "@tanstack/react-query";
import { cardList, userCartList } from "../services/services";
import { FaPlus } from "react-icons/fa6";
import moment from "moment";
const Checkout = () => {
  const delivery_price = 10;
  const details = useDetails();
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  const { data: cartItems } = useQuery({
    queryKey: ["cartList"],
    queryFn: async () => {
      const resp = await userCartList();
      return resp.data?.data;
    },
  });

  const { data: cards } = useQuery({
    queryKey: "stripe-cards",
    queryFn: async () => {
      const resp = await cardList();
      return resp?.data?.data;
    },
  });

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleSubmit,
    handleChange,
    setValues,
    resetForm,
  } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      streetAddress: "",
      city: "",
      zipcode: "",
      phoneNumber: "",
      email: "",
    },
    validationSchema: yup.object().shape({
      firstName: yup.string().required().label("First Name").trim(),
      lastName: yup.string().required().label("Last Name").trim(),
      streetAddress: yup.string().required().label("Street Address").trim(),
      city: yup.string().required().label("Town/City").trim(),
      zipcode: yup.string().required().label("Zipcode").trim(),
      phoneNumber: yup
        .string()
        .required()
        .label("Phone Number")
        .matches(phoneRegExp, "Invalid Phone Number"),
      email: yup.string().email().required().label("Email").trim(),
    }),
    onSubmit: (values) => {
      cartItems?.map((item) => {
        return {
          material: item?.material,
          type: item?.type,
          paymentMethodId: "pm_1P9LUCJAJfZb9HEBhlIb7GH5",
          startDate: moment().format("dd/mm/yyyy"),
          color: "red",
          size: "L",
          totalAmount: 100,
          price: 0,
          deliveryCharges: 10,
          quantity: 2,
          productId: "6621f6e8cae969963d752181",
          frontImage: "",
          backImage: "",
          firstName: "",
          lastName: "",
          streetAddress: "",
          city: "",
          zipCode: "",
          phoneNumber: "",
          emailAddress: "",
        };
      });
      resetForm();
      handleShow();
    },
  });

  console.log("cartItems", cartItems);
  useEffect(() => {
    setValues((prev) => ({
      ...prev,
      firstName: details?.firstName,
      lastName: details?.lastName,
      email: details?.email,
    }));
  }, []);

  return (
    <>
      <section className="page_head">
        <Container>
          <h2>
            <span>Checkout</span>
          </h2>
        </Container>
      </section>
      <section className="checkout_sec">
        <Container>
          <Row>
            <Col lg="6">
              <div className="check_order border_main mb-3">
                <div className="order_wrp">
                  <h4>Order</h4>
                  <ul>
                    <li>
                      Sub Total{" "}
                      <span>
                        $
                        {cartItems?.reduce(
                          (a, c) => a + c.quantity * c.price,
                          0
                        )}
                      </span>
                    </li>
                    <li>
                      Delievery Charges{" "}
                      <span>${delivery_price * +cartItems?.length}</span>
                    </li>
                  </ul>
                </div>
                <hr />
                <div className="amout_wrp">
                  <div className="d-flex justify-content-between">
                    <h4>Total Amount</h4>
                    <p className="mb-0 text-dark">
                      <strong>
                        $
                        {cartItems?.reduce(
                          (a, c) => a + c.quantity * c.price,
                          0
                        ) +
                          delivery_price * +cartItems?.length}
                      </strong>
                    </p>
                  </div>

                  {cartItems?.map((data, index) => {
                    return (
                      <div
                        key={index}
                        className="amount_dtl d-flex gap-3 align-items-center flex-wrap"
                      >
                        <div className="amount_img">
                          <img
                            src={
                              import.meta.env.VITE_IMAGE_URL +
                              data?.images?.at(0)
                            }
                            alt="img"
                          />
                        </div>
                        <div className="amount_data">
                          <p>{data?.title}</p>
                          <div className="d-flex  align-items-center flex-wrap">
                            <p>Size: {data?.size}</p>
                          </div>
                          <p>Quantity: {data?.quantity}</p>
                          <p>Price: ${data?.price}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="check_order border_main">
                <div className="order_wrp">
                  <div className="d-flex align-items-center justify-content-between flex-wrap mb-4">
                    <h4 className="">Payment Method</h4>

                    <Link className="add-btn" to="/">
                      <FaPlus />
                    </Link>
                  </div>
                  <div className="payment-card-main">
                    <div className="card-main">
                      {cards?.map((card, index) => {
                        return (
                          <div className="card-view m-0 d-flex">
                            <input id="radio1" type="radio" />

                            <label htmlFor="radio1">
                              <h4>{card?.last4} </h4>
                              <p>
                                Exp-{card?.exp_month}/{card?.exp_year}
                              </p>
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="billing_dtl border_main">
                <h4>Billing Details</h4>
                <Form>
                  <div className="mb-3">
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="firstName"
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <span className="text-danger">
                      {touched.firstName && errors.firstName}
                    </span>
                  </div>
                  <div className="mb-3">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="lastName"
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <span className="text-danger">
                      {touched.lastName && errors.lastName}
                    </span>
                  </div>
                  <div className="mb-3">
                    <Form.Label>Street Address</Form.Label>
                    <textarea
                      className="mb-2 form-control"
                      required
                      name="streetAddress"
                      value={values.streetAddress}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <span className="text-danger">
                      {touched.streetAddress && errors.streetAddress}
                    </span>
                  </div>
                  <div className="mb-3">
                    <Form.Label>Town/City</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="city"
                      value={values.city}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <span className="text-danger">
                      {touched.city && errors.city}
                    </span>
                  </div>
                  <div className="mb-3">
                    <Form.Label>Zip Code</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="zipcode"
                      value={values.zipcode}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <span className="text-danger">
                      {touched.zipcode && errors.zipcode}
                    </span>
                  </div>
                  <div className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      required
                      type="tel"
                      name="phoneNumber"
                      value={values.phoneNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <span className="text-danger">
                      {touched.phoneNumber && errors.phoneNumber}
                    </span>
                  </div>
                  <div className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      required
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <span className="text-danger">
                      {touched.email && errors.email}
                    </span>
                  </div>
                </Form>
              </div>
              <div className="text-end mt-4">
                <button
                  className="btn-theme"
                  type="button"
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  Place Order
                </button>

                <Modal
                  centered
                  className="success_modal"
                  show={show}
                  onHide={handleClose}
                >
                  <Modal.Body>
                    <div className="order_success">
                      <img src="/images/success.png" alt="img" />
                      <h4>Your Order placed Succesfully</h4>
                      <Link className="btn-theme" to={"/shop"}>
                        Shop More{" "}
                      </Link>
                    </div>
                  </Modal.Body>
                </Modal>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Footer />
    </>
  );
};

export default Checkout;
