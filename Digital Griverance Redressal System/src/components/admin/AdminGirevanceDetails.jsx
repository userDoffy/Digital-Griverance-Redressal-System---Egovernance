import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "../ChatBox.css";

const AdminGrievanceDetails = () => {
    const { grievanceId } = useParams();
    const [grievance, setGrievance] = useState(null);
    const [newMessage, setNewMessage] = useState("");
    const token = useSelector((state) => state.auth.token);

    // Fetch grievance details
    useEffect(() => {
        const fetchGrievanceDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/admin/getGrievance/${grievanceId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setGrievance(response.data.data);
            } catch (error) {
                console.error("Error fetching grievance details:", error);
            }
        };
        fetchGrievanceDetails();
    }, [grievanceId, token]);

    // Send a new admin message
    const sendMessage = async () => {
        if (!newMessage.trim()) return;

        try {
            const response = await axios.post(
                `http://localhost:3000/admin/addAdminResponse/${grievanceId}`,
                { response: newMessage },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setGrievance((prev) => ({
                ...prev,
                adminresponses: [...prev.adminresponses, response.data.response],
            }));
            setNewMessage("");
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    // Close the issue and mark it as resolved
    const closeIssue = async () => {
        try {
            const response = await axios.patch(
                `http://localhost:3000/admin/closeGrievance/${grievanceId}`,
                { status: "Resolved" },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setGrievance((prev) => ({
                ...prev,
                status: response.data.status,
            }));
        } catch (error) {
            console.error("Error closing the issue:", error);
        }
    };

    if (!grievance) return <p>Loading...</p>;

    // Combine and sort all messages by time
    const allMessages = [
        ...grievance.adminresponses.map((res) => ({ ...res, type: "admin" })),
        ...grievance.userresponses.map((res) => ({ ...res, type: "citizen" })),
    ].sort((a, b) => new Date(a.responseDate) - new Date(b.responseDate));

    const isResolved = grievance.status === "Resolved";

    return (
        <div className="chat-container">
            <h2 className="chat-header">{grievance.title}</h2>
            <p className="text-muted">{grievance.description}</p>
            <div className="chat-box">
                {allMessages.map((message, index) => (
                    <div
                        key={index}
                        className={`chat-message ${message.type}`}
                    >
                        <div className="message-content">
                            {message.response}
                            <div className="message-timestamp">
                                {new Date(message.responseDate).toLocaleString()}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {!isResolved ? (
                <>
                    <div className="mt-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Type your message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                        />
                        <button
                            className="btn btn-primary mt-2"
                            onClick={sendMessage}
                        >
                            Send
                        </button>
                    </div>
                    <button
                        className="btn btn-success mt-3"
                        onClick={closeIssue}
                    >
                        Close the Issue
                    </button>
                </>
            ) : (
                <p className="text-success mt-3">
                    This grievance has been resolved. No further messages can be sent.
                </p>
            )}
        </div>
    );
};

export default AdminGrievanceDetails;
