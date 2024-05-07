
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import useSlider from "../../hooks/useSlider";

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
                  T-Shirt-customization
                </Link>
                | All Rights Reserved. Developed By
                <Link
                  to="https://ozvid.com/"
                  target="_blank"
                  className="text-decoration-underline "
                >
                  {" "}
                  OZVID Technologies
                </Link>
              </p>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default AdminFooter;
