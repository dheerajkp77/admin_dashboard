import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { FaTrash } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Footer from "../components/Footer";
import UserSidebar from "../components/UserSidebar";
import { cardList, deletePaymentMethod } from "../services/services";
import AddCard from "./AddCard";
import "./card.scss";

const Card = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

  const { data, refetch } = useQuery({
    queryKey: "stripe-cards",
    queryFn: async () => {
      const resp = await cardList();
      return resp?.data?.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deletePaymentMethod(id),
    onSuccess: (resp) => {
      refetch();
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this card",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#378CE7",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  return (
    <div>
      <section className="page_head">
        <Container>
          <h2>
            <span>User</span>
          </h2>
        </Container>
      </section>

      <section className="user_section">
        <Container>
          <Row>
            <Col lg={4}>
              <UserSidebar />
            </Col>
            <Col lg={8}>
              <div className="profile_wrap">
                <div className="profile_card">
                  <div className="d-flex justify-content-between flex-wrap gap-3 align-items-center">
                    <h4>Card</h4>
                    <div className="profile_edit">
                      <Link className="btn-edit" onClick={handleShow}>
                        Add
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.8795 14.5658L15.1763 5.269L13.8802 3.97283L4.58333 13.2697V14.5658H5.8795ZM6.63942 16.3992H2.75V12.5097L13.2321 2.02766C13.404 1.85582 13.6371 1.75928 13.8802 1.75928C14.1232 1.75928 14.3563 1.85582 14.5283 2.02766L17.1215 4.62091C17.2933 4.79282 17.3899 5.02593 17.3899 5.269C17.3899 5.51207 17.2933 5.74518 17.1215 5.91708L6.63942 16.3992ZM2.75 18.2325H19.25V20.0658H2.75V18.2325Z"
                            fill="black"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="table_card">
                  <Table hover border-0>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Last Four Digits</th>
                        <th>Card Type</th>
                        <th>Country</th>
                        <th>Expiry</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.length > 0 ? (
                        data?.map((item, index) => {
                          return (
                            <tr>
                              <td>{index + 1}</td>
                              <td>{item?.last4}</td>
                              <td>{item?.brand}</td>
                              <td>{item?.country}</td>
                              <td>
                                {item?.exp_month}/{item?.exp_year}
                              </td>
                              <td>
                                <div className="d-flex gap-1">
                                  <Link
                                    className="btn bg-danger text-white"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handleDelete(item?.id);
                                    }}
                                  >
                                    <FaTrash />
                                  </Link>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan={12} className="text-center">
                            No Card Found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Footer />

      <Elements stripe={stripePromise}>
        <AddCard show={show} handleClose={handleClose} />
      </Elements>
    </div>
  );
};

export default Card;
