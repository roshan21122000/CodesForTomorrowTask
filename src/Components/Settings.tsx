import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "./Settings.css";

const Settings: React.FC = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoBackup, setAutoBackup] = useState(true);

  return (
    <div className="layout">
      <Sidebar />
      <div className="main">
        <Topbar />

        <div className="settings-container">
          <h2>Settings</h2>

          <div className="setting-item">
            <span>Notifications</span>
            <label className="switch">
              <input
                type="checkbox"
                checked={notifications}
                onChange={() => setNotifications(!notifications)}
              />
              <span className="slider"></span>
            </label>
          </div>

          <div className="setting-item">
            <span>Dark Mode</span>
            <label className="switch">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />
              <span className="slider"></span>
            </label>
          </div>

          <div className="setting-item">
            <span>Auto Backup</span>
            <label className="switch">
              <input
                type="checkbox"
                checked={autoBackup}
                onChange={() => setAutoBackup(!autoBackup)}
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
