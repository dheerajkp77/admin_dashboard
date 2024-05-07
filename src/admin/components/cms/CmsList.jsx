
  import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
  import moment from "moment";
  import React from "react";
  import { Container, Table } from "react-bootstrap";
  import { FaEye, FaPencilAlt, FaTrash } from "react-icons/fa";
  import { Link, useNavigate } from "react-router-dom";
  import Swal from "sweetalert2";
  import useSlider from "../../../hooks/useSlider";
  import { adminCmsList, adminDeleteCMS } from "../../../services/services";
  import { toastAlert } from "../../../utils/SweetAlert";
  import { checkAdminState } from "../../../utils/checkAdminState";
  import { constant } from "../../../utils/constants";
  import Sidebar from "../../sidebar/Sidebar";
  import AdminFooter from "../AdminFooter";
  
  const CmsList = () => {
    const isSlider = useSlider();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
  
    const { data: cmsList } = useQuery({
      queryKey: ["cms-list"],
      queryFn: async ({ queryKey }) => {
        const [_key, query] = queryKey;
        const resp = await adminCmsList(query);
        return resp?.data?.data;
      },
    });
  
    const pageType = (value) => {
      if (value == constant.CMS_TERMS) {
        return "Terms & Conditions";
      } else if (value == constant.CMS_PRIVACY) {
        return "Privacy Policy";
      } else if (value == constant.CMS_ABOUT) {
        return "About us";
      }
    };
  
    const { mutate } = useMutation({
      mutationFn: (payload) => adminDeleteCMS(payload),
      onSuccess: (resp) => {
        toastAlert("success", resp?.data?.message);
        queryClient.invalidateQueries({ queryKey: ["cms-list"] });
      },
    });
  
    const handleDelete = (id) => {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to delete this cms!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#000",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          mutate(id);
        }
      });
    };
    return (
      <>
        <div className="mainbox">
          <Sidebar />
          <div className={isSlider ? "body-content close" : "body-content open"}>
            <div className="d-flex align-items-center justify-content-between mb-3">
            <h2 className="mainhead mb-0"><Link to="/admin/dashboard" className="bread_color">Home</Link> / Cms</h2>
              <div className=" d-flex align-items-center gap-3 my-2 mx-1">
                <button
                  type="button"
                  className="theme-btn btn-md"
                  onClick={() => {
                    navigate(`/admin/add-cms`);
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
                        <th>Title</th>
                        <th>Type</th>
                        <th>Created On</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cmsList?.length > 0 ? (
                        cmsList?.map((data, index) => {
                          return (
                            <tr key={index}>
                              <th scope="row">{index + 1}.</th>
                              <td>{data?.title}</td>
                              <td>{pageType(data?.typeId)}</td>
                              <td>{moment(data?.createdAt).format("LLL")}</td>
                              <td>{checkAdminState(data?.stateId)}</td>
                              <td>
                                <div className="action-btn">
                                  <button
                                    title="View"
                                    onClick={() =>
                                      navigate(`/admin/view-cms/${data?._id}`)
                                    }
                                    className="btn-small style-one"
                                  >
                                    <FaEye />
                                  </button>
                                  <button
                                    className="btn-small style-six"
                                    title="Update"
                                    onClick={() => {
                                      navigate(`/admin/edit-cms/${data?._id}`);
                                    }}
                                  >
                                    <FaPencilAlt />
                                  </button>
                                  <button
                                    title="Delete"
                                    disabled={data?.stateId === constant.DELETE}
                                    className="btn btn-danger btn-small"
                                    onClick={() => handleDelete(data?._id)}
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
          <AdminFooter />
        </div>
      </>
    );
  };
  export default CmsList;
  