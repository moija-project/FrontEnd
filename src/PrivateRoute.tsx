import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = (): React.ReactElement => {
  return localStorage.getItem("accessToken") ? <Outlet /> : <Navigate to="/login" />;
};
