
import React from "react";
import { Badge, Col, Container, Row, Table } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import useSlider from "../../../hooks/useSlider";
import Sidebar from "../../sidebar/Sidebar";
import AdminFooter from "../AdminFooter";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import { loginActivityView } from "../../../services/services";
import { constant } from "../../../utils/constants";

const ViewLoginActivity = () => {
  const isSlider = useSlider();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: viewLogin } = useQuery({
    queryKey: ["viewLogin", { id }],
    queryFn: async () => {
      const res = await loginActivityView(id);
      return res.data?.data;
    },
  });

  const statusHandler = (stateId) => {
    if (stateId == constant.LOGIN) {
      return <Badge bg="success">Login</Badge>;
    } else if (stateId == constant.LOGIN_FAIL) {
      return <Badge bg="warning">Fail</Badge>;
    } else {
      return "N/A";
    }
  };
 
  return (
    <div className="mainbox">
      <Sidebar />
      <div className={isSlider ? "body-content close" : "body-content open"}>
        <div className="d-flex align-items-center justify-content-between mb-3">
        <h2 className="mainhead mb-0"><Link to="/admin/dashboard" className="bread_color">Home</Link> / Login Activity Details</h2>
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
                        <th>Id</th>
                        <td>
                          <p className="mb-0">{viewLogin?._id}</p>
                        </td>
                      </tr>
                      <tr>
                        <th>User IP</th>
                        <td>
                          <p className="mb-0">{viewLogin?.userIP}</p>
                        </td>
                      </tr>
                      <tr>
                        <th>Login</th>
                        <td>
                          <p className="mb-0">
                            {moment(viewLogin?.loginAt).format("LL")}
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <th>Created On </th>
                        <td>
                          <p className="mb-0">
                            {moment(viewLogin?.createdAt).format("LLL")}
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <th>Status</th>
                        <td>
                          <p className="mb-0">
                            {statusHandler(viewLogin?.state)}
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
  );
};

export default ViewLoginActivity;
