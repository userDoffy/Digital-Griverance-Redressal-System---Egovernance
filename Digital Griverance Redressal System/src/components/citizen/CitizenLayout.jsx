import { Outlet } from "react-router-dom";

const CitizenLayout = () => {
  return (
    <div>
        <Outlet /> {/* Render the nested routes here */}
    </div>
  );
};

export default CitizenLayout;

