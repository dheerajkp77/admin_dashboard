import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Login from "./authentication/Login";
import AdminRoute from "./routes/AdminRoute";
import { AdminAuth, PublicAuth } from "./utils/ProtectedRoute";
import ScrollTop from "./utils/ScrollTop";

function App() {
  return (
    <>
      <ScrollTop />
      <Routes>
        {/******************************Admin Routes*********************/}
        <Route path="*" element={<AdminAuth />}>
          <Route path="admin/*" element={<AdminRoute />} />
        </Route>

        {/*************************All Public Routes*********************/}
        <Route path="*" element={<PublicAuth />}>          
          <Route path="" element={<Login />} />          
        </Route>
            
      </Routes>
    </>
  );
}

export default App;
