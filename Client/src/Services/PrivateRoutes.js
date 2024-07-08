import React from "react";
import MainPage from "../pages/MainPage";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../General/Navbar";

const PrivateRoutes = ({ conponent: component, ...rest }) => {
  const token = localStorage.getItem("TOKEN_KEY");
  return token ? <MainPage /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
