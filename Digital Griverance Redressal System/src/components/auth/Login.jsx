import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useForm from "../../customhooks/useForm.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../../redux/auth/authSlice'

const Login = () => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth.authenticated);
  const role = useSelector((state) => state.auth.role);
  const dispatch = useDispatch();

  const { formData, handleChange } = useForm({
    email: "",
    password: "",
    role: "Citizen",
  });

  useEffect(() => {
    if (auth) {
      navigate(role === "Admin" ? "/admin" : "/citizen");
    }
  }, [auth, role, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://digital-griverance-redressal-system.onrender.com/auth/login",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200 && response.data.status === "success") {
        dispatch(login({ token: response.data.token, role: response.data.role }));
      }
    } catch (error) {
      console.error("Error during login:", error.response?.data || error.message);
      alert("Login failed! Please check your credentials.");
    }
  };
  
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow" style={{ width: "24rem" }}>
            <div className="card-body">
              <h3 className="text-center text-primary mb-4">Login</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="role" className="form-label">
                    Role
                  </label>
                  <select
                    id="role"
                    name="role"
                    className="form-select"
                    value={formData.role}
                    onChange={handleChange}
                  >
                    <option value="Citizen">Citizen</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  {formData.role === "Admin" ? "Login as Admin" : "Login as Citizen"}
                </button>
              </form>
              <div className="text-center mt-3">
                <p className="text-muted">
                  New user?{" "}
                  <a href="/signup" className="text-primary">
                    Click here to sign up
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
