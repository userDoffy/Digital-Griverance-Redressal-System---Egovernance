import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div>
        <Outlet /> {/* Render the nested routes here */}
    </div>
  );
};

export default AdminLayout;

