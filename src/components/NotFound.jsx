
import React from "react";
import "./notfound.scss";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Container fluid>
      <div className="not-found">
        <div className="not_found" data-text={404}>
          <img src={"/images/not-found.gif"} />
        </div>
        <h1 className="mainhead mb-0">404 Not Found</h1>
        <button
          onClick={() => {
            navigate("/");
          }}
          className="theme-btn btn-md"
        >
          Go to Home
        </button>
      </div>
    </Container>
  );
};

export default NotFound;
