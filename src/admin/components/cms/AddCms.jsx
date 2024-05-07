
import React from "react";
import useSlider from "../../../hooks/useSlider";
import Sidebar from "../../sidebar/Sidebar";
import { Col, Container, Form, Row } from "react-bootstrap";
import AdminFooter from "../AdminFooter";
import { constant } from "../../../utils/constants";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toastAlert } from "../../../utils/SweetAlert";
import { useFormik } from "formik";
import * as yup from "yup";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  adminCreateCms,
  adminCmsView,
  adminUpdateCMS,
} from "../../../services/services";

const AddCms = () => {
  const { id } = useParams();
  const isSlider = useSlider();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  if (id) {
    useQuery({
      queryKey: ["cms-detail", id],
      queryFn: async ({ queryKey }) => {
        const [_key, id] = queryKey;
        const resp = await adminCmsView(id);
        setValues({
          ...values,
          title: resp?.data?.data?.title,
          typeId: resp?.data?.data?.typeId,
          stateId: resp?.data?.data?.stateId,
          description: resp?.data?.data?.description,
        });
        return resp?.data?.data;
      },
    });
  }

  const { mutate, error } = useMutation({
    mutationFn: (payload) => adminCreateCms(payload),
    onSuccess: (resp) => {
      // Success actions
      toastAlert("success", resp?.data?.message);
      resetForm();
      navigate(`/admin/cms-list`);
      queryClient.invalidateQueries({ queryKey: ["cms-list"] });
    },
  });

  const { mutate: editMutate } = useMutation({
    mutationFn: (payload) => adminUpdateCMS(id, payload),
    onSuccess: (resp) => {
      // Success actions
      toastAlert("success", "Page updated successfully");
      resetForm();
      queryClient.invalidateQueries({ queryKey: ["cms-list"] });
      navigate(`/admin/cms-list`);
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
      typeId: "",
    },
    validationSchema: yup.object().shape({
      title: yup.string().required().label("Title").trim(),
      description: yup.string().trim().required().label("Description"),
      typeId: yup.string().trim().required().label("Type"),
    }),
    onSubmit: async (values) => {
      let body;
      if (id) {
        body = {
          id: id,
          title: values?.title.trim(),
          description: values?.description.trim(),
          typeId: values?.typeId,
          stateId: values?.stateId,
        };
        editMutate(body);
      } else {
        body = {
          title: values?.title.trim(),
          description: values?.description.trim(),
          typeId: values?.typeId,
        };
        mutate(body);
      }
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
            / {id ? "Update Cms" : "Create cms"}
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
                        Type<span className="text-danger">*</span>
                      </Form.Label>
                      <select
                        className="form-control fs-6"
                        name="typeId"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values?.typeId}
                      >
                        <option value="">Select Type</option>
                        <option value={constant.CMS_TERMS}>
                          Terms & Conditions
                        </option>
                        <option value={constant.CMS_PRIVACY}>
                          Privacy Policy
                        </option>
                        <option value={constant.CMS_ABOUT}>About us</option>
                      </select>
                      <p className="text-danger">
                        {touched?.typeId && errors?.typeId}
                      </p>
                    </Form.Group>
                  </Col>
                  <Col lg={12}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bolder">
                        Description<span className="text-danger">*</span>
                      </Form.Label>

                      <CKEditor
                        editor={ClassicEditor}
                        data={values?.description}
                        config={{
                          language: "en",
                          toolbar: [
                            "heading",
                            "|",
                            "bold",
                            "italic",
                            "link",
                            "bulletedList",
                            "numberedList",
                            "|",
                            "outdent",
                            "indent",
                            "|",
                            "imageUpload",
                            "blockQuote",
                            "insertTable",
                            "mediaEmbed",
                            "undo",
                            "redo",
                          ],
                        }}
                        onChange={(_, editor) => {
                          setFieldValue("description", editor.getData());
                        }}
                        onBlur={() => {
                          setFieldTouched("description", true);
                        }}
                      />
                      <p className="text-danger">
                        {touched?.description && errors?.description}
                      </p>
                    </Form.Group>
                  </Col>
                  {id ? (
                    <Col lg={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-bolder">Status</Form.Label>
                        <select
                          className="form-control fs-6"
                          name="stateId"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values?.stateId}
                        >
                          <option value={constant.ACTIVE}>Active</option>
                          <option value={constant.INACTIVE}>In-Active</option>
                        </select>
                        <p className="text-danger">
                          {touched?.stateId && errors?.stateId}
                        </p>
                      </Form.Group>
                    </Col>
                  ) : (
                    ""
                  )}
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
export default AddCms;
