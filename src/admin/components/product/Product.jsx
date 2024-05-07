import { useMutation, useQuery } from "@tanstack/react-query";
import moment from "moment";
import React, { useState } from "react";
import { Badge, Container, Table } from "react-bootstrap";
import { FaBan, FaCheck, FaEye, FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import ReactPaginate from "react-paginate";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDebounceEffect } from "../../../hooks/useDebounceEffect";
import useSlider from "../../../hooks/useSlider";
import {
  adminDeleteProduct,
  adminProductList,
  adminUpdateStateProduct
} from "../../../services/services";
import { toastAlert } from "../../../utils/SweetAlert";
import { constant } from "../../../utils/constants";
import Sidebar from "../../sidebar/Sidebar";
import AdminFooter from "../AdminFooter";

const Product = () => {
  const isSlider = useSlider();
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({
    pageNo: constant.PAGE_NO_ONE,
    pageLimit: constant.PER_PAGE_TEN,
    state: "",
    search: "",
  });
  const debouncedSearch = useDebounceEffect(pagination?.search.trim(), 1000);

  const { data: productList, refetch } = useQuery({
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
      const resp = await adminProductList(query);
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
    1: "Active",
    2: "Inactive",
    3: "Deleted",
  };

  const badgeColor = {
    1: "success",
    2: "primary",
    3: "danger",
  };

  const category = {
    0: "Male",
    1: "Female",
    2: "Unisexual",
  };

  const deleteMutate = useMutation({
    mutationFn: (id) => adminDeleteProduct(id),
    onSuccess: (resp) => {
      toastAlert("success", resp?.data?.message);
      refetch();
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this cms!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#378ce7",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        deleteMutate?.mutate(id);
      }
    });
  };

  const stateMutation = useMutation({
    mutationFn: (body) =>
      adminUpdateStateProduct(body?.id, { stateId: body?.state }),
    onSuccess: (resp) => {
      toastAlert("success", resp?.data?.message);
      refetch();
    },
  });

  const handleToggleState = (id, state) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to update the status !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#378ce7",
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
              / Product Management
            </h2>
            <div className=" d-flex align-items-center gap-3 my-2 mx-1">
              <input
                type="text"
                placeholder="Search"
                value={pagination.search}
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
                <option value={constant.INACTIVE}>Inactive</option>
                <option value={constant.DELETE}>Deleted</option>
              </select>
              <Link
                type="button"
                className="btn btn-primary"
                to="../add-product"
              >
                Add
              </Link>
            </div>
          </div>

          <section className="inner-wrap">
            <Container fluid className="px-0">
              <div className="custom-card">
                <Table striped responsive>
                  <thead>
                    <tr>
                      <th>Sn.</th>
                      <th>Title</th>
                      <th>Image</th>
                      <th>Category</th>
                      <th>T-shirt Type</th>
                      <th>Material</th>
                      <th>Size</th>
                      <th>Price</th>
                      <th>Created On</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productList?.length > 0 ? (
                      productList?.map((data, index) => {
                        const serialNumber =
                          index +
                          1 +
                          (pagination.pageNo - 1) * pagination.pageLimit;
                        return (
                          <tr key={index}>
                            <th scope="row">{serialNumber}</th>
                            <td>{data?.title}</td>
                            <td>
                              <div className="table-img">
                                <img
                                  src={
                                    import.meta.env.VITE_IMAGE_URL +
                                    data?.images?.at(0)
                                  }
                                  onError={({ currentTarget }) => {
                                    currentTarget.onerror = null; // prevents looping
                                    currentTarget.src =
                                      "/images/default_banner.png";
                                  }}
                                />
                              </div>
                            </td>
                            <td>{category[data?.category] ?? "NA"}</td>
                            <td>{data?.type}</td>
                            <td>{data?.material}</td>
                            <td>{data?.size?.toString()}</td>
                            <td>${data?.price}</td>
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
                                  onClick={() => navigate(`./${data?._id}`)}
                                  className="btn-small style-one"
                                >
                                  <FaEye />
                                </button>
                                <button
                                  title="Edit"
                                  onClick={() =>
                                    navigate(`../add-product/${data?._id}`)
                                  }
                                  className="btn-small style-three"
                                >
                                  <FaPencil />
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
                                    <FaBan />
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
                                    <FaCheck />
                                  </button>
                                )}
                                <button
                                  title="Delete"
                                  onClick={() => handleDelete(data?._id)}
                                  className="btn-small style-two"
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
                        <td colSpan="12" className="text-center">
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

export default Product;
