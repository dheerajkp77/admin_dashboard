import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import React, { useState } from "react";
import { Badge, Container, Table } from "react-bootstrap";
import { FaBan, FaCheck, FaEye, FaPen, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useSlider from "../../../hooks/useSlider";
import { deleteFaq, faqList, updateFaqState } from "../../../services/services";
import Pagination from "../../../utils/Pagination";
import Sidebar from "../../sidebar/Sidebar";
import AdminFooter from "../AdminFooter";
import { toastAlert } from "../../../utils/SweetAlert";
import { constant } from "../../../utils/constants";

const AdminFaq = () => {
  const navigate = useNavigate();
  const isSlider = useSlider();
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState("");

  const { data: faqListData, refetch } = useQuery({
    queryKey: ["faq-list", page],
    queryFn: async () => {
      const resp = await faqList(page);
      setMeta(resp?.data?._meta);
      return resp?.data?.data ?? [];
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteFaq(id),
    onSuccess: () => {
      toastAlert("success", "Faq deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["faq-list"] });
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      confirmButtonColor: "#378ce7",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  const state = {
    1: "Active",
    2: "In-active",
    3: "Deleted",
  };

  const stateBadge = {
    1: "success",
    2: "warning",
    3: "danger",
  };

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

  const stateMutation = useMutation({
    mutationFn: (body) =>
      updateFaqState({ faqId: body?.id, state: body.state }),
    onSuccess: (resp) => {
      toastAlert("success", resp?.data?.message);
      refetch();
    },
  });

  return (
    <>
      <div className="mainbox">
        <Sidebar />
        <div className={isSlider ? "body-content close" : "body-content open"}>
          <div className="d-flex align-items-center justify-content-between flex-wrap mb-3">
            <h2 className="mainhead mb-0">FAQ's</h2>

            <div className="d-flex align-items-center gap-2">
              <button
                onClick={() => navigate("/admin/add-faq")}
                className="btn btn-primary"
              >
                Add
              </button>
            </div>
          </div>

          <section className="inner-wrap">
            <Container fluid className="px-0">
              <div className="custom-card">
                <Table bordered responsive>
                  <thead>
                    <tr>
                      <th>Index</th>
                      <th>Question</th>
                      <th>Created On</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {faqListData?.length > 0 ? (
                      faqListData?.map((data, i) => {
                        return (
                          <tr key={i}>
                            <td>{(page - 1) * 10 + (i + 1)}</td>
                            <td>{data?.question ?? data?.question}</td>
                            <td>{moment(data?.createdAt).format("lll")}</td>
                            <td>
                              <Badge
                                bg={stateBadge[data?.stateId] ?? "Warning"}
                              >
                                {state[data?.stateId] ?? "-"}
                              </Badge>
                            </td>

                            <td>
                              <div className="action-btn">
                                <button
                                  onClick={() =>
                                    navigate(`/admin/view-faq/${data?._id}`)
                                  }
                                  className="btn-small style-one"
                                  title="View"
                                >
                                  <FaEye />
                                </button>
                                <button
                                  onClick={() =>
                                    navigate(`/admin/edit-faq/${data?._id}`)
                                  }
                                  className="btn-small style-one"
                                  title="Edit"
                                >
                                  <FaPen />
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
                                  className="btn-small style-two"
                                  onClick={() => handleDelete(data?._id)}
                                  title="Delete"
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
                        <td className="text-center" colSpan={8}>
                          No Data Found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
                {meta?.pageCount > 1 && (
                  <Pagination
                    totalPages={meta?.pageCount}
                    page={page}
                    setPage={setPage}
                  />
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

export default AdminFaq;
