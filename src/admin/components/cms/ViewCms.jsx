

/**
 * @copyright : Ozvid Technologies Pvt. Ltd. < www.ozvid.com >
  @author     : Shiv Charan Panjeta 
  
  All Rights Reserved.
  Proprietary and confidential :  All information contained herein is, and remains
  the property of Ozvid Technologies Pvt. Ltd. and its partners.
  Unauthorized copying of this file, via any medium is strictly prohibited.
 * 
 */
  import React from "react";
  import useSlider from "../../../hooks/useSlider";
  import { Link, useNavigate, useParams } from "react-router-dom";
  import { useQuery } from "@tanstack/react-query";
  import { adminCmsView } from "../../../services/services";
  import Sidebar from "../../sidebar/Sidebar";
  import { Col, Container, Row, Table } from "react-bootstrap";
  import { checkAdminState } from "../../../utils/checkAdminState";
  import moment from "moment";
  import AdminFooter from "../AdminFooter";
  import { constant } from "../../../utils/constants";
  
  const ViewCms = () => {
    const isSlider = useSlider();
    const navigate = useNavigate();
    const { id } = useParams();
    const { data: viewCms } = useQuery({
      queryKey: ["viewCms", { id }],
      queryFn: async () => {
        const res = await adminCmsView(id);
        return res.data?.data;
      },
    });
  
    const pageType = (value) => {
      if (value == constant.CMS_TERMS) {
        return "Terms & Conditions";
      } else if (value == constant.CMS_PRIVACY) {
        return "Privacy Policy";
      } else if (value == constant.CMS_ABOUT) {
        return "About us";
      }
    };
    return (
      <div className="mainbox">
        <Sidebar />
        <div className={isSlider ? "body-content close" : "body-content open"}>
          <div className="d-flex align-items-center justify-content-between mb-3">
          <h2 className="mainhead mb-0"><Link to="/admin/dashboard" className="bread_color">Home</Link> / Cms Details</h2>
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
                          <th>Title</th>
                          <td>
                            <p className="mb-0">{viewCms?.title}</p>
                          </td>
                        </tr>
                        <tr>
                          <th>Type</th>
                          <td>
                            <p className="mb-0">{pageType(viewCms?.typeId)}</p>
                          </td>
                        </tr>
                        <tr>
                          <th>Description</th>
                          <td>
                            <p
                              className="mb-0"
                              dangerouslySetInnerHTML={{
                                __html: viewCms?.description,
                              }}
                            ></p>
                          </td>
                        </tr>
                        <tr>
                          <th>Created On </th>
                          <td>
                            <p className="mb-0">
                              {moment(viewCms?.createdAt).format("LLL")}
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <th>Status</th>
                          <td>
                            <p className="mb-0">
                              {checkAdminState(viewCms?.stateId)}
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
  
  export default ViewCms;
  