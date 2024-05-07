/**
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta 
 
All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {
  Link,
  createSearchParams,
  useLocation,
  useNavigate,
} from "react-router-dom";
import * as yup from "yup";
import { cartCount, login } from "../redux/features/authSlice";
import { signIn } from "../services/services";
import { toastAlert } from "../utils/SweetAlert";
import "./auth-responsive.scss";
import "./auth.scss";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPass, setShowPass] = useState(false);
  const location = useLocation();

  const {
    values,
    errors,
    handleBlur,
    handleChange,
    touched,
    handleSubmit,
    resetForm,
    setValues,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      email: yup.string().required().label("Email").email().trim(),
      password: yup.string().required().label("Password").trim(),
    }),
    onSubmit: (values) => {
      let body = {
        email: values?.email,
        password: values?.password,
      };

      mutation.mutate(body);
    },
  });

  const mutation = useMutation({
    mutationFn: (body) => signIn(body),
    onSuccess: (resp) => {
      if (resp?.data?.data?.isVerified == 0) {
        toastAlert("success", "Your OTP is " + resp.data?.data?.otp);
        navigate({
          pathname: "/verify-otp",
          search: createSearchParams({ email: values.email }).toString(),
        });
      } else {
        if (location?.state) {
          navigate(location.state);
        }
        dispatch(login(resp?.data?.data));
        dispatch(cartCount(resp?.data?.data?.__v));
        toastAlert("success", resp.data?.message);
        resetForm();
      }
    },
  });

  return (
    <div>
      {/* <Header /> */}
      <section className="auth-main">
        <Container fluid className="p-0">
          <Row className="m-0 ">
            <Col lg={6}>
              <div className="auth-card">
                <div className="auth_logo">
                  <Link to="/">LOGO</Link>
                </div>
                <div className="auth_heading">
                  <h1>
                    Welcome Back
                    <br />
                    <span>Sign in to Continue</span>
                  </h1>
                </div>
                <Form>
                  <Row>
                    <Col lg={12}>
                      <Form.Group className="mb-4">
                        <Form.Control
                          type="email"
                          placeholder="Enter Your Email "
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          autoComplete="off"
                          onKeyPress={(e) => {
                            if (e.charCode === 13) {
                              e.preventDefault();
                              handleSubmit();
                            }
                          }}
                        />
                        <p className="text-danger">
                          {touched.email && errors.email}
                        </p>
                      </Form.Group>
                    </Col>
                    <Col lg={12}>
                      <Form.Group className="mb-4 position-relative eye_wrp">
                        <Form.Control
                          type={showPass ? "text" : "password"}
                          placeholder="Password"
                          name="password"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          autoComplete="current-password"
                          onKeyPress={(e) => {
                            if (e.charCode === 13) {
                              e.preventDefault();
                              handleSubmit();
                            }
                          }}
                        />
                        <p className="text-danger">
                          {touched.password && errors.password}
                        </p>
                        {showPass ? (
                          <span
                            className="eye-icon"
                            onClick={() => {
                              setShowPass(false);
                            }}
                          >
                            <FaEye />
                          </span>
                        ) : (
                          <span
                            className="eye-icon"
                            onClick={() => {
                              setShowPass(true);
                            }}
                          >
                            <FaEyeSlash />
                          </span>
                        )}
                      </Form.Group>
                    </Col>
                    <Col lg={12} className="mb-3">
                      <Row>
                        <Col lg={12}>
                          <div className="remember_me text-end">
                            <input type="checkbox" />
                            <span className="ms-2">Remember Me</span>
                          </div>
                        </Col>
                      </Row>
                    </Col>

                    <Col lg={12}>
                      <div className="auth_btn_wrp d-flex flex-wrap gap-2 align-items-center justify-content-between">
                        <div className="d-flex flex-wrap gap-4 left_links">
                          <Link to="/signup">Register</Link>
                          <Link to="/forgot-password">Forgot Password</Link>
                        </div>
                        <button
                          type="button"
                          onClick={handleSubmit}
                          className="btn-theme "
                        >
                          Login
                        </button>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Col>
            <Col lg={6} className="px-0">
              <div className="auth_img_wrp">
                <img src="/images/auth-img.png" alt="img" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* <Footer />  */}
    </div>
  );
};

export default Login;
