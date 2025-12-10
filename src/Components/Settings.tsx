import React from 'react'
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
const Settings: React.FC = () => {
  return (
   <div className="layout">
      <Sidebar />
      <div className="main">
        <Topbar />
        </div>
      
    </div>
  )
}

export default Settings
