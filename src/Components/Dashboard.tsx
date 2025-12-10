import React, { useState } from 'react'
import './Dashboard.css'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';
import { PieChart, Pie } from 'recharts';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const data = [
  { name: 'Mon', uv: 400, pv: 240 },
  { name: 'Tue', uv: 300, pv: 456 },
  { name: 'Wed', uv: 920, pv: 398 },
  { name: 'Thu', uv: 200, pv: 800 },
  { name: 'Fri', uv: 278, pv: 708 },
  { name: 'Sat', uv: 189, pv: 480 },
];
const data01 = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
  { name: 'Group E', value: 278 },
  { name: 'Group F', value: 189 },
];
const data02 = [
  { name: 'Group A', value: 2400 },
  { name: 'Group B', value: 4567 },
  { name: 'Group C', value: 1398 },
  { name: 'Group D', value: 9800 },
  { name: 'Group E', value: 3908 },
  { name: 'Group F', value: 4800 },
];
const Dashboard: React.FC = () => {
  // const isAnimationActive = true
  //const isAnimationActive?: boolean 
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  return (
    <div className="layout">
      <Sidebar />
      <div className="main">
        <Topbar />
        <div className="top-box-container">

          <div className="top-box">
            <h4>Earning</h4>
            <p>$ 628</p>
          </div>

          <div className="top-box">
            <h4>Share</h4>
            <p>2434</p>
          </div>

          <div className="top-box">
            <h4>Likes</h4>
            <p>1259</p>
          </div>

          <div className="top-box">
            <h4>Rating</h4>
            <p>8.5</p>
          </div>

          <div className="top-box">
            <h4>Suggestion</h4>
            <p>1367</p>
          </div>

        </div>
        <div className="date-message-container">
          <DatePicker
            showIcon
            selected={selectedDate}
            onChange={setSelectedDate}
          />
          <span className="date-message-text">
            Select a date to filter the dashboard data
          </span>
        </div>

        <div className="charts-container">
          <div className="area-chart-box">
            <AreaChart
              style={{ width: '100%', height: '320px' }}
              data={data}
              responsive
              margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                </linearGradient>
              </defs>
              <text
                x="50%"
                y={30}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="18"
                fontWeight="600"
                fill="#444"
              >
                Weekly Performance Overview
              </text>

              <text
                x="50%"
                y={55}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="12"
                fill="#666"
              >
                UV vs PV — User Engagement Trend
              </text>


              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />

              <Area
                type="monotone"
                dataKey="uv"
                stroke="#8884d8"
                fill="url(#colorUv)"
                isAnimationActive={true}
              />
              <Area
                type="monotone"
                dataKey="pv"
                stroke="#82ca9d"
                fill="url(#colorPv)"
                isAnimationActive={true}
              />
            </AreaChart>
          </div>

          <div className="pie-chart-box">
            <PieChart width={250} height={300}>
              <Pie
                data={data01}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
              />
              <Pie
                data={data02}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={90}
                outerRadius={120}
                fill="#82ca9d"
                label
              />
            </PieChart>
          </div>
        </div>


      </div>
    </div>
  )
}

export default Dashboard


