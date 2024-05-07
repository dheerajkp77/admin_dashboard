import React from "react";
import { Dropdown } from "react-bootstrap";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SidebarIcon } from "../SvgIcons/allIcons";
import useDetails from "../hooks/useDetails";
import useSlider from "../hooks/useSlider";
import { login } from "../redux/features/authSlice";
import { slider } from "../redux/features/sliderSlice";
import "./sidebar/sidebar.scss";

const AdminHeader = () => {
  const data = useDetails();
  const dispatch = useDispatch();
  const isSlider = useSlider();
  const navigate = useNavigate();

  return (
    <header className={isSlider ? "header close" : "header open"}>
      <ul>
        <div className="navicon">
          <span
            onClick={() => {
              if (isSlider) {
                dispatch(slider(false));
              } else {
                dispatch(slider(true));
              }
            }}
          >
            <SidebarIcon />
          </span>
        </div>
        <div className="header-right">
          <div className="admin-drop">
            <Dropdown>
              <Dropdown.Toggle id="dropdown-basic">
                <span className="img-ic">
                  <img
                    src={data?.image ? data?.image : "/images/profile.jpg"}
                    alt="Image"
                  />
                </span>
                {data?.firstName}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => navigate("/admin/profile")}>
                  <FaUser />
                  Profile
                </Dropdown.Item>

                <Dropdown.Item
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(login());
                    localStorage.clear();
                  }}
                >
                  <FaSignOutAlt />
                  Log Out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </ul>
    </header>
  );
};

export default AdminHeader;
