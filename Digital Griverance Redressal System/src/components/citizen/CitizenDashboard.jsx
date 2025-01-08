import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CitizenDashboard = () => {
    const [grievances, setGrievances] = useState([]);
    const token = useSelector((state) => state.auth.token); // Get the token from Redux
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

    // Separate grievances into unresolved and resolved
    const unresolvedGrievances = grievances.filter((grievance) => grievance.status !== "Resolved");
    const resolvedGrievances = grievances.filter((grievance) => grievance.status === "Resolved");

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Your Grievances</h2>

            {/* Unresolved Grievances Section */}
            {unresolvedGrievances.length > 0 && (
                <>
                    <h4>Active Grievances</h4>
                    <table className="table table-striped mb-4">
                        <thead>
                            <tr>
                                <th scope="col">Title</th>
                                <th scope="col">Category</th>
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {unresolvedGrievances.map((grievance) => (
                                <tr key={grievance._id}>
                                    <td>{grievance.title}</td>
                                    <td>{grievance.category}</td>
                                    <td>
                                        <span className="badge bg-warning">{grievance.status}</span>
                                    </td>
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
                </>
            )}

            {/* Resolved Grievances Section */}
            {resolvedGrievances.length > 0 && (
                <>
                    <h4>Resolved Grievances</h4>
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
                            {resolvedGrievances.map((grievance) => (
                                <tr key={grievance._id}>
                                    <td>{grievance.title}</td>
                                    <td>{grievance.category}</td>
                                    <td>
                                        <span className="badge bg-success">{grievance.status}</span>
                                    </td>
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
                </>
            )}
        </div>
    );
};

export default CitizenDashboard;


