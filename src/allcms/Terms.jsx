
import React from "react";

import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { staticPages } from "../services/services";
import { constant } from "../utils/constants";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HeaderLogin from "../components/HeaderLogin";
import useToken from "../hooks/useToken";
const Terms = () => {
  const token = useToken();
  const { data: terms } = useQuery({
    queryKey: ["terms"],
    queryFn: async () => {
      const resp = await staticPages(constant.CMS_TERMS);
      return resp.data?.data ?? "";
    },
  });
  return (
    <div className="bg-dark-theme">
      {token ? <HeaderLogin /> : <Header />}
      <section className="page_head">
        <Container>
          <h2>
            <span>Terms & Conditions</span>
          </h2>
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
