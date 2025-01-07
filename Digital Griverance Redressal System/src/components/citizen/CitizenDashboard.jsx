import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CitizenDashboard = () => {
    const [grievances, setGrievances] = useState([]);
    const token = useSelector((state) => state.auth.token);  // Get the token from Redux
    const navigate = useNavigate();

    // Fetch grievances on component mount
    useEffect(() => {
        const fetchGrievances = async () => {
            try {
                const response = await axios.post("http://localhost:3000/citizen/getGrievance", {}, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
                setGrievances(response.data.data); // Store grievances in state
            } catch (error) {
                console.error("Error fetching grievances:", error);
            }
        };
        fetchGrievances();
    }, [token]);

    // Navigate to grievance details page
    const handleExpand = (grievanceId) => {
        navigate(`/citizen/grievance/${grievanceId}`);
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Your Grievances</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Category</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {grievances.map((grievance) => (
                        <tr key={grievance._id}>
                            <td>{grievance.title}</td>
                            <td>{grievance.category}</td>
                            <td>{grievance.status}</td>
                            <td>
                                <button
                                    className="btn btn-info btn-sm"
                                    onClick={() => handleExpand(grievance._id)}
                                >
                                    View Details
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CitizenDashboard;
