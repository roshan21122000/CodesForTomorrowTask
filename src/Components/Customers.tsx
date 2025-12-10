import type React from "react"
import Sidebar from "./Sidebar"
import Topbar from "./Topbar"
import './Customers.css'
import { useEffect, useState } from "react"

interface User {
  name: string;
  email: string;
  password: string;
  mobile: string;
  country: string;
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
         <div className="customer-page">

          <div className="customer-list-section">
            <h2>Registered Customers</h2>

            {users.length === 0 ? (
              <p>No customers have signed up yet.</p>
            ) : (
              <div className="customer-list">
                {users.map((u, index) => (
                  <div
                    key={index}
                    className={`customer-card ${
                      selectedUser === u ? "active" : ""
                    }`}
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

          <div className="customer-details-section">
            {selectedUser ? (
              <>
                <h2>Customer Information</h2>
                <div className="customer-details">
                  <p><strong>Name:</strong> {selectedUser.name}</p>
                  <p><strong>Email:</strong> {selectedUser.email}</p>
                  <p><strong>Mobile:</strong> {selectedUser.mobile}</p>
                  <p><strong>Country:</strong> {selectedUser.country}</p>
                </div>
              </>
            ) : (
              <p className="no-selection">Select a customer to view details</p>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}

export default Customers
