import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useDetails from "../hooks/useDetails";
import { useMutation } from "@tanstack/react-query";
import { logOut } from "../services/services";
import { useDispatch } from "react-redux";
import { login } from "../redux/features/authSlice";
import { toastAlert } from "../utils/SweetAlert";

function UserSidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const details = useDetails();

  const logoutMutation = useMutation({
    mutationFn: () => logOut(),
    onSuccess: (resp) => {
      toastAlert("success", resp.data?.message);
      dispatch(login(""));
      navigate("/");
    },
  });

  return (
    <div>
      <div className="user_sidebar">
        <div className="profile_wrp">
          <img
            src={
              details?.profileImg
                ? import.meta.env.VITE_IMAGE_URL + details?.profileImg
                : "/images/profile.jpg"
            }
            alt="img"
          />
          <p>{details?.firstName} </p>
        </div>
        <div className="sidebar_list">
          <ul>
            <li>
              <NavLink to="/profile">
                <img src="/images/user.png" alt="img" />
                My Profile
              </NavLink>
            </li>
            <li>
              <NavLink to="/address">
                <img src="/images/qd.png" alt="img" />
                Address
              </NavLink>
            </li>
            <li>
              <NavLink to="/card">
                <img src="/images/qd.png" alt="img" />
                Card
              </NavLink>
            </li>
            <li>
              <NavLink to="/my-order">
                <img src="/images/qd.png" alt="img" /> My Orders
              </NavLink>
            </li>
            <li>
              <NavLink to="/notification">
                <img src="/images/noti.png" alt="img" />
                Notification
              </NavLink>
            </li>
            <li>
              <Link
                onClick={(e) => {
                  e.preventDefault();
                  logoutMutation.mutate();
                }}
              >
                <img src="/images/logout.png" alt="img" />
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default UserSidebar;
