
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Table from "react-bootstrap/Table";
import Tabs from "react-bootstrap/Tabs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Footer from "../components/Footer";
import { cartCount } from "../redux/features/authSlice";
import { userAddToCart, userProductDetail } from "../services/services";
import { toastAlert } from "../utils/SweetAlert";
import "./shop.scss";

const ShopDetail = () => {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.auth.cartCount);
  const { id } = useParams();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");

  const { data: productDetail } = useQuery({
    queryKey: ["productDetail", id],
    queryFn: async () => {
      const resp = await userProductDetail(id);
      setSize(resp.data?.data?.size?.at(0));
      return resp.data?.data;
    },
  });

  const categoryType = {
    0: "Male",
    1: "Female",
    2: "Unisex",
  };

  const addCart = useMutation({
    mutationFn: () =>
      userAddToCart({
        productId: id,
        quantity: quantity,
        size: size,
      }),
    onSuccess: (resp) => {
      toastAlert("success", resp?.data?.message);
      dispatch(cartCount(count + 1));
      setQuantity(1);
    },
  });

  return (
    <>
      <section className="page_head">
        <Container>
          <h2>Home/{categoryType[productDetail?.category]}</h2>
        </Container>
      </section>
      <section className="shop-detail_sec">
        <Container>
          <Row>
            <Col lg={4}>
              <Swiper
                style={{
                  "--swiper-navigation-color": "#fff",
                  "--swiper-pagination-color": "#fff",
                }}
                spaceBetween={10}
                navigation={true}
                thumbs={{
                  swiper:
                    thumbsSwiper && !thumbsSwiper.destroyed
                      ? thumbsSwiper
                      : null,
                }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
              >
                {productDetail?.images?.map((data, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <div className="shop_detail_img">
                        <img
                          src={import.meta.env.VITE_IMAGE_URL + data}
                          alt="img"
                        />
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
              >
                {productDetail?.images?.map((data, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <div className="shop_thumb_imgs">
                        <img
                          src={import.meta.env.VITE_IMAGE_URL + data}
                          alt="img"
                        />
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </Col>
            <Col lg={8}>
              <div className="shop-dtl-main">
                <h2>{productDetail?.title}</h2>
                <p>{productDetail?.description}</p>
                <p className="price">${productDetail?.price}</p>
                <p className="mb-0">
                  <strong> Size</strong>
                </p>
                <div className="size-box">
                  {productDetail?.size?.map((data, index) => {
                    return (
                      <div key={index} className="custom-radio">
                        <label>
                          <input
                            type="radio"
                            name="size"
                            value={data}
                            onChange={(e) => {
                              setSize(e.target.value);
                            }}
                            checked={size === data}
                          />
                          <span key={index}>{data}</span>
                        </label>
                      </div>
                    );
                  })}
                </div>

                <div className="d-flex gap-4 justify-content-between flex-wrap">
                  <Link className="btn-theme btn-outline">Buy</Link>
                  <div className="inputs-block">
                    <a
                      className="minus"
                      onClick={(e) => {
                        e.preventDefault();
                        setQuantity(quantity - 1);
                      }}
                    >
                      -
                    </a>
                    <input
                      id="inputCount"
                      type="text"
                      value={quantity}
                      readOnly
                    />
                    <a
                      className="plus"
                      onClick={(e) => {
                        e.preventDefault();
                        setQuantity(quantity + 1);
                      }}
                    >
                      +
                    </a>
                  </div>
                  <Link
                    onClick={(e) => {
                      e.preventDefault();
                      addCart.mutate();
                    }}
                    className="btn-theme"
                  >
                    Add to Cart
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <div className="desription_wrap">
              <Tabs
                defaultActiveKey="home"
                id="uncontrolled-tab-example"
                className="mb-3"
              >
                <Tab eventKey="home" title="Description">
                  <div className="tab_inr">
                    <h3>Consectetur a scelerisque</h3>
                    <p>
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.""Lorem ipsum
                      dolor sit amet, consectetur adipiscing elit, sed do
                      eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum."
                    </p>
                  </div>
                </Tab>
                <Tab eventKey="profile" title="Additional Information">
                  <div className="tab_inr">
                    <Row className="justify-content-center">
                      <Col lg={8}>
                        <div className="table-responsive">
                          <Table hover className="mt-4">
                            <thead>
                              <tr>
                                <th>Color</th>
                                <td>Black, Red, Brown, Orange, white</td>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th>Size</th>
                                <td>s, xs, m, l, xL</td>
                              </tr>
                              <tr>
                                <th>Material</th>
                                <td>Glass, Metal, Paper, Wood</td>
                              </tr>
                              <tr>
                                <th>Delivery</th>
                                <td>
                                  1 to 3 business days, 24 hours, 5 to 7
                                  business days
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Tab>
                <Tab eventKey="contact" title="Reviews(1)">
                  <div className="tab_inr">
                    <div className="review_wrp d-flex gap-4">
                      <div className="review_img">
                        <img src="/images/profile.jpg" alt="img" />
                      </div>
                      <div className="review_content w-100">
                        <div className="top_content d-flex justify-content-between">
                          <div className="left_cnt">
                            <h4>Nina Holly</h4>
                            <p>5 March 2024 </p>
                          </div>
                          <div className="ratings">
                            <span>
                              <svg
                                width="23"
                                height="21"
                                viewBox="0 0 23 21"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M11.5 0L14.0819 7.9463H22.4371L15.6776 12.8574L18.2595 20.8037L11.5 15.8926L4.74047 20.8037L7.32238 12.8574L0.56285 7.9463H8.91809L11.5 0Z"
                                  fill="#378CE7"
                                />
                              </svg>
                            </span>
                            <span>
                              <svg
                                width="23"
                                height="21"
                                viewBox="0 0 23 21"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M11.5 0L14.0819 7.9463H22.4371L15.6776 12.8574L18.2595 20.8037L11.5 15.8926L4.74047 20.8037L7.32238 12.8574L0.56285 7.9463H8.91809L11.5 0Z"
                                  fill="#378CE7"
                                />
                              </svg>
                            </span>
                            <span>
                              <svg
                                width="23"
                                height="21"
                                viewBox="0 0 23 21"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M11.5 0L14.0819 7.9463H22.4371L15.6776 12.8574L18.2595 20.8037L11.5 15.8926L4.74047 20.8037L7.32238 12.8574L0.56285 7.9463H8.91809L11.5 0Z"
                                  fill="#378CE7"
                                />
                              </svg>
                            </span>
                            <span>
                              <svg
                                width="23"
                                height="21"
                                viewBox="0 0 23 21"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M11.5 0L14.0819 7.9463H22.4371L15.6776 12.8574L18.2595 20.8037L11.5 15.8926L4.74047 20.8037L7.32238 12.8574L0.56285 7.9463H8.91809L11.5 0Z"
                                  fill="#378CE7"
                                />
                              </svg>
                            </span>
                            <span>
                              <svg
                                width="23"
                                height="21"
                                viewBox="0 0 23 21"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M11.5 0L14.0819 7.9463H22.4371L15.6776 12.8574L18.2595 20.8037L11.5 15.8926L4.74047 20.8037L7.32238 12.8574L0.56285 7.9463H8.91809L11.5 0Z"
                                  fill="#378CE7"
                                />
                              </svg>
                            </span>
                          </div>
                        </div>
                        <p>
                          "Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat. Duis aute irure dolor in
                          reprehenderit in voluptate velit esse cillum dolore eu
                          fugiat nulla pariatur. Excepteur sint{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </Tab>
                <Tab eventKey="contact2" title="More Products">
                  <div className="tab_inr">
                    <Row>
                      <Col lg={3}>
                        <div className="also_like_wrp mt-4">
                          <div className="like_item_img">
                            <img src="/images/item1.png" alt="img" />
                          </div>
                          <div className="also_content text-center">
                            <p className="mb-0 mt-3">
                              <strong>Printed T-shirt</strong>{" "}
                            </p>
                            <p>$26.00 – $29.00</p>
                            <div className="color_item d-flex justify-content-center gap-2">
                              <span className="color_circle orange"></span>
                              <span className="color_circle green"></span>
                              <p>+3</p>
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col lg={3}>
                        <div className="also_like_wrp mt-4">
                          <div className="like_item_img">
                            <img src="/images/item2.png" alt="img" />
                          </div>
                          <div className="also_content text-center">
                            <p className="mb-0 mt-3">
                              <strong>Printed T-shirt</strong>{" "}
                            </p>
                            <p>$26.00 – $29.00</p>
                            <div className="color_item d-flex justify-content-center gap-2">
                              <span className="color_circle orange"></span>
                              <span className="color_circle green"></span>
                              <p>+3</p>
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col lg={3}>
                        <div className="also_like_wrp mt-4">
                          <div className="like_item_img">
                            <img src="/images/item1.png" alt="img" />
                          </div>
                          <div className="also_content text-center">
                            <p className="mb-0 mt-3">
                              <strong>Printed T-shirt</strong>{" "}
                            </p>
                            <p>$26.00 – $29.00</p>
                            <div className="color_item d-flex justify-content-center gap-2">
                              <span className="color_circle orange"></span>
                              <span className="color_circle green"></span>
                              <p>+3</p>
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col lg={3}>
                        <div className="also_like_wrp mt-4">
                          <div className="like_item_img">
                            <img src="/images/item2.png" alt="img" />
                          </div>
                          <div className="also_content text-center">
                            <p className="mb-0 mt-3">
                              <strong>Printed T-shirt</strong>{" "}
                            </p>
                            <p>$26.00 – $29.00</p>
                            <div className="color_item d-flex justify-content-center gap-2">
                              <span className="color_circle orange"></span>
                              <span className="color_circle green"></span>
                              <p>+3</p>
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Tab>
              </Tabs>
            </div>
          </Row>
        </Container>
      </section>

      <section className="also_like">
        <div className="section_heading mb-5">
          <h1>You May Also like</h1>
        </div>
        <Container>
          <Row>
            <Col lg={3}>
              <div className="also_like_wrp">
                <div className="like_item_img">
                  <img src="/images/item1.png" alt="img" />
                </div>
                <div className="also_content text-center">
                  <p className="mb-0 mt-3">
                    <strong>Printed T-shirt</strong>{" "}
                  </p>
                  <p>$26.00 – $29.00</p>
                  <div className="color_item d-flex justify-content-center gap-2">
                    <span className="color_circle orange"></span>
                    <span className="color_circle green"></span>
                    <p>+3</p>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={3}>
              <div className="also_like_wrp">
                <div className="like_item_img">
                  <img src="/images/item2.png" alt="img" />
                </div>
                <div className="also_content text-center">
                  <p className="mb-0 mt-3">
                    <strong>Printed T-shirt</strong>{" "}
                  </p>
                  <p>$26.00 – $29.00</p>
                  <div className="color_item d-flex justify-content-center gap-2">
                    <span className="color_circle orange"></span>
                    <span className="color_circle green"></span>
                    <p>+3</p>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={3}>
              <div className="also_like_wrp">
                <div className="like_item_img">
                  <img src="/images/item1.png" alt="img" />
                </div>
                <div className="also_content text-center">
                  <p className="mb-0 mt-3">
                    <strong>Printed T-shirt</strong>{" "}
                  </p>
                  <p>$26.00 – $29.00</p>
                  <div className="color_item d-flex justify-content-center gap-2">
                    <span className="color_circle orange"></span>
                    <span className="color_circle green"></span>
                    <p>+3</p>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={3}>
              <div className="also_like_wrp">
                <div className="like_item_img">
                  <img src="/images/item2.png" alt="img" />
                </div>
                <div className="also_content text-center">
                  <p className="mb-0 mt-3">
                    <strong>Printed T-shirt</strong>{" "}
                  </p>
                  <p>$26.00 – $29.00</p>
                  <div className="color_item d-flex justify-content-center gap-2">
                    <span className="color_circle orange"></span>
                    <span className="color_circle green"></span>
                    <p>+3</p>
                  </div>
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

export default ShopDetail;
