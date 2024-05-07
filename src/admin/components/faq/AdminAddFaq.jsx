import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import React from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import useSlider from "../../../hooks/useSlider";
import { addFaq, detailFaq, updateFaq } from "../../../services/services.js";
import { toastAlert } from "../../../utils/SweetAlert.js";
import Sidebar from "../../sidebar/Sidebar.jsx";
import AdminFooter from "../AdminFooter.jsx";
const AdminAddFaq = () => {
  const isSlider = useSlider();
  let navigate = useNavigate();
  let { id } = useParams();

  const {
    handleBlur,
    handleChange,
    values,
    errors,
    touched,
    setFieldValue,
    handleSubmit,
    setValues,
    resetForm,
  } = useFormik({
    initialValues: {
      question: "",
      answer: "",
    },
    validationSchema: yup.object({
      question: yup.string().label("Question").required(),
      answer: yup.string().label("Answer").required(),
    }),
    onSubmit: (values) => {
      let body = {
        question: values.question,
        answer: values.answer,
      };
      mutation.mutate(body);
    },
  });

  const mutation = useMutation({
    mutationFn: (body) => {
      if (id) {
        return updateFaq(id, body);
      } else {
        return addFaq(body);
      }
    },
    onSuccess: (resp) => {
      toastAlert("success", resp?.data?.message);
      navigate("/admin/faq");
      resetForm();
    },
  });

  useQuery({
    queryKey: "faq-details",
    queryFn: async () => {
      const resp = id && (await detailFaq(id));
      if (resp?.data?.data) {
        setValues({
          ...values,
          question: resp?.data?.data?.question,
          answer: resp?.data?.data?.answer,
        });
      }
      return resp?.data?.data ?? "";
    },
  });

  return (
    <>
      <div className="mainbox">
        <Sidebar />
        <div className={isSlider ? "body-content close" : "body-content open"}>
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h2 className="mainhead mb-0">{id ? "Update FAQ" : "Add FAQ"}</h2>
            <Link to={-1} className="btn btn-primary">
              Back
            </Link>
          </div>

          <section className="inner-wrap">
            <Container fluid className="px-0">
              <div className="custom-card">
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col lg={12}>
                      <Form.Group className="mb-3">
                        <Form.Label>Question</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Question"
                          name="question"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values?.question}
                        />
                        {touched?.question && (
                          <span className="text-danger">
                            {errors?.question}
                          </span>
                        )}
                      </Form.Group>
                    </Col>
                    <Col lg={12}>
                      <Form.Group className="mb-3">
                        <Form.Label>Answer</Form.Label>
                        <CKEditor
                          editor={ClassicEditor}
                          data={values.answer}
                          onReady={(editor) => {}}
                          config={{
                            toolbar: [
                              "undo",
                              "redo",
                              "|",
                              "heading",
                              "|",
                              "bold",
                              "italic",
                              "|",
                              "bulletedList",
                              "numberedList",
                              "outdent",
                              "indent",
                            ],
                          }}
                          onChange={(event, editor) => {
                            const data = editor.getData();
                            setFieldValue("answer", data);
                          }}
                        />
                        {touched?.answer && (
                          <span className="text-danger">{errors?.answer}</span>
                        )}
                      </Form.Group>
                    </Col>
                    <div className="text-end mt-4">
                      <button className="main-btn btn-theme" type="submit">
                        {id ? "Update" : "Submit"}
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

export default AdminAddFaq;
