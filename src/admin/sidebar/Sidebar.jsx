
import React from "react";
import { NavbarBrand } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useSlider from "../../hooks/useSlider";
import AdminHeader from "../AdminHeader";
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";
import "./sidebar.scss";

const Sidebar = () => {
  const navigate = useNavigate();
  const isSlider = useSlider();

  return (
    <>
      <AdminHeader />
      <div className={isSlider ? "sidebarmain close" : "sidebarmain open"}>
        <>
          <NavbarBrand
            onClick={() => navigate("/admin/dashboard")}
            className="admin-logo"
          >
            <span
              style={{ fontSize: "32px", color: "white", cursor: "pointer" }}
            >
              LOGO
            </span>
          </NavbarBrand>
          <div className="sidelist">
            {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
          </div>
        </>
      </div>
    </>
  );
};

export default Sidebar;
