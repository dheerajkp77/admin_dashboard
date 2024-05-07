
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import React from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import useSlider from "../../../hooks/useSlider";
import { adminOrderDetail } from "../../../services/services";
import { checkAdminState } from "../../../utils/checkAdminState";
import Sidebar from "../../sidebar/Sidebar";
import AdminFooter from "../AdminFooter";
import { constant } from "../../../utils/constants";

const ViewUserOrder = () => {
  const isSlider = useSlider();
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: userOrderView } = useQuery({
    queryKey: ["userOrderView", { id }],
    queryFn: async () => {
      const res = await adminOrderDetail(id);
      return res.data?.data;
    },
  });

  return (
    <>
      <div className="mainbox">
        <Sidebar />
        <div className={isSlider ? "body-content close" : "body-content open"}>
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h2 className="mainhead mb-0">
              <Link to="/admin/dashboard" className="bread_color">
                Home
              </Link>
              / User Order Details
            </h2>
            <div className="text-end mx-1">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="theme-btn btn-md mb-2"
              >
                Back
              </button>
            </div>
          </div>
          <section className="inner-wrap">
            <Container fluid className="px-0">
              <div className="custom-card">
                <Row>
                  <Col xl={4} className="mx-auto">
                    <div className="admin-profile">
                      <img
                        src={
                          userOrderView?.profileImg
                            ? import.meta.env.VITE_API_URL +
                              userOrderView?.profileImg
                            : "/images/default.jpg"
                        }
                        alt="Profile"
                      />
                    </div>
                  </Col>
                  <Col xl={12}>
                    <Table responsive bordered>
                      <tbody>
                        <tr>
                          <th>Product Name</th>
                          <td>
                            <p className="mb-0">{userOrderView?.fullName}</p>
                          </td>
                        </tr>
                        <tr>
                          <th>Price({constant.DOLLAR})</th>
                          <td>
                            <p className="mb-0">({constant.DOLLAR}){userOrderView?.email}</p>
                          </td>
                        </tr>
                        <tr>
                          <th>Created On </th>
                          <td>
                            <p className="mb-0">
                              {moment(userOrderView?.createdAt).format("LLL")}
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <th>Status</th>
                          <td>
                            <p className="mb-0">
                              {checkAdminState(userOrderView?.state)}
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </Col>
                </Row>
              </div>
            </Container>
          </section>
        </div>
        <AdminFooter />
      </div>
    </>
  );
};

export default ViewUserOrder;
