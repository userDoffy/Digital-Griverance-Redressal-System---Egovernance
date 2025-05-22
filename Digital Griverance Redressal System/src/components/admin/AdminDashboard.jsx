import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
import axios from "axios";
import { useSelector } from "react-redux";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const AdminDashboard = () => {
    const [chartData, setChartData] = useState(null);
    const token = useSelector((state) => state.auth.token);

    useEffect(() => {
        const fetchComplaintsByCategory = async () => {
            try {
                const response = await axios.get("https://digital-griverance-redressal-system.onrender.com/admin/complaintsByCategory", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = response.data.data;
                const categories = Object.keys(data);
                const counts = Object.values(data);

                setChartData({
                    labels: categories.map((category, index) => `${category} (${counts[index]})`), // Add count to label
                    datasets: [
                        {
                            label: "Complaints by Category",
                            data: counts,
                            backgroundColor: [
                                "#FF6384",
                                "#36A2EB",
                                "#FFCE56",
                                "#4CAF50",
                                "#FF9F40",
                                "#9966FF",
                            ],
                            hoverBackgroundColor: [
                                "#FF6384",
                                "#36A2EB",
                                "#FFCE56",
                                "#4CAF50",
                                "#FF9F40",
                                "#9966FF",
                            ],
                        },
                    ],
                });
            } catch (error) {
                console.error("Error fetching complaints data:", error);
            }
        };

        fetchComplaintsByCategory();
    }, [token]);

    if (!chartData) return <p>Loading...</p>;

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Admin Dashboard</h2>
            <div className="d-flex justify-content-center">
                <div style={{ width: "50%", maxWidth: "500px" }}> {/* Reduce chart size */}
                    <Pie
                        data={chartData}
                        options={{
                            responsive: true,
                            maintainAspectRatio: true,
                            plugins: {
                                legend: {
                                    position: "top",
                                    labels: {
                                        font: {
                                            size: 14, // Adjust font size
                                        },
                                    },
                                },
                            },
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
