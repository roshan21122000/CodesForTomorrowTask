import type React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "./Customers.css";
import { useEffect, useState } from "react";

interface User {
  name: string;
  email: string;
  password: string;
  mobile: string;
  country: string;
  image?: string; 
}

const Customers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    setUsers(savedUsers);
  }, []);

  return (
    <div className="layout">
      <Sidebar />
      <div className="main">
        <Topbar />
        <div className="customer-container">

          <div className="left-panel">
            <h2 className="panel-title">Registered Customers</h2>

            {users.length === 0 ? (
              <p>No customers have signed up yet.</p>
            ) : (
              <div className="customer-list">
                {users.map((u, i) => (
                  <div
                    key={i}
                    className={`customer-item ${selectedUser === u ? "active" : ""}`}
                    onClick={() => setSelectedUser(u)}
                  >
                    <h3>{u.name}</h3>
                    <p>{u.email}</p>
                    <p>{u.mobile}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="right-panel">
            {selectedUser ? (
              <>
                <h2 className="panel-title">Customer Profile Template</h2>

                <div className="profile-section personal-details-box">
                  <div className="personal-left">
                    <h3>1. Personal Details</h3>
                    <p><strong>Name:</strong> {selectedUser.name}</p>
                    <p><strong>Email:</strong> {selectedUser.email}</p>
                    <p><strong>Mobile:</strong> {selectedUser.mobile}</p>
                    <p><strong>Country:</strong> {selectedUser.country}</p>
                  </div>

                  <div className="personal-right">
                    <img
                      src={
                        selectedUser.image ||
                        "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                      }
                      alt="Profile"
                    />
                  </div>
                </div>

                <div className="profile-section">
                  <h3>2. Account Details</h3>
                  <p><strong>Password:</strong> *******</p>
                </div>

                <div className="profile-section">
                  <h3>3. Additional Info</h3>
                  <p>— Add fields if needed —</p>
                </div>
              </>
            ) : (
              <p className="no-selection">Select a customer to view details</p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Customers;
