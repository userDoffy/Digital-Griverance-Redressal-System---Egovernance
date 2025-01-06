import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/auth/authSlice";

const Header = () => {
  const auth = useSelector((state) => state.auth.authenticated);
  const role = useSelector((state) => state.auth.role);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const brandText = auth
    ? role === "Admin"
      ? "Digital Griverance System - Admin"
      : "Digital Griverance - Citizen"
    : "Digital Griverance";

  const navLinks = !auth
    ? [
        { to: "/login", label: "Login" },
        { to: "/signup", label: "Signup" },
      ]
    : role === "Admin"
    ? [
        { to: "/adminDashboard", label: "Dashboard" },
        { to: "/", label: "Logout", onClick: handleLogout },
      ]
    : [
        { to: "/citizenDashboard", label: "Dashboard" },
        { to: "/", label: "Logout", onClick: handleLogout },
      ];

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          {brandText}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {navLinks.map((link, index) => (
              <li className="nav-item" key={index}>
                {link.onClick ? (
                  <button
                    className="nav-link btn btn-link text-decoration-none"
                    onClick={link.onClick}
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link className="nav-link" to={link.to}>
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
