
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import Footer from "../components/Footer";
import HeaderLogin from "../components/HeaderLogin";
import "./faq.scss";
import { useQuery } from "@tanstack/react-query";
import { userFaq } from "../services/services";
const Faq = () => {
  const [active, setActive] = useState(0);
  const { data } = useQuery({
    queryKey: "faq",
    queryFn: async () => {
      const resp = await userFaq();
      return resp?.data?.data ?? [];
    },
  });
  return (
    <>
      <HeaderLogin />
      <section className="page_head">
        <Container>
          <h2>
            <span>Faqs</span>
          </h2>
        </Container>
      </section>
      <section className="faq_wrp">
        <Container>
          <div className="Section_heading text-center mb-5">
            <h2>Frequently asked questions</h2>
            <p>Let us show you how your product come to life.</p>
          </div>
          <Accordion activeKey={active} onSelect={(k) => setActive(k)}>
            {data?.map((item, index) => {
              return (
                <Accordion.Item eventKey={index}>
                  <Accordion.Header>
                    <h5>{item?.question}</h5>
                  </Accordion.Header>
                  <Accordion.Body>
                    <div dangerouslySetInnerHTML={{ __html: item?.answer }} />
                  </Accordion.Body>
                </Accordion.Item>
              );
            })}
          </Accordion>
        </Container>
      </section>
      <Footer />
    </>
  );
};

export default Faq;
