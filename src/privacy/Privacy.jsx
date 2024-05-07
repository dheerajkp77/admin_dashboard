
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { staticPages } from "../services/services";
import { constant } from "../utils/constants";
import "./privacy.scss";

const Privacy = () => {
  const { data: privacy } = useQuery({
    queryKey: ["privacy"],
    queryFn: async () => {
      const resp = await staticPages(constant.CMS_PRIVACY);
      return resp?.data?.data ?? "";
    },
  });
  return (
    <>
      <div className="bg-dark-theme">
        <Header />
        <section className="banner-section">
          <Container>
            <Row>
              <Col lg={12}>
                <div className="breadcrumb-area">
                  <h2>Privacy Policy</h2>
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb mb-0">
                      <li className="breadcrumb-item">
                        <Link to="/">Home</Link>
                      </li>
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        <span>Privacy Policy</span>
                      </li>
                    </ol>
                  </nav>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="ptb80">
          {privacy?.title ? (
            <Container>
              <div className="privacy">
                <div className="mb-3">
                  <h3>{privacy?.title}</h3>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: privacy?.description,
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
    </>
  );
};

export default Privacy;
