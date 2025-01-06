import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useForm from "../../customhooks/useForm.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector, useDispatch } from 'react-redux'

const Signup = () => {
    const navigate = useNavigate();
    const auth = useSelector((state) => state.auth.authenticated);
    const role = useSelector((state) => state.auth.role);
  
    const { formData, handleChange } = useForm({
      name: "",
      email: "",
      password: "",
      role: "Citizen",
    });

    useEffect(() => {
      if (auth) {
        navigate(role === "Admin" ? "/adminDashboard" : "/citizenDashboard");
      }
    }, [auth, role, navigate]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.post(
          "http://localhost:3000/auth/signup",
          formData,
          { headers: { "Content-Type": "application/json" } }
        );
        if(formData.role==="Admin"){
            alert("Signup successful! You can login after admin approval.");
        }
        else{
            alert("Signup successful! You can login now.");
        }
        navigate("/");
      } catch (error) {
        console.error("Error during signup:", error.response?.data || error.message);
        alert("Signup failed! Please try again.");
      }
    };
  
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow" style={{ width: "24rem" }}>
                        <div className="card-body">
                            <h3 className="text-center text-primary mb-4">Signup</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="form-control"
                                        placeholder="Enter your name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>
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
                                    Sign Up
                                </button>
                            </form>
                            <div className="text-center mt-3">
                                <p className="text-muted">
                                    Already have an account?{" "}
                                    <a href="/login" className="text-primary">
                                        Click here to log in
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

export default Signup;
