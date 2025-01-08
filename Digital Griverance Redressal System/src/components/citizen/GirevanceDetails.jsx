import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "../Chatbox.css";

const GrievanceDetails = () => {
    const { grievanceId } = useParams();
    const [grievance, setGrievance] = useState(null);
    const [newMessage, setNewMessage] = useState("");
    const token = useSelector((state) => state.auth.token);

    useEffect(() => {
        const fetchGrievanceDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/citizen/getGrievance/${grievanceId}`, {
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

    const sendMessage = async () => {
        if (!newMessage.trim() || grievance.status === "Resolved") return;

        try {
            const response = await axios.post(
                `http://localhost:3000/citizen/addUserResponse/${grievanceId}`,
                { response: newMessage },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setGrievance((prev) => ({
                ...prev,
                userresponses: [...prev.userresponses, response.data.response],
            }));
            setNewMessage("");
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    if (!grievance) return <p>Loading...</p>;

    const allMessages = [
        ...grievance.adminresponses.map((res) => ({ ...res, type: "admin" })),
        ...grievance.userresponses.map((res) => ({ ...res, type: "citizen" })),
    ].sort((a, b) => new Date(a.responseDate) - new Date(b.responseDate));

    return (
        <div className="chat-container">
            <h2 className="chat-header">{grievance.title}</h2>
            <p className="text-muted">{grievance.description}</p>
            <div className="chat-box">
                {allMessages.map((message, index) => (
                    <div key={index} className={`chat-message ${message.type}`}>
                        <div className="message-content">
                            {message.response}
                            <div className="message-timestamp">
                                {new Date(message.responseDate).toLocaleString()}
                            </div>
                        </div>
                    </div>
                ))}
                {grievance.status === "Resolved" && (
                    <div className="resolved-message">
                        <p>Your issue has been resolved.</p>
                    </div>
                )}
            </div>
            {grievance.status !== "Resolved" ? (
                <div className="mt-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button className="btn btn-primary mt-2" onClick={sendMessage}>
                        Send
                    </button>
                </div>
            ) : (
                <div className="chat-closed-message">
                    <p className="text-success">Chat is closed. You can no longer send messages.</p>
                </div>
            )}
        </div>
    );
};

export default GrievanceDetails;
