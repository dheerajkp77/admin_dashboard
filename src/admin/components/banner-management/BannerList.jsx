import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import moment from "moment";
import React, { useRef, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { useDebounceEffect } from "../../../hooks/useDebounceEffect";
import useSlider from "../../../hooks/useSlider";
import {
  addBannerAdmin,
  adminBannerList,
  bannerDetailAdmin,
  deleteBannerAdmin,
  editBannerAdmin,
} from "../../../services/services";
import { checkAdminState } from "../../../utils/checkAdminState";
import { constant } from "../../../utils/constants";
import Sidebar from "../../sidebar/Sidebar";
import "./banner.scss";

const BannerList = () => {
  const imgRef = useRef();
  const isSlider = useSlider();
  const queryClient = useQueryClient();
  const [pagination, setPagination] = useState({
    pageNo: constant.PAGE_NO_ONE,
    pageLimit: constant.PER_PAGE_TEN,
    roleId: constant.USER,
    state: "",
    search: "",
  });
  const [ID, setID] = useState("");

  const debouncedSearch = useDebounceEffect(pagination?.search.trim(), 1000);

  const { data: bannerList } = useQuery({
    queryKey: [
      "bannerList",
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
      const resp = await adminBannerList(query);
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

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    setFieldValue,
    handleSubmit,
    resetForm,
    setValues,
  } = useFormik({
    initialValues: {
      title: "",
      description: "",
      image: "",
      newPicked: "",
    },
    validationSchema: yup.object().shape({
      title: yup.string().required().label("Title").trim(),
      description: yup.string().required().label("Description").trim(),
      newPicked: yup
        .mixed()
        .when(["image"], {
          is: (value) => !value,
          then: () => yup.string().required("Banner image is a required field"),
        })
        .when(([newPicked], schema) => {
          if (newPicked) {
            return yup
              .mixed()
              .test(
                "type",
                "Please select jpg, png, jpeg format",
                function (value) {
                  return (
                    value &&
                    (value.type === "image/jpg" ||
                      value.type === "image/png" ||
                      value.type === "image/jpeg")
                  );
                }
              );
          }
          return schema;
        }),
    }),
    onSubmit: (values) => {
      const body = new FormData();
      if (ID) {
        body.append("id", ID);
      }
      body.append("title", values.title);
      body.append("description", values.description);
      if (values.newPicked) {
        body.append("blogFile", values.newPicked);
      }
      addBannerMutationFn(body);
    },
  });

  const { mutate: addBannerMutationFn } = useMutation({
    mutationFn: (body) => (ID ? editBannerAdmin(body) : addBannerAdmin(body)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bannerList"] });
      setID("");
      resetForm();
      imgRef.current.value = "";
      console.log("img", (imgRef.current.value = ""));
    },
  });

  const { mutate: deleteBannerMutationFn } = useMutation({
    mutationFn: (id) => deleteBannerAdmin(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bannerList"] });
    },
  });

  useQuery({
    queryKey: ["bannerDetail", ID],
    queryFn: async () => {
      const resp = ID && (await bannerDetailAdmin(ID));
      setValues((values) => ({
        ...values,
        title: resp.data?.data?.title ?? "",
        description: resp.data?.data?.description ?? "",
        image: resp.data?.data?.blogFile ?? "",
      }));
      return true;
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
              / Banner
            </h2>
          </div>
          <Row className="">
            <Col lg={8}>
              <div className="input_box d-flex flex-column gap-3">
                <label className="fw-bolder form-label mb-0">
                  Title <sup className="text-danger">*</sup>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <span className="text-danger">
                  {touched.title && errors.title}
                </span>
                <label className="fw-bolder form-label mb-0">
                  Description <sup className="text-danger">*</sup>
                </label>
                <textarea
                  className="form-control"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id=""
                  cols="30"
                  rows="5"
                ></textarea>
                <span className="text-danger">
                  {touched.description && errors.description}
                </span>
                <label className="fw-bolder form-label mb-0">
                  Banner Image <sup className="text-danger">*</sup>
                </label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) =>
                    setFieldValue("newPicked", e.target.files[0])
                  }
                  accept="image/*"
                  ref={imgRef}
                />
                <span className="text-danger">
                  {touched.newPicked && errors.newPicked}
                </span>
              </div>
              <div className="text-center mt-4">
                <Link onClick={handleSubmit} className="theme-btn">
                  Submit
                </Link>
              </div>
            </Col>
            <Col lg={4}>
              <div className="preview-img">
                <img
                  src={
                    values.newPicked
                      ? URL.createObjectURL(values.newPicked)
                      : values.image
                      ? import.meta.env.VITE_IMAGE_URL + values.image
                      : "/images/default_banner.png"
                  }
                  alt=""
                />
              </div>
            </Col>
          </Row>

          <section className="inner-wrap">
            <Row className="justify-content-end">
              <Col lg={3} className="ms-auto">
                <input
                  type="text"
                  placeholder="Search by Title"
                  value={pagination.search}
                  onChange={handleSearchChange}
                  className="form-control"
                />
              </Col>
            </Row>

            <Container fluid className="px-0">
              <div className="custom-card">
                <Table striped responsive>
                  <thead>
                    <tr>
                      <th>Sn.</th>
                      <th>Banner Image</th>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Created On</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bannerList?.length > 0 ? (
                      bannerList?.map((data, index) => {
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
                                      data?.blogFile
                                        ? import.meta.env.VITE_IMAGE_URL +
                                          data?.blogFile
                                        : "/images/default.jpg"
                                    }
                                  />
                                </span>
                              </div>
                            </td>
                            <td>{data?.title}</td>
                            <td
                              title={
                                data?.description?.length > 15 &&
                                data?.description
                              }
                            >
                              {data?.description?.length > 15
                                ? data?.description?.substring(0, 15) + "..."
                                : data?.description}
                            </td>
                            <td>{moment(data?.createdAt).format("LLL")}</td>
                            <td>{checkAdminState(data?.state)}</td>
                            <td>
                              <div className="action-btn">
                                <button
                                  title="Edit"
                                  onClick={() => {
                                    setID(data?._id);
                                  }}
                                  className="btn-small style-one"
                                >
                                  <FaPencil />
                                </button>

                                <button
                                  className="btn btn-danger btn-small"
                                  type="submit"
                                  // disabled={data?.state === constant.BLOCK}
                                  title="Delete"
                                  onClick={() => {
                                    // setID(data?._id)

                                    deleteBannerMutationFn(data?._id);
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
              </div>
            </Container>
          </section>
        </div>
      </div>
    </>
  );
};

export default BannerList;
