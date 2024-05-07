
import { useMutation, useQuery } from "@tanstack/react-query";
import moment from "moment";
import React from "react";
import { Badge, Col, Container, Row, Table } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import useSlider from "../../../hooks/useSlider";
import {
  adminRequestApprove,
  adminRequestReject,
  adminRequestView,
} from "../../../services/services";
import { toastAlert } from "../../../utils/SweetAlert";
import { constant } from "../../../utils/constants";
import Sidebar from "../../sidebar/Sidebar";
import AdminFooter from "../AdminFooter";

const ViewOrderRequest = () => {
  const isSlider = useSlider();
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: requestView, refetch } = useQuery({
    queryKey: ["booking-request-details", id],
    queryFn: async () => {
      const res = await adminRequestView(id);
      return res.data?.data;
    },
  });

  const approveMutate = useMutation({
    mutationFn: () =>
      adminRequestApprove({
        bookingRequestedId: id,
      }),
    onSuccess: (resp) => {
      toastAlert("success", resp?.data?.message);
      refetch();
    },
  });

  const rejectMutate = useMutation({
    mutationFn: () =>
      adminRequestReject({
        bookingRequestedId: id,
      }),
    onSuccess: (resp) => {
      toastAlert("success", resp?.data?.message);
      refetch();
    },
  });

  const stateId = {
    1: "Requested",
    2: "Accepted",
    3: "Rejected",
    4: "Auto Rejected",
    5: "Cancelled",
  };

  const badgeColor = {
    1: "primary",
    2: "success",
    3: "danger",
    4: "danger",
    5: "danger",
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
              / Booking request details
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
                          requestView?.profileRecord?.profileImg
                            ? import.meta.env.VITE_IMAGE_URL +
                              requestView?.profileRecord?.profileImg
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
                          <th>Front Design</th>
                          <td>
                            <a
                              href={requestView?.frontImage}
                              download={`front-${Date.now()}.png`}
                            >
                              <img src={requestView?.frontImage} />
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <th>Back Design</th>
                          <td>
                            <a
                              href={requestView?.backImage}
                              download={`back-${Date.now()}.png`}
                            >
                              <img src={requestView?.backImage} />
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <th>Full Name</th>
                          <td>
                            <p className="mb-0">{`${requestView?.profileRecord?.firstName} ${requestView?.profileRecord?.lastName}`}</p>
                          </td>
                        </tr>
                        <tr>
                          <th>Email</th>
                          <td>
                            <p className="mb-0">
                              {requestView?.profileRecord?.email}
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <th>Size</th>
                          <td>
                            <p className="mb-0">{requestView?.size}</p>
                          </td>
                        </tr>
                        <tr>
                          <th>Quantity</th>
                          <td>
                            <p className="mb-0">{requestView?.quantity}</p>
                          </td>
                        </tr>
                        <tr>
                          <th>Amount</th>
                          <td>
                            <p className="mb-0">${requestView?.amount}</p>
                          </td>
                        </tr>

                        <tr>
                          <th>Created On </th>
                          <td>
                            <p className="mb-0">
                              {moment(requestView?.createdAt).format("LLL")}
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <th>Status</th>
                          <td>
                            <Badge
                              bg={badgeColor[requestView?.stateId] ?? "warning"}
                            >
                              {stateId[requestView?.stateId] ?? "NA"}
                            </Badge>
                          </td>
                        </tr>
                        {requestView?.state === constant.BLOCK ? (
                          <tr>
                            <th>Block Reason</th>
                            <td>
                              <p className="mb-0">{requestView?.banReason}</p>
                            </td>
                          </tr>
                        ) : (
                          ""
                        )}
                      </tbody>
                    </Table>
                  </Col>
                </Row>
                {requestView?.stateId == constant.REQUESTED && (
                  <div className="text-end mt-4">
                    <button
                      className="theme-btn btn-md m-2"
                      type="submit"
                      onClick={() => {
                        approveMutate.mutate();
                      }}
                    >
                      Approve
                    </button>
                    <button
                      className="theme-btn btn-md mb-2"
                      type="submit"
                      onClick={() => {
                        rejectMutate.mutate();
                      }}
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </Container>
          </section>
        </div>
        <AdminFooter />
      </div>
    </>
  );
};

export default ViewOrderRequest;
