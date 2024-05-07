
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { FaFilter, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import Select from "react-select";
import Footer from "../components/Footer";
import { userProductList } from "../services/services";
import Loader from "../utils/Loader";
import { constant } from "../utils/constants";
import "./shop.scss";

const Shop = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState([]);
  const [material, setMaterial] = useState("");
  const [type, setType] = useState("");
  const [size, setSize] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState("");

  const {
    data: productList,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["productList"],
    queryFn: async () => {
      let body = {
        search,
        category: category?.map((i) => i.value),
        material: material,
        type: type,
        minPrice: minPrice,
        maxPrice: maxPrice,
        size: size?.map((i) => i.value),
      };
      const resp = await userProductList(body);
      return resp.data?.data;
    },
  });

  const options = [
    { label: "XS", value: "XS" },
    { label: "S", value: "S" },
    { label: "M", value: "M" },
    { label: "L", value: "L" },
    { label: "XL", value: "XL" },
    { label: "XXL", value: "XXL" },
    { label: "XXXL", value: "XXXL" },
  ];

  return (
    <>
      <section className="page_head">
        <Container>
          <h2>
            Home/<span>Shop</span>
          </h2>
        </Container>
      </section>
      <section className="shop_section">
        <Container>
          <Row>
            <Col lg={3}>
              <div className="shop_sidebar">
                <div className="sidebar_search">
                  <Form>
                    <Form.Group className="mb-3 search">
                      <Form.Control
                        type="text"
                        placeholder="Search..."
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                      />

                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M21.0002 21L16.6572 16.657M16.6572 16.657C17.4001 15.9141 17.9894 15.0322 18.3914 14.0615C18.7935 13.0909 19.0004 12.0506 19.0004 11C19.0004 9.94939 18.7935 8.90908 18.3914 7.93845C17.9894 6.96782 17.4001 6.08588 16.6572 5.34299C15.9143 4.6001 15.0324 4.01081 14.0618 3.60877C13.0911 3.20672 12.0508 2.99979 11.0002 2.99979C9.9496 2.99979 8.90929 3.20672 7.93866 3.60877C6.96803 4.01081 6.08609 4.6001 5.34321 5.34299C3.84288 6.84332 3 8.87821 3 11C3 13.1218 3.84288 15.1567 5.34321 16.657C6.84354 18.1573 8.87842 19.0002 11.0002 19.0002C13.122 19.0002 15.1569 18.1573 16.6572 16.657Z"
                          stroke="#8E8E8E"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Form.Group>
                  </Form>
                </div>
                <div className="sidebar_inr">
                  <h4>Categories</h4>
                  <Select
                    isMulti
                    options={[
                      { label: "Male", value: String(constant.MALE) },
                      { label: "Female", value: String(constant.FEMALE) },
                      { label: "Unisexual", value: String(constant.UNISEX) },
                    ]}
                    value={category}
                    onChange={setCategory}
                  />
                </div>
                <div className="sidebar_inr">
                  <h4>Material</h4>
                  <Form.Control
                    placeholder="Material..."
                    value={material}
                    onChange={(e) => setMaterial(e.target.value)}
                  />
                </div>
                <div className="sidebar_inr">
                  <h4>T-Shirt Type</h4>
                  <Form.Control
                    placeholder="T-Shirt..."
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  />
                </div>
                <div className="sidebar_inr">
                  <h4>Size</h4>
                  <Select
                    options={options}
                    isMulti
                    value={size}
                    onChange={setSize}
                  />
                </div>
                <div className="sidebar_inr">
                  <h4>Min Price</h4>
                  <Form.Control
                    placeholder="Min Price..."
                    value={minPrice}
                    type="number"
                    min={0}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                </div>
                <div className="sidebar_inr">
                  <h4>Max Price</h4>
                  <Form.Control
                    type="number"
                    placeholder="Max Price..."
                    value={maxPrice}
                    min={minPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </div>

                <div className="d-flex gap-1">
                  <button
                    className="btn-theme"
                    title="Filter"
                    onClick={(e) => {
                      e.preventDefault();
                      refetch();
                    }}
                  >
                    <FaFilter />
                  </button>
                  <button
                    className="btn-theme"
                    title="Reset Filter"
                    onMouseUpCapture={(e) => {
                      e.preventDefault();
                      setCategory([]);
                      setSearch("");
                      setMaterial("");
                      setType("");
                      setSize([]);
                      setMinPrice("");
                      setMaxPrice("");
                      setTimeout(() => {
                        refetch();
                      }, 100);
                    }}
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>
            </Col>
            <Col lg={9}>
              <div className="shop_items_main">
                <Row>
                  {productList?.length > 0 ? (
                    productList?.map((data) => {
                      return (
                        <Col key={data?._id} lg={4}>
                          <Link to={"/shop-detail/" + data?._id}>
                            <div className="shop_item">
                              <div className="shop_img">
                                <img
                                  src={
                                    import.meta.env.VITE_IMAGE_URL +
                                    data?.images?.at(0)
                                  }
                                  alt="img"
                                />
                              </div>
                              <div className="shop_content">
                                <span>
                                  <strong>{data?.title}</strong>
                                </span>
                                <p>$ {data?.price}</p>
                              </div>
                            </div>
                          </Link>
                        </Col>
                      );
                    })
                  ) : (
                    <h4 className="text-center">Product not found!!</h4>
                  )}
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Footer />
      {isLoading && <Loader />}
    </>
  );
};

export default Shop;
