
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Chart } from "react-google-charts";
import { useNavigate } from "react-router-dom";
import useSlider from "../../hooks/useSlider";
import Sidebar from "../sidebar/Sidebar";
import AdminFooter from "../AdminFooter";
const Dashboard = () => {
  const isSlider = useSlider();
  const navigate = useNavigate();

  const dashboardCount = useQuery({
    queryKey: ["dashboardCount"],
    queryFn: async () => {
      const resp = await adminDashboardCounts();
      return resp?.data?.data ?? "";
    },
  });
  const [selectedYear, setSelectedYear] = useState(moment().format("YYYY"));
  const [dashboard, setDashboard] = useState([]);
  useEffect(() => {
    getGraphCounts(selectedYear);
  }, [selectedYear]);

  const getGraphCounts = async (selectedYear) => {
    try {
      const response = await dashboardGraphData(selectedYear);
      if (response?.status === 200) {
        setDashboard(
          response?.data?.data?.map((data) => {
            return data;
          })
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };
  const years = Array.from(
    { length: 50 },
    (_, index) => new Date().getFullYear() - index
  );
  const headerData = ["Months", "Registered Users","Product","Booking"];
  const data = [headerData, ...dashboard];

  return (
    <div className="mainbox">
      <Sidebar />
      <div className={isSlider ? "body-content close" : "body-content open"}>
        <h2 className="mainhead">Dashboard</h2>
        <div className="dash-widget ">
          <Row>
            <Col xl={3} lg={6} md={6}>
              <div
                className="widgetcard"
                onClick={() => {
                  navigate("/admin/user-list");
                }}
              >
                <div className="value">
                  <p>Registered Users</p>
                  <h4>{dashboardCount?.data?.userCount ?? 0}</h4>
                </div>
                <div className="icon icon-two">
                <img src="../images/userss.png" alt="img" />
                </div>
              </div>
            </Col>
            <Col xl={3} lg={6} md={6}>
              <div
                className="widgetcard"
                // onClick={() => {
                //   navigate("/admin/user-list");
                // }}
              >
                <div className="value">
                  <p>Product</p>
                  <h4>{dashboardCount?.data?.productCount ?? 0}</h4>
                </div>
                <div className="icon icon-one">
                <img src="../images/box.png" alt="img" />
                </div>
              </div>
            </Col>
            <Col xl={3} lg={6} md={6}>
              <div
                className="widgetcard"
                // onClick={() => {
                //   navigate("/admin/user-list");
                // }}
              >
                <div className="value">
                  <p>Booking </p>
                  <h4>{dashboardCount?.data?.bookingCount ?? 0}</h4>
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
                  <h4>{dashboardCount?.data?.payments ?? 0}</h4>
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
              <Col xl={3} className="ms-auto mb-4">
                <select
                  value={selectedYear}
                  onChange={handleYearChange}
                  className="form-select cursor"
                >
                  {years?.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </Col>
              <Col xl={12}>
                <Chart
                  chartType="Bar"
                  width="100%"
                  height="600px"
                  data={data}
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
