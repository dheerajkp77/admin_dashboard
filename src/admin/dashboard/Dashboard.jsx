import React from "react";
import { Col, Row } from "react-bootstrap";
import { Chart } from "react-google-charts";
import { useNavigate } from "react-router-dom";
import useSlider from "../../hooks/useSlider";
import AdminFooter from "../AdminFooter";
import Sidebar from "../sidebar/Sidebar";
const Dashboard = () => {
  const isSlider = useSlider();

  const data = [
    ["Year", "Sales", "Expenses", "Profit"],
    ["2020", 1000, 400, 200],
    ["2021", 1170, 460, 250],
    ["2022", 660, 1120, 300],
    ["2023", 1030, 540, 350],
  ];

  const options = {
    chart: {
      title: "Company Performance",
      subtitle: "Sales, Expenses, and Profit: 2020-2024",
    },
  };

   const PIdata = [
    ["Product", "Sales"],
    ["Product1", 11],
    ["Product2", 2],
    ["Product3", 5],
  ];
  
   const PIoptions = {
    title: "Product Sales",
    pieHole: 0.4,
    is3D: false,
  };

  return (
    <div className="mainbox">
      <Sidebar />
      <div className={isSlider ? "body-content close" : "body-content open"}>
        <h2 className="mainhead">Dashboard</h2>
        <div className="dash-widget ">
          <Row>
            <Col xl={3} lg={6} md={6}>
              <div className="widgetcard">
                <div className="value">
                  <p>Users</p>
                  <h4>{10}</h4>
                </div>
                <div className="icon icon-two">
                  <img src="../images/userss.png" alt="img" />
                </div>
              </div>
            </Col>
            <Col xl={3} lg={6} md={6}>
              <div className="widgetcard">
                <div className="value">
                  <p>Product</p>
                  <h4>{15}</h4>
                </div>
                <div className="icon icon-one">
                  <img src="../images/box.png" alt="img" />
                </div>
              </div>
            </Col>
            <Col xl={3} lg={6} md={6}>
              <div className="widgetcard">
                <div className="value">
                  <p>Booking </p>
                  <h4>{12}</h4>
                </div>
                <div className="icon icon-three">
                  <img src="../images/booking.png" alt="img" />
                </div>
              </div>
            </Col>
            <Col xl={3} lg={6} md={6}>
              <div className="widgetcard">
                <div className="value">
                  <p>Payments</p>
                  <h4>{5}</h4>
                </div>
                <div className="icon icon-four">
                  <img src="../images/credit-card.png" alt="img" />
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div className="inner-wrap">
          <div className="custom-card">
            <Row>
              <Col xl={6}>
                <Chart
                  chartType="Bar"
                  width="100%"
                  height="400px"
                  data={data}
                  options={options}
                />
              </Col>
              <Col xl={6}>
                <Chart
                  chartType="PieChart"
                  width="100%"
                  height="400px"
                  data={PIdata}
                  options={PIoptions}
                />
              </Col>
            </Row>
          </div>
        </div>
      </div>
      <AdminFooter />
    </div>
  );
};

export default Dashboard;
