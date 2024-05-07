

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import React, { useState } from "react";
import { Container, Table } from "react-bootstrap";
import { FaEye, FaPencilAlt, FaUserAlt, FaUserAltSlash } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDebounceEffect } from "../../../hooks/useDebounceEffect";
import useSlider from "../../../hooks/useSlider";
import { adminBrandList, adminBrandStatus } from "../../../services/services";
import { toastAlert } from "../../../utils/SweetAlert";
import { checkAdminState } from "../../../utils/checkAdminState";
import { constant } from "../../../utils/constants";
import Sidebar from "../../sidebar/Sidebar";
import AdminFooter from "../AdminFooter";

const BrandList = () => {
  const isSlider = useSlider();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [pagination, setPagination] = useState({
    state: "",
    search: "",
    pageNo: constant.PAGE_NO_ONE,
    pageLimit: constant.PER_PAGE_TEN,
  });
  const debouncedSearch = useDebounceEffect(pagination?.search.trim(), 1000);

  const { data: brandList } = useQuery({
    queryKey: [
      "brandList",
      {
        state: pagination.state,
        search: debouncedSearch,
        page: pagination.pageNo,
        limit: pagination.pageLimit,
      },
    ],
    queryFn: async ({ queryKey }) => {
      const [_key, query] = queryKey;
      const resp = await adminBrandList(query);
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

  const handleToggleState = (id, state) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to update the status !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#000",
        cancelButtonColor: "#d33",
        confirmButtonText:
          state == constant.ACTIVE ? "Yes,Active it !" : "Yes, Inactive it !",
      }).then(async (result) => {
        if (result.isConfirmed) {
          stateMutation?.mutate({ id, state });
        }
      });
    } catch (error) {
      console.error("error", error);
    }
  };

  const stateMutation = useMutation({
    mutationFn: (value) => adminBrandStatus(value?.id, { state: value?.state }),
    onSuccess: (resp) => {
      toastAlert("success", "Brand updated successfully");
      queryClient.invalidateQueries({ queryKey: ["brandList"] });
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
              / Brand
            </h2>
            <div className=" d-flex align-items-center gap-3 my-2 mx-1">
              <input
                type="text"
                placeholder="Search"
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
                <option value={constant.ACTIVE}>Active</option>
                <option value={constant.INACTIVE}>In-Active</option>
                <option value={constant.DELETE}>Delete</option>
              </select>
              <button
                type="button"
                className="theme-btn btn-md"
                onClick={() => {
                  navigate(`/admin/add-brand`);
                }}
              >
                Create
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
                      <th>Icon</th>
                      <th>Brand</th>
                      <th>Created On</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {brandList?.length > 0 ? (
                      brandList?.map((data, index) => {
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
                                      data?.icon
                                        ? import.meta.env.VITE_IMAGE_URL +
                                          data?.icon
                                        : "/images/default.jpg"
                                    }
                                  />
                                </span>
                              </div>
                            </td>
                            <td>{data?.brand}</td>
                            <td>{moment(data?.createdAt).format("LLL")}</td>
                            <td>{checkAdminState(data?.stateId)}</td>
                            <td>
                              <div className="action-btn">
                                <button
                                  title="View"
                                  onClick={() =>
                                    navigate(`/admin/view-brand/${data?._id}`)
                                  }
                                  className="btn-small style-one"
                                >
                                  <FaEye />
                                </button>
                                <button
                                  title="Update"
                                  onClick={() =>
                                    navigate(`/admin/edit-brand/${data?._id}`)
                                  }
                                  className="btn-small style-six"
                                >
                                  <FaPencilAlt />
                                </button>
                                {data.stateId === constant.ACTIVE ? (
                                  <button
                                    className="btn-small style-five"
                                    title="Inactive"
                                    onClick={() =>
                                      handleToggleState(
                                        data._id,
                                        constant.INACTIVE
                                      )
                                    }
                                  >
                                    <FaUserAltSlash />
                                  </button>
                                ) : (
                                  <button
                                    className="btn-small style-five"
                                    title="Active"
                                    onClick={() =>
                                      handleToggleState(
                                        data._id,
                                        constant.ACTIVE
                                      )
                                    }
                                  >
                                    <FaUserAlt />
                                  </button>
                                )}
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

export default BrandList;
