
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row, Table } from "react-bootstrap";
import { FaPencilAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { CameraIcon } from "../../../SvgIcons/allIcons";
import useDetails from "../../../hooks/useDetails";
import useSlider from "../../../hooks/useSlider";
import { login } from "../../../redux/features/authSlice";
import { customerEditProfile, imageUpload } from "../../../services/services";
import { constant } from "../../../utils/constants";
import Sidebar from "../../sidebar/Sidebar";
import AdminFooter from "../AdminFooter";

const AdminProfile = () => {
  const [editButton, setEdiButton] = useState(false);
  const dispatch = useDispatch();
  const isSlider = useSlider();
  const data = useDetails();
  const mutation = useMutation({
    mutationFn: async (payload) => {
      let imageId;
      if (payload?.newPicked) {
        const formData = new FormData();
        formData.append("image", payload.newPicked);
        imageId = await imageUpload(formData);
      }
      delete payload["newPicked"];

      if (imageId) {
        payload.profileImg = imageId?.data?.image?.id;
      } else {
        delete payload["profileImg"];
      }
      const response = await customerEditProfile(payload);
      console.log("response", response?.data?.data);
      if (response?.status == 200) {
        dispatch(login(response?.data?.data));
        setEdiButton(false);
      }
    },
    onSuccess: (resp) => {
      setEdiButton(false);
    },
  });
  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    touched,
    errors,
    setFieldValue,
    setValues,
  } = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      bio: "",
      profileImg: "",
      newPicked: "",
    },
    validationSchema: yup.object().shape({
      fullName: yup.string().label("Full Name").required().trim().max(50),
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

    onSubmit: async function (values) {
      mutation.mutate(values);
    },
  });

  useEffect(() => {
    setValues({
      ...values,
      fullName: data?.fullName,
      lastName: data?.lastName,
      email: data?.email,
      profileImg: data?.profileImg,
      bio: data?.bio,
      roleId: data?.roleId,
    });
  }, []);

  return (
    <>
      <div className="mainbox">
        <Sidebar />
        <div className={isSlider ? "body-content close" : "body-content open"}>
          <div className="d-flex align-items-center justify-content-between">
            <h2 className="mainhead mb-0">
              <Link to="/admin/dashboard" className="bread_color">
                Home
              </Link>{" "}
              / Admin Profile
            </h2>
          </div>

          <section className="inner-wrap">
            <Container fluid className="px-0">
              <div className="custom-card">
                {!editButton && (
                  <div
                    className="edit-btn"
                    title="Edit profile"
                    onClick={() => {
                      setEdiButton(true);
                    }}
                  >
                    <FaPencilAlt />
                  </div>
                )}

                {editButton ? (
                  <Form onSubmit={handleSubmit}>
                    <Col lg={4} className="mx-auto">
                      <div className="user-image">
                        <div className="image-uploader">
                          <img
                            src={
                              values.newPicked
                                ? URL.createObjectURL(values.newPicked)
                                : values.profileImg
                                ? import.meta.env.VITE_IMAGE_URL +
                                  values.profileImg
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
                      <Col md={4}>
                        <Form.Group className="mb-4">
                          <Form.Label className="fw-bolder">
                            Full Name
                          </Form.Label>
                          <span className="text-danger">*</span>
                          <Form.Control
                            type="text"
                            name="fullName"
                            value={values?.fullName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Full Name"
                          />
                          <span className="text-danger">
                            {touched?.fullName && errors?.fullName}
                          </span>
                        </Form.Group>
                      </Col>

                      <Col md={4}>
                        <Form.Group className="mb-4">
                          <Form.Label className="fw-bolder">Email</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={values?.email}
                            placeholder="Email"
                            readOnly
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-4">
                          <Form.Label className="fw-bolder">Role</Form.Label>
                          <Form.Control
                            type="roleId"
                            name="roleId"
                            value={values?.roleId === constant.ADMIN && "Admin"}
                            placeholder="roleId"
                            readOnly
                          />
                        </Form.Group>
                      </Col>
                      <Col md={12}>
                        <Form.Group className="mb-4">
                          <Form.Label className="fw-bolder">
                            Bio/About Me
                          </Form.Label>
                          <Form.Control
                            type="text"
                            rows={3}
                            name="bio"
                            as={"textarea"}
                            maxLength={230}
                            value={values?.bio}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Bio/About Me"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Col lg={12} className="text-end">
                      <button type="submit" className="theme-btn">
                        Submit
                      </button>
                    </Col>
                  </Form>
                ) : (
                  <Row>
                    <Col xl={4} className="mx-auto">
                      <div className="admin-profile">
                        <img
                          src={
                            data?.profileImg
                              ? import.meta.env.VITE_IMAGE_URL +
                                data?.profileImg
                              : "/images/default.jpg"
                          }
                          alt="Profile"
                        />
                      </div>
                    </Col>
                    <Col xl={12}>
                      <Table responsive bordered>
                        <tbody>
                          <tr>
                            <th>Full Name</th>
                            <td>
                              <p className="mb-0">{data?.fullName}</p>
                            </td>
                          </tr>
                          <tr>
                            <th>Email</th>
                            <td>
                              <p className="mb-0">{data?.email}</p>
                            </td>
                          </tr>
                          <tr>
                            <th>Role</th>
                            <td>
                              <p className="mb-0">
                                {data?.roleId === constant.ADMIN && "Admin"}
                              </p>
                            </td>
                          </tr>
                          {data?.bio && (
                            <tr>
                              <th>Bio</th>
                              <td>
                                <p className="mb-0">{data?.bio}</p>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
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

export default AdminProfile;
