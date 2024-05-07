import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { login } from "../redux/features/authSlice";
import { signIn } from "../services/services";
import "./auth-responsive.scss";
import "./auth.scss";

const Login = () => {
  const dispatch = useDispatch();
  const [showPass, setShowPass] = useState(false);
  const {
    values,
    errors,
    handleBlur,
    handleChange,
    touched,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      userName: yup.string().required().label("Username").trim(),
      password: yup.string().required().label("Password").trim(),
    }),
    onSubmit: (values) => {
      let body = {
        username: values?.userName,
        password: values?.password,
      };

      mutation.mutate(body);
    },
  });

  const mutation = useMutation({
    mutationFn: (body) => signIn(body),
    onSuccess: (resp) => {
      dispatch(login(resp?.data));
      resetForm();
    },
  });

  return (
    <section className="auth-main">
      <Container fluid className="p-0">
        <Row className="m-0 ">
          <Col lg={6}>
            <div className="auth-card">
              <div className="auth_logo">
                <Link to="/">LOGO</Link>
              </div>
              <div className="auth_heading">
                <h1>Sign in to Continue</h1>
              </div>
              <Form>
                <Row>
                  <Col lg={12}>
                    <Form.Group className="mb-4">
                      <Form.Control
                        type="text"
                        placeholder="Enter Your Username "
                        name="userName"
                        value={values.userName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete="off"
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleSubmit();
                          }
                        }}
                      />
                      <small className="text-danger">
                        {touched.userName && errors.userName}
                      </small>
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
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleSubmit();
                          }
                        }}
                      />
                      <small className="text-danger">
                        {touched.password && errors.password}
                      </small>
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

                  <Col lg={12} className="text-end">
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="btn-theme "
                    >
                      Login
                    </button>
                  </Col>
                </Row>
              </Form>
            </div>
          </Col>
          <Col lg={6} className="px-0">
            <div className="auth_img_wrp">
              <img src="/images/auth-img.jpg" alt="img" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
