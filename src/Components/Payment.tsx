import React from 'react'
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
const Payment: React.FC = () => {
  return (
   <div className="layout">
      <Sidebar />
      <div className="main">
        <Topbar />
        </div>
      
    </div>
  )
}

export default Payment
