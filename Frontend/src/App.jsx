// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login.jsx";
import Registration from "./components/Register/Registration.jsx";
import DriverDashboard from "./pages/DriverDashboard/DriverDashboard.jsx";
import TripForm from "./components/TripForm.jsx";
import MaintenanceForm from "./components/MaintenanceForm.jsx";
import FuelLogForm from "./components/FuelLogForm.jsx"; // Import FuelLogForm
import LandingPage from "./pages/LandingPage/LandingPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DriverDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/trip"
          element={
            <ProtectedRoute>
              <TripForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/maintenance"
          element={
            <ProtectedRoute>
              <MaintenanceForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/fuel-log"
          element={
            <ProtectedRoute>
              <FuelLogForm />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
