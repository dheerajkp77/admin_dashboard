
import React, { useState } from "react";
import { Badge, Container, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import useSlider from "../../../hooks/useSlider";
import Sidebar from "../../sidebar/Sidebar";
import AdminFooter from "../AdminFooter";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { constant } from "../../../utils/constants";
import { loginActivityList, loginAllDelete } from "../../../services/services";
import Swal from "sweetalert2";
import { toastAlert } from "../../../utils/SweetAlert";
import moment from "moment";
import { FaEye } from "react-icons/fa";
import ReactPaginate from "react-paginate";

const LoginActivity = () => {
  const isSlider = useSlider();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const [pagination, setPagination] = useState({
    pageNo: constant.PAGE_NO_ONE,
    pageLimit: constant.PER_PAGE_TEN,
  });

  const { data: loginList } = useQuery({
    queryKey: [
      "login-Activity",
      {
        page: pagination.pageNo,
        limit: pagination.pageLimit,
      },
    ],
    queryFn: async ({ queryKey }) => {
      const [_key, query] = queryKey;
      const resp = await loginActivityList(query);
      const { _meta, data } = resp?.data ?? {};
      setPagination((prevPagination) => ({
        ...prevPagination,
        totalCount: _meta?.totalCount,
        pageNo: _meta?.currentPage ?? prevPagination.pageNo,
        pageLimit: _meta?.perPage ?? prevPagination.pageLimit,
      }));
      return data;
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

  const handleDeleteAll = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete all the login activity!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#394795",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete It!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate();
      }
    });
  };
  const deleteMutation = useMutation({
    mutationFn: () => loginAllDelete(),
    onSuccess: (resp) => {
      toastAlert("success", resp?.data?.message);
      queryClient.invalidateQueries({ queryKey: ["login-Activity"] });
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
              </Link>{" "}
              / Login Activity
            </h2>
            <div className=" d-flex align-items-center my-2 mx-1">
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  handleDeleteAll();
                }}
              >
                Delete All
              </button>
            </div>
          </div>
          <section className="inner-wrap">
            <Container fluid className="px-0">
              <div className="custom-card">
                <Table striped responsive>
                  <thead>
                    <tr>
                      <th>Sn.</th>
                      <th>Id</th>
                      <th>User IP</th>
                      <th>Login</th>
                      <th>Created On</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loginList?.length > 0 ? (
                      loginList?.map((data, index) => {
                        const serialNumber =
                          index +
                          1 +
                          (pagination.pageNo - 1) * pagination.pageLimit;
                        return (
                          <tr key={index}>
                            <th scope="row">{serialNumber}</th>
                            <td>{data?._id}</td>
                            <td>{data?.userIP}</td>
                            <td>{moment(data?.loginAt).format("LL")}</td>
                            <td>{moment(data?.createdAt).format("LLL")}</td>
                            <td>{statusHandler(data?.state)}</td>
                            <td>
                              <div className="action-btn">
                                <button
                                  title="View"
                                  onClick={() =>
                                    navigate(
                                      `/admin/view-login-activity/${data?._id}`
                                    )
                                  }
                                  className="btn-small style-one"
                                >
                                  <FaEye />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="10" className="text-center">
                          Data Not Found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
                {Math.ceil(pagination.totalCount / constant.PER_PAGE_TEN) >
                  1 && (
                  <div>
                    <ReactPaginate
                      containerClassName={
                        "pagination position-relative mt-2 pt-3"
                      }
                      previousLinkClassName={"pagination__link"}
                      nextLinkClassName={"pagination__link"}
                      disabledClassName={"pagination__link--disabled"}
                      activeClassName={"pagination__link--active"}
                      previousLabel={"Prev"}
                      nextLabel={"Next"}
                      onPageChange={(props) => {
                        setPagination({
                          ...pagination,
                          pageNo: props.selected + 1,
                        });
                      }}
                      pageCount={Math.ceil(
                        pagination.totalCount / constant.PER_PAGE_TEN
                      )}
                    />
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

export default LoginActivity;
