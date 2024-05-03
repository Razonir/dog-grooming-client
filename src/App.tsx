import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home.tsx";
import Login from "./Pages/Login/Login.tsx";
import Signup from "./Pages/Signup/Signup.tsx";
import Admin from "./Pages/Admin/Admin.tsx";
import AddAppointment from "./Pages/AddAppointment/AddAppointment.tsx";
import Dashboard from "./Pages/Dashboard/Dashboard.tsx";
import PrivateRoute from "./Components/PrivateRoute.tsx";
import AdminRoute from "./Components/AdminRoute.tsx";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/add" element={<PrivateRoute element={<AddAppointment />} />} />
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/admin" element={<AdminRoute element={<Admin />} />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}
