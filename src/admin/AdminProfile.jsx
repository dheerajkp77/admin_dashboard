import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import * as yup from "yup";
import useDetails from "../hooks/useDetails";
import useSlider from "../hooks/useSlider";
import { login } from "../redux/features/authSlice";
import { constant } from "../utils/constants";
import AdminFooter from "./AdminFooter";
import Sidebar from "./sidebar/Sidebar";

const AdminProfile = () => {
  const isSlider = useSlider();
  const data = useDetails();

  console.log(data);

  return (
    <>
      <div className="mainbox">
        <Sidebar />
        <div className={isSlider ? "body-content close" : "body-content open"}>
          <div className="d-flex align-items-center justify-content-between">
            <h2 className="mainhead mb-0">
              <Link to="/admin/dashboard" className="bread_color">
                Home
              </Link>
              / Admin Profile
            </h2>
          </div>

          <section className="inner-wrap">
            <Container fluid className="px-0">
              <div className="custom-card">
                <Row>
                  <Col xl={4} className="mx-auto">
                    <div className="admin-profile">
                      <img
                        src={data?.image ? data?.image : "/images/profile.jpg"}
                        alt="Profile"
                      />
                    </div>
                  </Col>
                  <Col xl={12}>
                    <Table responsive bordered>
                      <tbody>
                        <tr>
                          <th>Full Name</th>
                          <td>
                            <p className="mb-0">
                              {data?.firstName} {data?.lastName}
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <th>Username</th>
                          <td>
                            <p className="mb-0">{data?.username}</p>
                          </td>
                        </tr>
                        <tr>
                          <th>Email</th>
                          <td>
                            <p className="mb-0">{data?.email}</p>
                          </td>
                        </tr>
                        <tr>
                          <th>Gender</th>
                          <td>
                            <p className="mb-0">
                              {data?.gender}
                            </p>
                          </td>
                        </tr>
                        {data?.bio && (
                          <tr>
                            <th>Bio</th>
                            <td>
                              <p className="mb-0">{data?.bio}</p>
                            </td>
                          </tr>
                        )}
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

export default AdminProfile;
