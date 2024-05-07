
import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { staticPages } from "../services/services";
import { constant } from "../utils/constants";

const Terms = () => {
  const { data: terms } = useQuery({
    queryKey: ["terms"],
    queryFn: async () => {
      const resp = await staticPages(constant.CMS_TERMS);
      return resp.data?.data ?? "";
    },
  });
  return (
    <div className="bg-dark-theme">
      <Header />
      <section className="banner-section">
        <Container>
          <Row>
            <Col lg={12}>
              <div className="breadcrumb-area">
                <h2>Terms & Conditions</h2>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item">
                      <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      <span>Terms & Conditions</span>
                    </li>
                  </ol>
                </nav>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="ptb80">
        {terms?.title ? (
          <Container>
            <div className="privacy">
              <div className="mb-3">
                <h3>{terms?.title}</h3>
                <p
                  className="inner_section-text"
                  dangerouslySetInnerHTML={{
                    __html: terms?.description,
                  }}
                ></p>
              </div>
            </div>
          </Container>
        ) : (
          <div className="text-center">Data Not Found</div>
        )}
      </section>
      <Footer />
    </div>
  );
};

export default Terms;
