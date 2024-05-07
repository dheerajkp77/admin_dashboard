
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import React from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import useSlider from "../../../hooks/useSlider";
import { adminUserUpdate, adminUserView } from "../../../services/services";
import { checkAdminState } from "../../../utils/checkAdminState";
import { constant } from "../../../utils/constants";
import Sidebar from "../../sidebar/Sidebar";
import AdminFooter from "../AdminFooter";
import { toastAlert } from "../../../utils/SweetAlert";

const UserView = () => {
  const isSlider = useSlider();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: userView } = useQuery({
    queryKey: ["userView", { id }],
    queryFn: async () => {
      const res = await adminUserView(id);
      return res.data?.data;
    },
  });

  const editMutate = useMutation({
    mutationFn: (payload) => adminUserUpdate(id, { state: payload?.state }),
    onSuccess: (resp) => {
      toastAlert("success", resp?.data?.message);
      queryClient.invalidateQueries({ queryKey: ["userView"] });
      // navigate(`/admin/user-list`);
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
              / User Details
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
                          userView?.profileImgId
                            ? import.meta.env.VITE_IMAGE_URL +
                              userView?.profileImgId
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
                          <th>Full Name</th>
                          <td>
                            <p className="mb-0">{userView?.fullName}</p>
                          </td>
                        </tr>
                        <tr>
                          <th>Email</th>
                          <td>
                            <p className="mb-0">{userView?.email}</p>
                          </td>
                        </tr>
                        <tr>
                          <th>Created On </th>
                          <td>
                            <p className="mb-0">
                              {moment(userView?.createdAt).format("LLL")}
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <th>Status</th>
                          <td>
                            <p className="mb-0">
                              {checkAdminState(userView?.state)}
                            </p>
                          </td>
                        </tr>
                        {userView?.state === constant.BLOCK ? (
                          <tr>
                            <th>Block Reason</th>
                            <td>
                              <p className="mb-0">{userView?.banReason}</p>
                            </td>
                          </tr>
                        ) : (
                          ""
                        )}
                      </tbody>
                    </Table>
                  </Col>
                </Row>
                {userView?.state === constant.INACTIVE || userView?.state === constant.BLOCK ? (
                  <div className="text-end mt-4">
                    <button
                      className="theme-btn btn-md mb-2"
                      type="submit"
                      onClick={() => {
                        editMutate.mutate({
                          state: constant.ACTIVE,
                        });
                      }}
                    >
                      Active
                    </button>
                  </div>
                ) : (
                  <div className="text-end mt-4">
                    <button
                      className="theme-btn btn-md mb-2"
                      type="submit"
                      onClick={() => {
                        editMutate.mutate({
                          state: constant.INACTIVE,
                        });
                      }}
                    >
                      In-Active
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

export default UserView;
