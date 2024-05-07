import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import React from "react";
import { Badge, Col, Container, Row, Table } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import useSlider from "../../../hooks/useSlider";

import { detailFaq } from "../../../services/services";
import Sidebar from "../../sidebar/Sidebar";
import AdminFooter from "../AdminFooter";

const AdminViewFaq = () => {
  let { id } = useParams();
  const isSlider = useSlider();
  /**
   * Get FAQ Details
   */

  const { data: faqDetails } = useQuery({
    queryKey: ["faq-details", id],
    queryFn: async () => {
      const resp = await detailFaq(id);
      return resp?.data?.data ?? "";
    },
  });

  const state = {
    1: "Active",
    2: "In-active",
    3: "Deleted",
  };

  const stateBadge = {
    1: "success",
    2: "warning",
    3: "danger",
  };

  return (
    <>
      <div className="mainbox">
        <Sidebar />
        <div className={isSlider ? "body-content close" : "body-content open"}>
          <div className="d-flex align-items-center justify-content-between">
            <h2 className="mb-0 mb-0">FAQ Details</h2>

            <Link className="main-btn btn-theme m-2" to="/admin/faq">
              Back
            </Link>
          </div>

          <section className="listing-area bg-white">
            <Container fluid className="px-0">
              <Row>
                <Col lg={12}>
                  <div className="custom-card">
                    <Row>
                      <Col lg={12}>
                        <Table striped bordered responsive className="mb-0">
                          <tbody>
                            <tr>
                              <th>Question</th>
                              <td>{faqDetails?.question || "-"}</td>
                            </tr>
                            <tr>
                              <th>Answer</th>
                              <td>
                                <span
                                  dangerouslySetInnerHTML={{
                                    __html: faqDetails?.answer,
                                  }}
                                />
                              </td>
                            </tr>
                            <tr>
                              <th>Created</th>
                              <td>
                                {moment(faqDetails?.createdAt).format("lll")}
                              </td>
                            </tr>
                            <tr>
                              <th>Status</th>
                              <td>
                                {" "}
                                <Badge
                                  bg={stateBadge[faqDetails?.stateId] ?? "Warning"}
                                >
                                  {state[faqDetails?.stateId] ?? "-"}
                                </Badge>
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
        </div>
        <AdminFooter />
      </div>
    </>
  );
};

export default AdminViewFaq;
