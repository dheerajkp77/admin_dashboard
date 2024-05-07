
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import useSlider from "../hooks/useSlider";

const AdminFooter = () => {
  const isSlider = useSlider();
  return (
    <>
      <section
        className={isSlider ? "admin-footer close" : "admin-footer open"}
      >
        <Container>
          <Row>
            <Col lg={12} className="text-center">
              <p className="mb-0">
                &copy; {new Date().getFullYear()}
                <Link
                  to="/admin/dashboard"
                  className="text-decoration-underline "
                >
                  {" "}
                  Admin Dashboard
                </Link>
                | All Rights Reserved.
              </p>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default AdminFooter;
