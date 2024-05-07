
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import React, { useState } from "react";
import { Container, Table, Form } from "react-bootstrap";
import { FaBan, FaEye } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { Link, useNavigate } from "react-router-dom";
import { useDebounceEffect } from "../../../hooks/useDebounceEffect";
import useSlider from "../../../hooks/useSlider";
import { adminUserList, adminUserUpdate } from "../../../services/services";
import { toastAlert } from "../../../utils/SweetAlert";
import { checkAdminState } from "../../../utils/checkAdminState";
import { constant } from "../../../utils/constants";
import Sidebar from "../../sidebar/Sidebar";
import AdminFooter from "../AdminFooter";

const UserList = () => {
  const isSlider = useSlider();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [pagination, setPagination] = useState({
    pageNo: constant.PAGE_NO_ONE,
    pageLimit: constant.PER_PAGE_TEN,
    roleId: constant.USER,
    state: "",
    search: "",
  });
  const debouncedSearch = useDebounceEffect(pagination?.search.trim(), 1000);

  const { data: userList } = useQuery({
    queryKey: [
      "userList",
      {
        page: pagination.pageNo,
        limit: pagination.pageLimit,
        roleId: pagination.roleId,
        state: pagination.state,
        search: debouncedSearch,
      },
    ],

    queryFn: async ({ queryKey }) => {
      const [_key, query] = queryKey;
      const resp = await adminUserList(query);
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

  const editMutate = useMutation({
    mutationFn: ({ id, state }) => adminUserUpdate(id, { state }),
    onSuccess: (resp) => {
      toastAlert("success", resp?.data?.message);
      queryClient.invalidateQueries({ queryKey: ["userList"] });
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
              / Users
            </h2>
            
            <div className=" d-flex align-items-center gap-3 my-2 mx-1">
              <input
                type="text"
                placeholder="Search by Email"
                value={pagination.search}
                onChange={handleSearchChange}
                className="form-control"
                style={{ width: "250px" }}
              />

              <Form.Select
                as="select"
                value={pagination.state}
                onChange={handleStateFilterChange}
                className="form-control"
              >
                <option value="">All Status</option>
                <option value={constant.ACTIVE}>Active</option>
                <option value={constant.INACTIVE}>In-Active</option>
                <option value={constant.BLOCK}>Block</option>
              </Form.Select>
            </div>
          </div>

          <section className="inner-wrap">
            <Container fluid className="px-0">
              <div className="custom-card">
                <Table striped responsive>
                  <thead>
                    <tr>
                      <th>Sn.</th>
                      <th>Profile</th>
                      <th>Full Name</th>
                      <th>Email</th>
                      <th>Created On</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userList?.length > 0 ? (
                      userList?.map((data, index) => {
                        const serialNumber =
                          index +
                          1 +
                          (pagination.pageNo - 1) * pagination.pageLimit;
                        return (
                          <tr key={index}>
                            <th scope="row">{serialNumber}</th>
                            <td>
                              <div className="table-user d-flex align-items-center">
                                <span className="table-user-icon">
                                  <img
                                    src={
                                      data?.profileImg
                                        ? import.meta.env.VITE_IMAGE_URL +
                                          data?.profileImg
                                        : "/images/default.jpg"
                                    }
                                  />
                                </span>
                              </div>
                            </td>
                            <td>{data?.fullName}</td>
                            <td>{data?.email}</td>
                            <td>{moment(data?.createdAt).format("LLL")}</td>
                            <td>{checkAdminState(data?.state)}</td>
                            <td>
                              <div className="action-btn">
                                <button
                                  title="View"
                                  onClick={() =>
                                    navigate(`/admin/view-user/${data?._id}`)
                                  }
                                  className="btn-small style-one"
                                >
                                  <FaEye />
                                </button>

                                <button
                                  className="btn btn-danger btn-small"
                                  type="submit"
                                  disabled={data?.state === constant.BLOCK}
                                  title="Block"
                                  onClick={() => {
                                    editMutate.mutate({
                                      id: data._id,
                                      state: constant.BLOCK,
                                    });
                                  }}
                                >
                                  <FaBan />
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
export default UserList;
