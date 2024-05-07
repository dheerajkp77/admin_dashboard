
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import React from "react";
import { Badge, Col, Container, Row, Table } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import useSlider from "../../../hooks/useSlider";
import { adminProductView } from "../../../services/services";
import Sidebar from "../../sidebar/Sidebar";
import AdminFooter from "../AdminFooter";

const ViewProduct = () => {
  const isSlider = useSlider();
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: productView, refetch } = useQuery({
    queryKey: ["product-details", id],
    queryFn: async () => {
      const res = await adminProductView(id);
      return res.data?.data;
    },
  });

  const stateId = {
    1: "Active",
    2: "Inactive",
    3: "Deleted",
  };

  const badgeColor = {
    1: "success",
    2: "primary",
    3: "danger",
  };

  const category = {
    0: "Male",
    1: "Female",
    2: "Unisexual",
  };

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
              / Product details
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
                  <Col xl={12}>
                    <Table responsive bordered>
                      <tbody>
                        <tr>
                          <th>Images</th>
                          <td>
                            <Row>
                              {productView?.images?.map((i, index) => (
                                <Col
                                  className="picked-img mb-2"
                                  lg={2}
                                  key={index}
                                >
                                  <img
                                    src={import.meta.env.VITE_IMAGE_URL + i}
                                    className="preview-img"
                                  />
                                </Col>
                              ))}
                            </Row>
                          </td>
                        </tr>
                        <tr>
                          <th>Title</th>
                          <td>
                            <p className="mb-0">{productView?.title}</p>
                          </td>
                        </tr>
                        <tr>
                          <th>Description</th>
                          <td>
                            <p className="mb-0">{productView?.description}</p>
                          </td>
                        </tr>
                        <tr>
                          <th>Category</th>
                          <td>
                            <p className="mb-0">
                              {category[productView?.category] ?? "NA"}
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <th>Material</th>
                          <td>
                            <p className="mb-0">{productView?.material}</p>
                          </td>
                        </tr>
                        <tr>
                          <th>Amount</th>
                          <td>
                            <p className="mb-0">${productView?.price}</p>
                          </td>
                        </tr>
                        <tr>
                          <th>Size</th>
                          <td>
                            <p className="mb-0">
                              {productView?.size?.toString()}
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <th>Type</th>
                          <td>
                            <p className="mb-0">{productView?.type}</p>
                          </td>
                        </tr>
                        <tr>
                          <th>Created On </th>
                          <td>
                            <p className="mb-0">
                              {moment(productView?.createdAt).format("LLL")}
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <th>Status</th>
                          <td>
                            <Badge
                              bg={badgeColor[productView?.stateId] ?? "warning"}
                            >
                              {stateId[productView?.stateId] ?? "NA"}
                            </Badge>
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

export default ViewProduct;
