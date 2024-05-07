import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import useSlider from "../../hooks/useSlider";
import { getProductDetails } from "../../services/services";
import AdminFooter from "../AdminFooter";
import Sidebar from "../sidebar/Sidebar";
import Loader from "../../components/Loader/Loader";

const ViewProduct = () => {
  const isSlider = useSlider();
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: productView, isPending } = useQuery({
    queryKey: ["product-details", id],
    queryFn: async () => {
      const res = await getProductDetails(id);
      return res.data;
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
                                  <img src={i} className="preview-img" />
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
                            <p className="mb-0">{productView?.category}</p>
                          </td>
                        </tr>
                        <tr>
                          <th>Brand</th>
                          <td>
                            <p className="mb-0">{productView?.brand}</p>
                          </td>
                        </tr>
                        <tr>
                          <th>Price</th>
                          <td>
                            <p className="mb-0">${productView?.price}</p>
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
      {isPending && <Loader/>}
    </>
  );
};

export default ViewProduct;
