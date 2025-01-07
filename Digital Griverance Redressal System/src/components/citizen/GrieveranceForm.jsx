import React from "react";
import useForm from "../../customhooks/useForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const GrievanceForm = () => {
    const { formData, handleChange } = useForm({
        title: "",
        category: "Public Infrastructure Issues",
        description: "",
    });
    const navigate = useNavigate();
    const token = useSelector((state) => state.auth.token);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:3000/citizen/addGrievance",
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.status === 201) {
                alert(response.data?.message)
            }
            navigate("/citizen/dashboard");
        } catch (error) {
            console.error("Error during submission:", error.response?.data || error.message);
            alert("Submissionn Failed!! Please try again.");
        }
    };

    const complaint_categories = ["Public Infrastructure Issues", "Municipal and Civic Services", "Electricity and Power Supply", "Water and Environment", "Health and Medical Services", "Education and Schools", "Law and Order", "Transport and Public Services", "Digital Services", "Welfare Schemes", "Employment and Labor", "Housing and Urban Development", "Telecommunications and Internet", "Taxation and Revenue", "Corruption and Malpractices", "General Complaint",];

    return (
        <>
            <div
                className="form-container"
                style={{
                    background: "white",
                    padding: "2rem",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
            >
                <h2 className="text-center mb-3">New Grievance Ticket</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">
                            Title
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            placeholder="Enter title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="category" className="form-label">
                            Category
                        </label>
                        <select
                            className="form-select"
                            id="category"
                            name="category"
                            onChange={handleChange}
                            value={formData.category}
                            required
                        >
                            {complaint_categories.map((complaint, index) => (
                                <option key={index} value={complaint}>
                                    {complaint}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">
                            Description
                        </label>
                        <textarea
                            className="form-control"
                            id="description"
                            name="description"
                            rows="8"
                            placeholder="Enter detailed description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default GrievanceForm;
