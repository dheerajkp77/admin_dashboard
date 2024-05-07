import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import HeaderLogin from "../components/HeaderLogin";
import UserSidebar from "../components/UserSidebar";
import "./order.scss";
function MyOrder() {
  return (
    <div>
      <HeaderLogin />
      <section className="page_head">
        <Container>
          <h2>
            <span>User</span>
          </h2>
        </Container>
      </section>

      <section className="user_section">
        <Container>
          <Row>
            <Col lg={4}>
              <UserSidebar />
            </Col>
            <Col lg={8}>
              <div className="my_order_wrp orange_bg">
                <div className="card_heading">
                  <h4>My Orders</h4>
                </div>
                <div className="table_card">
                  <Table hover border-0>
                    <thead>
                      <tr>
                        <th>Order</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Order Number</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Text T-Shirt</td>
                        <td>1</td>
                        <td>$23</td>
                        <td>238765</td>
                        <td>
                          <span className="badge bg-warning">Pending</span>{" "}
                        </td>
                        <td>
                          <Link
                            to="/order-detail"
                            className="btn bg-primary text-white"
                          >
                            {" "}
                            <FaEye />{" "}
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td>Text T-Shirt</td>
                        <td>1</td>
                        <td>$23</td>
                        <td>238765</td>
                        <td>
                          <span className="badge bg-warning">Pending</span>{" "}
                        </td>
                        <td>
                          <Link
                            to="/order-detail"
                            className="btn bg-primary text-white"
                          >
                            {" "}
                            <FaEye />{" "}
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td>Text T-Shirt</td>
                        <td>1</td>
                        <td>$23</td>
                        <td>238765</td>
                        <td>
                          <span className="badge bg-warning">Pending</span>{" "}
                        </td>
                        <td>
                          <Link
                            to="/order-detail"
                            className="btn bg-primary text-white"
                          >
                            {" "}
                            <FaEye />{" "}
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td>Text T-Shirt</td>
                        <td>1</td>
                        <td>$23</td>
                        <td>238765</td>
                        <td>
                          <span className="badge bg-warning">Pending</span>{" "}
                        </td>
                        <td>
                          <Link
                            to="/order-detail"
                            className="btn bg-primary text-white"
                          >
                            {" "}
                            <FaEye />{" "}
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td>Text T-Shirt</td>
                        <td>1</td>
                        <td>$23</td>
                        <td>238765</td>
                        <td>
                          <span className="badge bg-warning">Pending</span>{" "}
                        </td>
                        <td>
                          <Link
                            to="/order-detail"
                            className="btn bg-primary text-white"
                          >
                            {" "}
                            <FaEye />{" "}
                          </Link>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Footer />
    </div>
  );
}

export default MyOrder;
