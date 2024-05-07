
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import moment from "moment";
import React, { useState } from "react";
import { Col, Container, Form, Modal, Row, Table } from "react-bootstrap";
import { FaBan, FaEye } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useDebounceEffect } from "../../../hooks/useDebounceEffect";
import useSlider from "../../../hooks/useSlider";
import {
  adminUserBan,
  adminUserList
} from "../../../services/services";
import { toastAlert } from "../../../utils/SweetAlert";
import { checkAdminState } from "../../../utils/checkAdminState";
import { constant } from "../../../utils/constants";
import Sidebar from "../../sidebar/Sidebar";
import AdminFooter from "../AdminFooter";

const ShopperList = () => {
  const isSlider = useSlider();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [id, setId] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (ids) => {
    setId(ids);
    setShow(true);
  };

  const [pagination, setPagination] = useState({
    pageNo: constant.PAGE_NO_ONE,
    pageLimit: constant.PER_PAGE_TEN,
    roleId: constant.SHOPPER,
    state: "",
    search: "",
  });
  const debouncedSearch = useDebounceEffect(pagination?.search.trim(), 1000);

  const { data: shopperList } = useQuery({
    queryKey: [
      "shopperList",
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

  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    touched,
    errors,
    resetForm,
  } = useFormik({
    initialValues: {
      banReason: "",
    },
    validationSchema: yup.object().shape({
      banReason: yup.string().label("Reason").required().trim(),
    }),
    onSubmit: async function (values) {
      shopperBanMutation.mutate(values);
    },
  });

  const shopperBanMutation = useMutation({
    mutationFn: (body) => adminUserBan(id, body),
    onSuccess: (resp) => {
      toastAlert("success", "Shopper Blocked successfully");
      handleClose();
      resetForm();
      queryClient.invalidateQueries({ queryKey: ["shopperList"] });
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
              / Shopper Management
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
                <option value={constant.INACTIVE}>In-Active</option>
                <option value={constant.BLOCK}>Block</option>
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
                      <th>Profile</th>
                      <th>Full Name</th>
                      <th>Email</th>
                      <th>Mobile Number</th>
                      <th>Created On</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shopperList?.length > 0 ? (
                      shopperList?.map((data, index) => {
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
                                      data?.profileImgId
                                        ? import.meta.env.VITE_IMAGE_URL +
                                          data?.profileImgId
                                        : "/images/default.jpg"
                                    }
                                  />
                                </span>
                              </div>
                            </td>
                            <td>{data?.fullName}</td>
                            <td>{data?.email}</td>
                            <td>
                              {data?.countryCode} {data?.mobile}
                            </td>
                            <td>{moment(data?.createdAt).format("LLL")}</td>
                            <td>{checkAdminState(data?.state)}</td>
                            <td>
                              <div className="action-btn">
                                <button
                                  title="View"
                                  onClick={() =>
                                    navigate(`/admin/view-shopper/${data?._id}`)
                                  }
                                  className="btn-small style-one"
                                >
                                  <FaEye />
                                </button>
                               
                                <button
                                  title="Block"
                                  className="btn btn-danger btn-small"
                                  disabled={data?.state === constant.BLOCK}
                                  onClick={() => {
                                    handleShow(data?._id);
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

        <Modal
          className="feature-modal"
          show={show}
          onHide={handleClose}
          centered
        >
          <Modal.Header className="border-0" closeButton>
            <Modal.Title>Blocked</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col lg={12}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bolder">
                    Reason<span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="banReason"
                    placeholder="Enter reason"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    maxLength={50}
                    value={values?.banReason}
                  />
                  <span className="text-danger">
                    {touched?.banReason && errors?.banReason}
                  </span>
                </Form.Group>
              </Col>

              <div className="text-center mt-4">
                <button
                  className="mt-3 theme-btn btn-md"
                  type="button"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </Row>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default ShopperList;
