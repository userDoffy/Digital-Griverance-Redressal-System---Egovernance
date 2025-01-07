import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const GrievanceDetails = () => {
    const { grievanceId } = useParams();  // Grievance ID from URL
    const [grievance, setGrievance] = useState(null);
    const token = useSelector((state) => state.auth.token);  // Get the token from Redux

    useEffect(() => {
        const fetchGrievanceDetails = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/citizen/getGrievance/${grievanceId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setGrievance(response.data.data); // Store grievance details in state
            } catch (error) {
                console.error("Error fetching grievance details:", error);
            }
        };
        fetchGrievanceDetails();
    }, [grievanceId, token]);

    if (!grievance) return <p>Loading...</p>;

    return (
        <div className="container mt-5">
            {/* Title and Category */}
            <div className="card mb-4">
                <div className="card-body">
                    <h3 className="card-title">{grievance.title}</h3>
                    <h5 className="card-subtitle text-muted mb-3">
                        Category: {grievance.category}
                    </h5>
                    <p>{grievance.description}</p>
                    <p><strong>Status:</strong> {grievance.status}</p>
                </div>
            </div>

            {/* Chat Interface for Responses */}
            <div className="card">
                <div className="card-header bg-primary text-white">
                    <h4>Responses</h4>
                </div>
                <div className="card-body" style={{ maxHeight: "500px", overflowY: "scroll" }}>
                    {/* Combine Admin & Citizen Responses */}
                    {[
                        ...grievance.adminresponses.map((resp) => ({
                            type: "admin",
                            message: resp.response,
                            date: resp.responseDate,
                        })),
                        ...grievance.userresponses.map((resp) => ({
                            type: "citizen",
                            message: resp.response,
                            date: resp.responseDate,
                        })),
                    ]
                        .sort((a, b) => new Date(a.date) - new Date(b.date)) // Sort responses by date
                        .map((response, index) => (
                            <div
                                key={index}
                                className={`d-flex ${
                                    response.type === "admin" ? "justify-content-end" : "justify-content-start"
                                } mb-3`}
                            >
                                <div
                                    className={`p-3 rounded message-bubble ${
                                        response.type === "admin" ? "bg-light" : "bg-info text-white"
                                    }`}
                                    style={{ maxWidth: "60%" }}
                                >
                                    <p>{response.message}</p>
                                    <small className="text-muted">
                                        {new Date(response.date).toLocaleString()}
                                    </small>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default GrievanceDetails;
