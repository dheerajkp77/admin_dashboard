import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Container, Table } from "react-bootstrap";
import { FaEye, FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "../../components/Loader/Loader";
import useSlider from "../../hooks/useSlider";
import { deleteProduct, getProducts } from "../../services/services";
import Pagination from "../../utils/Pagination";
import { toastAlert } from "../../utils/SweetAlert";
import { constant } from "../../utils/constants";
import AdminFooter from "../AdminFooter";
import Sidebar from "../sidebar/Sidebar";

const Product = () => {
  const isSlider = useSlider();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState("");

  const {
    data: productList,
    refetch,
    isPending,
  } = useQuery({
    queryKey: ["product-list", page],
    queryFn: async () => {
      const resp = await getProducts(page);
      setTotal(resp?.data?.total);
      return resp?.data?.products;
    },
  });

  const deleteMutate = useMutation({
    mutationFn: (id) => deleteProduct(id),
    onSuccess: () => {
      toastAlert("success", "Product deleted successfully");
      refetch();
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#378ce7",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        deleteMutate?.mutate(id);
      }
    });
  };

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
              / Product Management
            </h2>
            <div className=" d-flex align-items-center gap-3 my-2 mx-1">
              <Link
                type="button"
                className="theme-btn btn-md"
                to="../add-product"
              >
                Add
              </Link>
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
                      <th>Image</th>
                      <th>Category</th>
                      <th>Brand</th>
                      <th>Price</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productList?.length > 0 ? (
                      productList?.map((data, index) => {
                        const serialNumber =
                          index + 1 + (page - 1) * constant.PER_PAGE_TEN;
                        return (
                          <tr key={index}>
                            <th scope="row">{serialNumber}</th>
                            <td>{data?.title}</td>
                            <td>
                              <div className="table-img">
                                <img
                                  src={data?.images?.at(0)}
                                  onError={({ currentTarget }) => {
                                    currentTarget.onerror = null; // prevents looping
                                    currentTarget.src =
                                      "/images/default_banner.png";
                                  }}
                                />
                              </div>
                            </td>
                            <td>{data?.category}</td>
                            <td>{data?.brand}</td>
                            <td>{data?.price}</td>

                            <td>
                              <div className="action-btn">
                                <button
                                  title="View"
                                  onClick={() => navigate(`./${data?.id}`)}
                                  className="btn-small style-one"
                                >
                                  <FaEye />
                                </button>
                                <button
                                  title="Edit"
                                  onClick={() =>
                                    navigate(`../add-product/${data?.id}`)
                                  }
                                  className="btn-small style-three"
                                >
                                  <FaPencil />
                                </button>

                                <button
                                  title="Delete"
                                  onClick={() => handleDelete(data?.id)}
                                  className="btn-small style-two"
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
                        <td colSpan="12" className="text-center">
                          Data Not Found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
                {Math.ceil(Number(total) / constant.PER_PAGE_TEN) > 1 && (
                  <Pagination
                    page={page}
                    setPage={setPage}
                    totalPages={Math.ceil(
                      Number(total) / constant.PER_PAGE_TEN
                    )}
                  />
                )}
              </div>
            </Container>
          </section>
        </div>
        <AdminFooter />
      </div>
      {isPending && <Loader />}
    </>
  );
};

export default Product;
