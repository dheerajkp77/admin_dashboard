
import React, { useState } from "react";
import { Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import useSlider from "../../../hooks/useSlider";
import Sidebar from "../../sidebar/Sidebar";
import AdminFooter from "../AdminFooter";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { constant } from "../../../utils/constants";
import { errorLogList, logAllDelete, logSingleDelete } from "../../../services/services";
import Swal from "sweetalert2";
import { toastAlert } from "../../../utils/SweetAlert";
import moment from "moment";
import { FaTrash } from "react-icons/fa";
import ReactPaginate from "react-paginate";

const ErrorLogs = () => {
  const isSlider = useSlider();
  const queryClient = useQueryClient();
  const [pagination, setPagination] = useState({
    pageNo: constant.PAGE_NO_ONE,
    pageLimit: constant.PER_PAGE_TEN,
  });

  const { data: errorList } = useQuery({
    queryKey: [
      "errorLogs",
      {
        page: pagination.pageNo,
        limit: pagination.pageLimit,
      },
    ],
    queryFn: async ({ queryKey }) => {
      const [_key, query] = queryKey;
      const resp = await errorLogList(query);
      const { _meta, data } = resp?.data ?? {};
      setPagination((prevPagination) => ({
        ...prevPagination,
        totalErrorLogs: _meta?.totalErrorLogs,
        pageNo: _meta?.currentPage ?? prevPagination.pageNo,
        pageLimit: _meta?.perPage ?? prevPagination.pageLimit,
        totalPage: _meta?.pageCount,
      }));
      return data;
    },
  });

  const handleSingleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete the error log!",
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
    mutationFn: (payload) => logSingleDelete(payload),
    onSuccess: (resp) => {
      toastAlert("success", resp?.data?.message);
      queryClient.invalidateQueries({ queryKey: ["errorLogs"] });
    },
  });

  const handleAllDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete all the error logs!",
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
    mutationFn: () => logAllDelete(),
    onSuccess: (resp) => {
      toastAlert("success", resp?.data?.message);
      queryClient.invalidateQueries({ queryKey: ["errorLogs"] });
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
              / Error Logs
            </h2>
            <button
              type="button"
              className="btn btn-danger"
              disabled={errorList?.length === 0}
              onClick={() => {
                handleAllDelete();
              }}
            >
              Delete All
            </button>
          </div>
          <section className="inner-wrap">
            <Container fluid className="px-0">
              <div className="custom-card">
                <Table striped responsive>
                  <thead>
                    <tr>
                      <th>Sn.</th>
                      <th>Error ID</th>
                      <th>Error Ip</th>
                      <th>Error Code</th>
                      <th>Error Name</th>
                      <th>Created On</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {errorList?.length > 0 ? (
                      errorList?.map((data, index) => {
                        const serialNumber =
                          index +
                          1 +
                          (pagination.pageNo - 1) * pagination.pageLimit;
                        return (
                          <tr key={index}>
                            <th scope="row">{serialNumber}.</th>
                            <td>
                              <b>{data?._id}</b>
                            </td>
                            <td>{data?.ip}</td>
                            <td>{data?.errorCode}</td>
                            <td>{data?.errorName}</td>
                            <td>{moment(data?.createdAt).format("LLL")}</td>
                            <td>
                              <div className="action-btn">
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
                {pagination?.totalPage > 1 && (
                  <div>
                    <ReactPaginate
                      containerClassName={"pagination  mt-2 pt-3"}
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
                      pageCount={Math.ceil(pagination?.totalPage)}
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
export default ErrorLogs;
