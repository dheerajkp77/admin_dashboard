
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import React from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { CameraIcon } from "../../../SvgIcons/allIcons";
import useSlider from "../../../hooks/useSlider";
import {
  adminBrandView,
  adminCreateBrand,
  adminUpdateBrand,
} from "../../../services/services";
import { toastAlert } from "../../../utils/SweetAlert";
import { constant } from "../../../utils/constants";
import Sidebar from "../../sidebar/Sidebar";
import AdminFooter from "../AdminFooter";

const AddBrand = () => {
  const { id } = useParams();
  const isSlider = useSlider();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  if (id) {
    useQuery({
      queryKey: ["brand-detail", id],
      queryFn: async ({ queryKey }) => {
        const [_key, id] = queryKey;
        const resp = await adminBrandView(id);
        setValues({
          ...values,
          icon: resp?.data?.data?.icon,
          newPicked: resp?.data?.data?.newPicked,
          brand: resp?.data?.data?.brand,
          stateId: resp?.data?.data?.stateId,
        });
        return resp?.data?.data;
      },
    });
  }

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
  } = useFormik({
    initialValues: {
      icon: "",
      newPicked: "",
      brand: "",
    },
    validationSchema: yup.object().shape({
      brand: yup.string().required().label("Brand").trim(),
      newPicked: yup.mixed().when(([newPicked], schema) => {
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
      let payload = new FormData();
      if (values?.newPicked) {
        payload.append("icon", values?.newPicked);
      }
      payload.append("brand", values.brand.trim());
      addBrand.mutate(payload);
    },
  });
  const addBrand = useMutation({
    mutationFn: (payload) => {
      if (id) {
        return adminUpdateBrand(id, payload);
      } else {
        return adminCreateBrand(payload);
      }
    },
    onSuccess: (resp) => {
      toastAlert("success", resp?.data?.message);
      resetForm();
      queryClient.invalidateQueries({ queryKey: ["brandList"] });
      navigate(`/admin/brand-list`);
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
              / {id ? "Update Brand" : "Create Brand"}
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
                  <Col lg={4} className="mx-auto">
                    <div className="user-image">
                      <div className="image-uploader">
                        <img
                          src={
                            values.newPicked
                              ? URL.createObjectURL(values.newPicked)
                              : values.icon
                              ? import.meta.env.VITE_IMAGE_URL + values.icon
                              : "/images/default.jpg"
                          }
                          alt="Image"
                        />

                        <label className="icon">
                          <CameraIcon />
                        </label>
                        <Form.Control
                          name="profile_file"
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            setFieldValue("newPicked", e.target.files[0])
                          }
                        />
                        <div className="text-danger">
                          {touched?.newPicked && errors?.newPicked}
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Row>
                    <Col lg={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-bolder">
                          Brand <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter a brand"
                          name="brand"
                          value={values?.brand}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <p className="text-danger">
                          {touched?.brand && errors?.brand}
                        </p>
                      </Form.Group>
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
    </>
  );
};

export default AddBrand;
