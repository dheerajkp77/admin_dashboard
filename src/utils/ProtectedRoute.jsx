import { Navigate, Outlet } from "react-router-dom";
import useToken from "../hooks/useToken";

export const AdminAuth = () => {
  const token = useToken();
  if (token) {
    return <Outlet />;
  } else {
    return <Navigate to="/" replace={true} />;
  }
};

export const PublicAuth = () => {
  const token = useToken();

  if (token) {
    return <Navigate to="/admin/dashboard" replace={true} />;
  } else {
    return <Outlet />;
  }
};
