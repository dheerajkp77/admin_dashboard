/**
 * Note
 * It only store image path url but if we wants to add multiple images from local file system we can use below commented code
 */
import { useMutation, useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import React from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import Loader from "../../components/Loader/Loader";
import useSlider from "../../hooks/useSlider";
import {
  addProduct,
  editProduct,
  getCategories,
  getProductDetails,
} from "../../services/services";
import { toastAlert } from "../../utils/SweetAlert";
import AdminFooter from "../AdminFooter";
import Sidebar from "../sidebar/Sidebar";

const AddProduct = () => {
  const isSlider = useSlider();
  const navigate = useNavigate();
  const { id } = useParams();

  const mutation = useMutation({
    mutationFn: (body) => (id ? editProduct(id, body) : addProduct(body)),
    onSuccess: (resp) => {
      toastAlert(
        "success",
        `Product ${id ? "updated" : "added"} successfully.`
      );
      resetForm();
      navigate('/admin/product', {state : resp?.data});
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
  } = useFormik({
    initialValues: {
      title: "",
      description: "",
      category: "",
      brand: "",
      price: "",
      // images: [],
      // imagePreview: [],
    },
    validationSchema: yup.object().shape({
      title: yup.string().required().label("Title").trim(),
      category: yup.string().required().label("Category"),
      brand: yup.string().required().label("Brand"),
      price: yup
        .number()
        .required()
        .label("Price")
        .positive()
        .typeError("Invalid input"),

      //Image validation

      // imagePreview: yup
      //   .mixed()
      //   .when("images", {
      //     is: (value) => !value?.length,
      //     then: () => yup.array().min(1, "At least one image is required."),
      //   })
      //   .when(([file], schema) => {
      //     if (file?.length > 0) {
      //       return yup.array().of(
      //         yup
      //           .mixed()
      //           .test("fileType", "Unsupported file format", (value) => {
      //             if (value) {
      //               return ["image/jpeg", "image/png"].includes(value.type);
      //             }
      //             return true;
      //           })
      //           .test(
      //             "is-valid-size",
      //             "Max allowed size is 2 MB",
      //             (value) => value && value.size <= 2097152
      //           )
      //       );
      //     }
      //     return schema;
      //   }),
    }),
    onSubmit: async (values) => {
      let formData = new FormData();
      formData.append("title", values?.title);
      formData.append("description", values?.description);
      formData.append("category", values?.category);
      formData.append("brand", values?.brand);
      formData.append("price", values?.price);

      // if (values?.imagePreview?.length) {
      //   values?.imagePreview?.map((i) => formData.append("images", i));
      // }
      mutation.mutate(formData);
    },
  });

  useQuery({
    queryKey: ["product-details", id],
    queryFn: async () => {
      const resp = id && (await getProductDetails(id));
      let data = resp?.data;
      if (data) {
        setValues({
          ...values,
          title: data?.title,
          category: data?.category,
          description: data?.description,
          brand: data?.brand,
          price: data?.price,
          // images: data?.images,
        });
      }

      return data ?? "";
    },
  });

  const { data: categoryList } = useQuery({
    queryKey: ["category-list"],
    queryFn: async () => {
      const resp = await getCategories();
      return resp?.data;
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
                      <small className="text-danger">
                        {touched?.title && errors?.title}
                      </small>
                    </Form.Group>
                  </Col>
                  <Col lg={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bolder">
                        Category<span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Select
                        className="form-control fs-6"
                        name="category"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values?.category}
                      >
                        <option value="">Select Category</option>
                        {categoryList?.map((item, index) => (
                          <option value={item} key={index}>
                            {item}
                          </option>
                        ))}
                      </Form.Select>
                      <small className="text-danger">
                        {touched?.category && errors?.category}
                      </small>
                    </Form.Group>
                  </Col>

                  <Col lg={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bolder">
                        Brand<span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Brand"
                        name="brand"
                        value={values?.brand}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />

                      <small className="text-danger">
                        {touched?.brand && errors?.brand}
                      </small>
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

                      <small className="text-danger">
                        {touched?.price && errors?.price}
                      </small>
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

                      <small className="text-danger">
                        {touched?.description && errors?.description}
                      </small>
                    </Form.Group>
                  </Col>
                  {/* It only store image path url but if we wants to add multiple images from local file system we can use below commented code */}
                  {/* <Col lg={12}>
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
                  </Col> */}

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
      {mutation.isPending && <Loader />}
    </div>
  );
};
export default AddProduct;
