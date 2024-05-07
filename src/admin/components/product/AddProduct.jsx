
import { useMutation, useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import React from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import * as yup from "yup";
import useSlider from "../../../hooks/useSlider";
import {
  addProductAdmin,
  adminEditProduct,
  adminProductDetails,
  deleteProductImage,
} from "../../../services/services";
import { toastAlert } from "../../../utils/SweetAlert";
import { constant } from "../../../utils/constants";
import Sidebar from "../../sidebar/Sidebar";
import AdminFooter from "../AdminFooter";

const AddProduct = () => {
  const isSlider = useSlider();
  const navigate = useNavigate();
  const { id } = useParams();

  const mutation = useMutation({
    mutationFn: (body) =>
      id ? adminEditProduct(id, body) : addProductAdmin(body),
    onSuccess: (resp) => {
      toastAlert("success", resp?.data?.message);
      resetForm();
      navigate(-1);
    },
  });

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    errors,
    resetForm,
    setValues,
    setFieldValue,
    setFieldTouched,
  } = useFormik({
    initialValues: {
      title: "",
      description: "",
      category: "",
      material: "",
      type: "",
      price: "",
      images: [],
      size: [],
      imagePreview: [],
    },
    validationSchema: yup.object().shape({
      title: yup.string().required().label("Title").trim(),
      category: yup.string().required().label("Category"),
      material: yup.string().required().label("Material"),
      type: yup.string().required().label("Tshirt type"),
      price: yup
        .number()
        .required()
        .label("Price")
        .positive()
        .typeError("Invalid input"),
      size: yup.array().min(1).label("Size"),
      imagePreview: yup
        .mixed()
        .when("images", {
          is: (value) => !value?.length,
          then: () => yup.array().min(1, "At least one image is required."),
        })
        .when(([file], schema) => {
          if (file?.length > 0) {
            return yup.array().of(
              yup
                .mixed()
                .test("fileType", "Unsupported file format", (value) => {
                  if (value) {
                    return ["image/jpeg", "image/png"].includes(value.type);
                  }
                  return true;
                })
                .test(
                  "is-valid-size",
                  "Max allowed size is 2 MB",
                  (value) => value && value.size <= 2097152
                )
            );
          }
          return schema;
        }),
    }),
    onSubmit: async (values) => {
      let formData = new FormData();
      formData.append("title", values?.title);
      formData.append("description", values?.description);
      formData.append("category", values?.category);
      formData.append("material", values?.material);
      formData.append("type", values?.type);
      formData.append("price", values?.price);
      formData.append(
        "size",
        values?.size?.map((i) => i.value)
      );
      if (values?.imagePreview?.length) {
        values?.imagePreview?.map((i) => formData.append("images", i));
      }
      mutation.mutate(formData);
    },
  });

  const options = [
    { label: "XS", value: "XS" },
    { label: "S", value: "S" },
    { label: "M", value: "M" },
    { label: "L", value: "L" },
    { label: "XL", value: "XL" },
    { label: "XXL", value: "XXL" },
    { label: "XXXL", value: "XXXL" },
  ];

  useQuery({
    queryKey: ["product-details", id],
    queryFn: async () => {
      const resp = id && (await adminProductDetails(id));
      let data = resp?.data?.data;
      if (data) {
        setValues({
          ...values,
          title: data?.title,
          category: data?.category,
          description: data?.description,
          material: data?.material,
          type: data?.type,
          price: data?.price,
          size: data?.size?.map((i) => ({ label: i, value: i })),
          images: data?.images,
        });
      }

      return data ?? "";
    },
  });

  const imageMutation = useMutation({
    mutationFn: (id) => deleteProductImage(id),
    onSuccess: (resp) => {
      setFieldValue(
        "images",
        values?.images?.filter((i) => i !== resp?.data?.data)
      );
    },
  });

  return (
    <div className="mainbox">
      <Sidebar />
      <div className={isSlider ? "body-content close" : "body-content open"}>
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h2 className="mainhead mb-0">
            <Link to="/admin/dashboard" className="bread_color">
              Home
            </Link>
            / {id ? "Edit Product" : "Add Product"}
          </h2>
          <div className="text-end mx-1">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="theme-btn btn-md mb-2 mx-4"
            >
              Back
            </button>
          </div>
        </div>
        <section className="inner-wrap">
          <Container fluid className="px-0">
            <div className="custom-card">
              <Form>
                <Row>
                  <Col lg={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bolder">
                        Title<span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Title"
                        name="title"
                        value={values?.title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <p className="text-danger">
                        {touched?.title && errors?.title}
                      </p>
                    </Form.Group>
                  </Col>
                  <Col lg={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bolder">
                        Category<span className="text-danger">*</span>
                      </Form.Label>
                      <select
                        className="form-control fs-6"
                        name="category"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values?.category}
                      >
                        <option value="">Select Category</option>
                        <option value={constant.MALE}>Male</option>
                        <option value={constant.FEMALE}>Female</option>
                        <option value={constant.UNISEX}>Unisexual</option>
                      </select>
                      <p className="text-danger">
                        {touched?.category && errors?.category}
                      </p>
                    </Form.Group>
                  </Col>
                  <Col lg={12}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bolder">Description</Form.Label>
                      <Form.Control
                        type="text"
                        as="textarea"
                        rows={2}
                        placeholder="Description"
                        name="description"
                        value={values?.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />

                      <p className="text-danger">
                        {touched?.description && errors?.description}
                      </p>
                    </Form.Group>
                  </Col>
                  <Col lg={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bolder">
                        Material<span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Material"
                        name="material"
                        value={values?.material}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />

                      <p className="text-danger">
                        {touched?.material && errors?.material}
                      </p>
                    </Form.Group>
                  </Col>
                  <Col lg={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bolder">
                        T-shirt Type<span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="T-shirt Type"
                        name="type"
                        value={values?.type}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />

                      <p className="text-danger">
                        {touched?.type && errors?.type}
                      </p>
                    </Form.Group>
                  </Col>
                  <Col lg={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bolder">
                        Price<span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="Number"
                        min={0}
                        placeholder="Price"
                        name="price"
                        value={values?.price}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />

                      <p className="text-danger">
                        {touched?.price && errors?.price}
                      </p>
                    </Form.Group>
                  </Col>
                  <Col lg={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bolder">
                        Size<span className="text-danger">*</span>
                      </Form.Label>
                      <Select
                        options={options}
                        isMulti
                        placeholder="Select Size"
                        value={values?.size}
                        onChange={(e) => setFieldValue("size", e)}
                        onBlur={() => setFieldTouched("size", true)}
                      />

                      <p className="text-danger">
                        {touched?.size && errors?.size}
                      </p>
                    </Form.Group>
                  </Col>
                  <Col lg={12}>
                    <Row>
                      <Col className="mb-2" lg={2}>
                        <label className="image-picker">
                          <input
                            type="file"
                            onChange={(e) =>
                              setFieldValue("imagePreview", [
                                ...values?.imagePreview,
                                ...e.target.files,
                              ])
                            }
                            multiple
                            accept="image/*"
                          />
                          Upload Image
                        </label>
                      </Col>
                      {values?.imagePreview?.map((item, index) => {
                        return (
                          <Col className="picked-img mb-2" lg={2} key={index}>
                            <img
                              src={URL.createObjectURL(item)}
                              className="preview-img"
                            />
                            <div
                              className="icon-container"
                              onClick={() => {
                                let img = values?.imagePreview;
                                img.splice(index, 1);
                                setFieldValue("imagePreview", img);
                              }}
                            >
                              <FaTimes />
                            </div>
                            <p className="text-danger">
                              {touched?.imagePreview &&
                                errors?.imagePreview?.at(index)}
                            </p>
                          </Col>
                        );
                      })}
                      {values?.images?.map((item, index) => {
                        return (
                          <Col className="picked-img mb-2" lg={2} key={index}>
                            <img
                              src={import.meta.env.VITE_IMAGE_URL + item}
                              className="preview-img"
                            />
                            <div
                              className="icon-container"
                              onClick={() => {
                                imageMutation.mutate(item);
                              }}
                            >
                              <FaTimes />
                            </div>
                          </Col>
                        );
                      })}
                    </Row>
                  </Col>

                  <div className="text-end mt-4">
                    <button
                      className="theme-btn btn-md mb-2"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                  </div>
                </Row>
              </Form>
            </div>
          </Container>
        </section>
      </div>
      <AdminFooter />
    </div>
  );
};
export default AddProduct;
