import React, { useState } from 'react'
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import './Payment.css';
interface Transaction {
  id: number;
  name: string;
  amount: string;
  status: "completed" | "pending" | "rejected";
  date: string;
  paymentId: string | number;
}

const data : Transaction[] = [
  {
    id: 1,
    name: 'Roshan',
    amount: '$45',
    status: 'completed',
    date: '3/12/25',
    paymentId: '1223456',
  },
  {
    id: 2,
    name: 'Geetanshu',
    amount: '$50',
    status: 'rejected',
    date: '8/12/25',
    paymentId: '78562356',
  },
  {
    id: 3,
    name: 'Mahima',
    amount: '$145',
    status: 'pending',
    date: '10/12/25',
    paymentId: 17525343,
  },
   {
    id: 4,
    name: 'Yash',
    amount: '$72',
    status: 'completed',
    date: '11/11/25',
    paymentId: '575634636',
  },
   {
    id: 5,
    name: 'Rani',
    amount: '$420',
    status: 'rejected',
    date: '3/11/25',
    paymentId: '965555456',
  },

]
const Payment: React.FC = () => {
  const[filter, setFilter] = useState<"all" | "completed" | "rejected" | "pending">("all");
  const filteredData =  filter === "all" ? data : data.filter((item) => item.status === filter);
  return (
    <div className="layout">
      <Sidebar />
      <div className="main">
        <Topbar />

       <div className='transaction-page'>
        <h2>Transaction History</h2>
        <div className='btn'>
          <button onClick={() => setFilter("all")}>All</button>
          <button onClick={() => setFilter("completed")}>Completed</button>
          <button onClick={() => setFilter("pending")}>Pending</button>
          <button onClick={() => setFilter("rejected")}>Rejected</button>
        </div>
        <table className='transaction-table'>

          <thead>
            <tr>  
              <th>Id</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
              <th>Payment Id</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.amount}</td>
                <td>{item.status}</td>
                <td>{item.date}</td>
                <td>{item.paymentId}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  )
}

export default Payment
