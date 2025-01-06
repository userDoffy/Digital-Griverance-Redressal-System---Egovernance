import React from "react";
import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("authToken");
  let userRole = null;

  try {
    if (token) {
      const decoded = jwtDecode(token);
      userRole = decoded.role;
      // Optional: Check token expiry
      if (decoded.exp * 1000 < Date.now()) {
        throw new Error("Token expired");
      }
    }
  } catch (error) {
    console.error("Invalid or expired token:", error);
    return <Navigate to="/login" />;
  }

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;
