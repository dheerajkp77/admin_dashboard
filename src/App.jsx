import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Privacy from "./allcms/ Privacy";
import About from "./allcms/About";
import Terms from "./allcms/Terms";
import Login from "./authentication/Login";
import Contact from "./contact/Contact";
import AdminRoute from "./routes/AdminRoute";
import { AdminAuth, PublicAuthWithoutHeader } from "./utils/ProtectedRoute";
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

        {/********************Public Routes without Header****************/}
        <Route path="*" element={<PublicAuthWithoutHeader />}>          
          <Route path="" element={<Login />} />          
        </Route>

        {/*************************All Public Routes*********************/}
        <Route path="privacy-policy" element={<Privacy />} />
        <Route path="terms-conditions" element={<Terms />} />
        <Route path="about-us" element={<About />} />
        <Route path="contact" element={<Contact />} />        
      </Routes>
    </>
  );
}

export default App;
