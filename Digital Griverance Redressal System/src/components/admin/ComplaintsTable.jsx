import React from "react";
import { useNavigate } from "react-router-dom";

const ComplaintsTable = ({ complaints, title }) => {
  const navigate = useNavigate();

  // Separate complaints into unresolved and resolved
  const unresolvedComplaints = complaints.filter(
    (complaint) => complaint.status !== "Resolved"
  );
  const resolvedComplaints = complaints.filter(
    (complaint) => complaint.status === "Resolved"
  );

  // Navigate to grievance details page
  const handleExpand = (grievanceId) => {
    navigate(`/admin/chat/${grievanceId}`);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">{title}</h2>

      {/* Unresolved Complaints Section */}
      {unresolvedComplaints.length > 0 && (
        <>
          <h4>Active Complaints</h4>
          <table className="table table-striped mb-4">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {unresolvedComplaints.map((complaint) => (
                <tr key={complaint._id}>
                  <td>{complaint.title}</td>
                  <td>{complaint.category}</td>
                  <td>
                    <span className="badge bg-warning">{complaint.status}</span>
                  </td>
                  <td>
                    <button
                      className="btn btn-info btn-sm"
                      onClick={() => handleExpand(complaint._id)}
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

      {/* Resolved Complaints Section */}
      {resolvedComplaints.length > 0 && (
        <>
          <h4>Resolved Complaints</h4>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {resolvedComplaints.map((complaint) => (
                <tr key={complaint._id}>
                  <td>{complaint.title}</td>
                  <td>{complaint.category}</td>
                  <td>
                    <span className="badge bg-success">{complaint.status}</span>
                  </td>
                  <td>
                    <button
                      className="btn btn-info btn-sm"
                      onClick={() => handleExpand(complaint._id)}
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

export default ComplaintsTable;
