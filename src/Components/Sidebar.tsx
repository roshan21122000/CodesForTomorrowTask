import React from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <ul className="menu">
        <li onClick={() => navigate("/dashboard")}>Dashboard</li>
        <li onClick={() => navigate("/products")}>Products</li>

        <li onClick={() => navigate("/customers")}>Customers</li>
        <li onClick={() => navigate("/review")}>Review</li>
        <li onClick={() => navigate("/payment")}>Payment</li>
        <li onClick={() => navigate("/settings")}>Settings</li>
        <li onClick={() => navigate("/")}>Logout</li>
      </ul>
    </div>
  );
};

export default Sidebar;
