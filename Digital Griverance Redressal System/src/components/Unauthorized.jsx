// Unauthorized.jsx
import React from "react";

const Unauthorized = () => {
  return (
    <div className="container mt-5 text-center">
      <h1 className="text-danger">Access Denied</h1>
      <p>You do not have permission to view this page.</p>
      <a href="/" className="btn btn-primary mt-3">
        Go to Home
      </a>
    </div>
  );
};

export default Unauthorized;
