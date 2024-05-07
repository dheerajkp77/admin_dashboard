
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import React, { useState } from "react";
import { Badge, Container, Table } from "react-bootstrap";
import { FaEye } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { Link, useNavigate } from "react-router-dom";
import { useDebounceEffect } from "../../../hooks/useDebounceEffect";
import useSlider from "../../../hooks/useSlider";
import { adminRequest } from "../../../services/services";
import { constant } from "../../../utils/constants";
import Sidebar from "../../sidebar/Sidebar";
import AdminFooter from "../AdminFooter";

const OrderRequest = () => {
  const isSlider = useSlider();
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({
    pageNo: constant.PAGE_NO_ONE,
    pageLimit: constant.PER_PAGE_TEN,
    state: "",
    search: "",
  });
  const debouncedSearch = useDebounceEffect(pagination?.search.trim(), 1000);

  const { data: requestList } = useQuery({
    queryKey: [
      "request-list",
      {
        page: pagination.pageNo,
        limit: pagination.pageLimit,
        state: pagination.state,
        search: debouncedSearch,
      },
    ],
    queryFn: async ({ queryKey }) => {
      const [_key, query] = queryKey;
      const resp = await adminRequest(query);
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
              / Order Request
            </h2>
            <div className=" d-flex align-items-center gap-3 my-2 mx-1">
              {/* <input
                type="text"
                placeholder="Search"
                value={pagination.search}
                onChange={handleSearchChange}
                className="form-control"
                style={{ width: "250px" }}
              /> */}
              <select
                value={pagination.state}
                onChange={handleStateFilterChange}
                className="form-control form-select"
              >
                <option value="">All Status</option>
                <option value={constant.REQUESTED}>Requested</option>
                <option value={constant.ACCEPTED}>Accepted</option>
                <option value={constant.REJECTED}>Rejected</option>
                <option value={constant.AUTO_REJECTED}>Auto Rejected</option>
                <option value={constant.CANCELED}>Cancelled</option>
              </select>
            </div>
          </div>

          <section className="inner-wrap">
            <Container fluid className="px-0">
              <div className="custom-card">
                <Table striped responsive>
                  <thead>
                    <tr>
                      <th>Sn.</th>
                      <th>Booked By</th>
                      <th>Email</th>
                      <th>Size</th>
                      <th>Quantity</th>
                      <th>Amount</th>
                      <th>Created On</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requestList?.length > 0 ? (
                      requestList?.map((data, index) => {
                        const serialNumber =
                          index +
                          1 +
                          (pagination.pageNo - 1) * pagination.pageLimit;
                        return (
                          <tr key={index}>
                            <th scope="row">{serialNumber}</th>
                            <td>{`${data?.profileRecord?.firstName} ${data?.profileRecord?.lastName}`}</td>
                            <td>{data?.profileRecord?.email}</td>
                            <td>{data?.size}</td>
                            <td>{data?.quantity}</td>
                            <td>${data?.amount}</td>
                            <td>{moment(data?.createdAt).format("LLL")}</td>
                            <td>
                              <Badge
                                bg={badgeColor[data?.stateId] ?? "warning"}
                              >
                                {stateId[data?.stateId] ?? "NA"}
                              </Badge>
                            </td>
                            <td>
                              <div className="action-btn">
                                <button
                                  title="View"
                                  onClick={() =>
                                    navigate(`./${data?._id}`)
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

export default OrderRequest;
