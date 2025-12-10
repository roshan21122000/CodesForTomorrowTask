import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignupLogin from "./Components/SignupLogin";
import Dashboard from "./Components/Dashboard";
import Payment from "./Components/Payment";
import Products from "./Components/Products"
import Customers from "./Components/Customers";
import Review from "./Components/Review";
import Settings from "./Components/Settings";


const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<SignupLogin />} />
      <Route path="/dashboard" element={<Dashboard />} />
       <Route path="/payment" element={<Payment />} />
       <Route path="/products" element={<Products />} />
       <Route path="/customers" element={<Customers />} />
       <Route path="/review" element={<Review />} />
       <Route path="/settings" element={<Settings />} />
     
    </Routes>
  );
};

export default App;
