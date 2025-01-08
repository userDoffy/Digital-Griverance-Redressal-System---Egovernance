import React, { useEffect, useState } from "react";
import axios from "axios";
import ComplaintsTable from "./ComplaintsTable";
import { useSelector } from "react-redux";

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get("http://localhost:3000/admin/allComplaints", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setComplaints(response.data.data);
      } catch (error) {
        console.error("Error fetching all complaints:", error);
      }
    };

    fetchComplaints();
  }, [token]);

  return <ComplaintsTable complaints={complaints} title="All Complaints" />;
};

export default Complaints;
