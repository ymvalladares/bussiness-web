import "./App.css";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import { createHashRouter, RouterProvider } from "react-router-dom";

import Login from "./Login/Login";
import PrivateRoutes from "./Services/PrivateRoutes";
import Aplications from "./Components/Aplications";
import Failure from "./Components/Failure";

import ResetPassword from "./pages/ResetPassword";

import { ToastContainer } from "react-toastify";
import Dashboard from "./Components/Dashboard";
import Welcome from "./Components/Welcome";
import Traiding from "./Components/Traiding";
import Products from "./Components/Products";

function App() {
  return (
    <BrowserRouter basename="/bussiness-web">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/home-page/" element={<PrivateRoutes />}>
          <Route path="welcome" element={<Welcome />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="apps" element={<Aplications />} />
          <Route path="traiding" element={<Traiding />} />
          <Route path="products" element={<Products />} />
        </Route>

        <Route path="*" element={<Failure />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
