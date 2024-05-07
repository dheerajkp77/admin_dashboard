
import React, { useState } from "react";
import { Badge, Container, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import useSlider from "../../../hooks/useSlider";
import Sidebar from "../../sidebar/Sidebar";
import AdminFooter from "../AdminFooter";
import ReactPaginate from "react-paginate";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { constant } from "../../../utils/constants";
import { useDebounceEffect } from "../../../hooks/useDebounceEffect";
import {
  emailAllDelete,
  emailQueueList,
  emailSingleDelete,
} from "../../../services/services";
import Swal from "sweetalert2";
import { toastAlert } from "../../../utils/SweetAlert";
import moment from "moment";
import { FaEye, FaTrash } from "react-icons/fa";

const EmailQueue = () => {
  const isSlider = useSlider();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [pagination, setPagination] = useState({
    state: "",
    search: "",
    pageNo: constant.PAGE_NO_ONE,
    pageLimit: constant.PER_PAGE_TEN,
  });
  const debouncedSearch = useDebounceEffect(pagination?.search, 1000);

  const { data: emailList } = useQuery({
    queryKey: [
      "emailQueue",
      {
        state: pagination.state,
        search: debouncedSearch,
        page: pagination.pageNo,
        limit: pagination.pageLimit,
      },
    ],
    queryFn: async ({ queryKey }) => {
      const [_key, query] = queryKey;
      const resp = await emailQueueList(query);
      const { _meta } = resp?.data ?? {};
      setPagination((prevPagination) => ({
        ...prevPagination,
        totalCount: _meta?.totalCount,
        pageNo: _meta?.currentPage ?? prevPagination.pageNo,
        pageLimit: _meta?.perPage ?? prevPagination.pageLimit,
      }));
      return resp?.data?.data;
    },
  });

  const handleSearchChange = (e) => {
    setPagination({
      ...pagination,
      search: e.target.value,
      pageNo: 1,
    });
  };
  const handleStateFilterChange = (e) => {
    setPagination({
      ...pagination,
      state: e.target.value,
      pageNo: 1, // Reset page number to 1 when state filter changes
    });
  };

  const StatusHandler = (stateId) => {
    if (stateId == constant.EMAIL_SUCCESS) {
      return <Badge bg="success">Success</Badge>;
    } else if (stateId == constant.EMAIL_FAILED) {
      return <Badge bg="warning">Failed</Badge>;
    } else if (stateId == constant.EMAIL_PENDING) {
      return <Badge bg="info">Pending</Badge>;
    } else {
      return "N/A";
    }
  };

  const handleAllDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete all the email queues!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#394795",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete It!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(); // Call the mutate function to delete all error logs
      }
    });
  };

  const deleteMutation = useMutation({
    mutationFn: () => emailAllDelete(),
    onSuccess: (resp) => {
      // Success actions
      toastAlert("success", resp?.data?.message);
      queryClient.invalidateQueries({ queryKey: ["emailQueue"] });
    },
  });

  const handleSingleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete the email queue!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#394795",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        mutate(id);
      }
    });
  };

  const { mutate } = useMutation({
    mutationFn: (payload) => emailSingleDelete(payload),
    onSuccess: (resp) => {
      // Success actions
      toastAlert("success", resp?.data?.message);
      queryClient.invalidateQueries({ queryKey: ["emailQueue"] });
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
              / Email Queue
            </h2>
            <div className=" d-flex align-items-center gap-3 my-2 mx-1">
              <input
                type="text"
                placeholder="Search With To"
                value={pagination.search.trim()}
                onChange={handleSearchChange}
                className="form-control"
                style={{ width: "250px" }}
              />

              <select
                value={pagination.state}
                onChange={handleStateFilterChange}
                className="form-control form-select"
              >
                <option value="">All Status</option>
                <option value={constant.EMAIL_SUCCESS}>Success</option>
                <option value={constant.EMAIL_FAILED}>Failed</option>
              </select>
              <button
                type="button"
                disabled={emailList?.length === 0}
                onClick={() => {
                  handleAllDelete();
                }}
                className="btn btn-danger email_btn w-100"
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
                      <th>From</th>
                      <th>To</th>
                      <th>Subject</th>
                      <th>Created On</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {emailList?.length > 0 ? (
                      emailList?.map((data, index) => {
                        const serialNumber =
                          index +
                          1 +
                          (pagination.pageNo - 1) * pagination.pageLimit;
                        return (
                          <tr key={index}>
                            <th scope="row">{serialNumber}.</th>
                            <td>{data?.from}</td>
                            <td>{data?.to}</td>
                            <td>{data?.subject}</td>
                            <td>{moment(data?.createdAt).format("LLL")}</td>
                            <td>{StatusHandler(data?.stateId)}</td>
                            <td>
                              <div className="action-btn">
                                <button
                                  title="View"
                                  onClick={() =>
                                    navigate(`/admin/email-view/${data?._id}`)
                                  }
                                  className="btn-small style-one"
                                >
                                  <FaEye />
                                </button>
                                <button
                                  title="Delete"
                                  className="btn btn-danger btn-small"
                                  onClick={() => {
                                    handleSingleDelete(data?._id);
                                  }}
                                >
                                  <FaTrash />
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

export default EmailQueue;
