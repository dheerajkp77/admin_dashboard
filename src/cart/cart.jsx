
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { Fragment } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import {
  userCartList,
  userDeleteCartItem,
  userUpdateCart,
} from "../services/services";
import Loader from "../utils/Loader";
import "./cart.scss";

const Cart = () => {
  const shipping_estimate = 10;

  const {
    data: cartList,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["cartList"],
    queryFn: async () => {
      const resp = await userCartList();
      return resp.data?.data;
    },
  });

  const { mutate: updateCartMutationFn } = useMutation({
    mutationFn: (body) => userUpdateCart(body),
    onSuccess: () => {
      refetch();
    },
  });

  const { mutate: deleteCartMutationFn } = useMutation({
    mutationFn: (id) => userDeleteCartItem(id),
    onSuccess: () => {
      refetch();
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <section className="page_head">
        <Container>
          <h2>
            <span>Cart</span>
          </h2>
        </Container>
      </section>
      <section className="cart_sec">
        <Container>
          <Row>
            <Col lg="8">
              <div className="cart_items_main">
                {cartList?.length > 0 ? (
                  cartList?.map((data, index) => {
                    return (
                      <Fragment key={index}>
                        <div className="cart_item">
                          <Row>
                            <Col lg={4}>
                              <div className="cart_img">
                                <img
                                  src={
                                    import.meta.env.VITE_IMAGE_URL +
                                    data?.images?.at(0)
                                  }
                                  alt="img"
                                />
                              </div>
                            </Col>
                            <Col lg={8}>
                              <div className="d-flex align-items-center justify-content-between">
                                <h3>{data?.title}</h3>
                                <div className="top_icons">
                                  <Link
                                    className="bg-red"
                                    onClick={() => {
                                      removeItemFromCart(data);
                                      deleteCartMutationFn(data?._id);
                                    }}
                                  >
                                    <FaTrash />
                                  </Link>
                                </div>
                              </div>

                              <p>{data?.description}</p>
                              <div className="price">
                                Price: ${+data?.quantity * +data?.price}
                              </div>

                              <div className="d-flex gap-2 align-items-center mb-4">
                                <span>Quantity:</span>
                                <Form.Control
                                  required
                                  type="number"
                                  placeholder="0"
                                  value={data?.quantity}
                                  onChange={(e) => {
                                    updateCartMutationFn({
                                      id: data?._id,
                                      quantity: +e.target.value,
                                    });
                                  }}
                                  onKeyDown={(e) =>
                                    e.key == "Backspace" && e.preventDefault()
                                  }
                                  min={1}
                                />
                              </div>
                              <div className="mb-3">
                                Shipping Estimate:{" "}
                                <span>${shipping_estimate}</span>
                              </div>

                              <div>
                                Amount:{" "}
                                <b>
                                  $
                                  {+data?.quantity * +data?.price +
                                    shipping_estimate}
                                </b>
                              </div>
                            </Col>
                          </Row>
                        </div>
                        {cartList.length !== index + 1 && <hr />}
                      </Fragment>
                    );
                  })
                ) : (
                  <h4>Cart is empty!!</h4>
                )}
              </div>
            </Col>
            <Col lg={4}>
              <div className="order_summary">
                <h4>Order Summary</h4>
                <ul>
                  <li>
                    Sub Total
                    <span>
                      $ {cartList.reduce((a, c) => a + c.quantity * c.price, 0)}
                    </span>
                  </li>
                  <li>
                  Total Shipping
                    <span>${shipping_estimate * +cartList?.length}</span>
                  </li>
                  <li className="total_order">
                    Order Total
                    <span>
                      $
                      {cartList.reduce((a, c) => a + c.quantity * c.price, 0) +
                        shipping_estimate * +cartList?.length}
                    </span>
                  </li>
                </ul>
                <div className="order_btn">
                  <Link to="/checkout" className="btn-theme">
                    Checkout
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Footer />
    </>
  );
};

export default Cart;
