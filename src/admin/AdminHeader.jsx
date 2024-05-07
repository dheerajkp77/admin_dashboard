import { useMutation } from "@tanstack/react-query";
import React from "react";
import { Dropdown } from "react-bootstrap";
import { FaPen, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SidebarIcon } from "../SvgIcons/allIcons";
import useDetails from "../hooks/useDetails";
import useSlider from "../hooks/useSlider";
import { login } from "../redux/features/authSlice";
import { slider } from "../redux/features/sliderSlice";
import { toastAlert } from "../utils/SweetAlert";
import "./sidebar/sidebar.scss";

const AdminHeader = () => {
  const data = useDetails();
  const dispatch = useDispatch();
  const isSlider = useSlider();
  const navigate = useNavigate();

  const logoutMutation = useMutation({
    mutationFn: () => logOut(),
    onSuccess: (resp) => {
      toastAlert("success", resp.data?.message);
      localStorage.clear();
      dispatch(login());
    },
  });
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
                    src={
                      data?.profileImg
                        ? import.meta.env.VITE_IMAGE_URL + data?.profileImg
                        : "/images/profile.jpg"
                    }
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
                  onClick={() => navigate("/admin/change-password")}
                >
                  <FaPen />
                  Change Password
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={(e) => {
                    e.preventDefault();
                    logoutMutation.mutate();
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
