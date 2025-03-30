import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

const DriverDashboard = () => {
  return (
    <div>
      <Navbar />
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Link to TripForm page */}
          <Link
            to="/trip"
            className="bg-blue-100 p-6 rounded-lg shadow-lg hover:bg-blue-200 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">Trip Form</h2>
              <p className="text-gray-700 mb-4">
                Log your trip details including vehicle, driver, and trip
                duration.
              </p>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition">
                Start Trip
              </button>
            </div>
          </Link>

          {/* Link to MaintenanceForm page */}
          <Link
            to="/maintenance"
            className="bg-green-100 p-6 rounded-lg shadow-lg hover:bg-green-200 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">Maintenance Form</h2>
              <p className="text-gray-700 mb-4">
                Enter details of vehicle maintenance, including repairs and
                service history.
              </p>
              <button className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition">
                Start Maintenance
              </button>
            </div>
          </Link>

          {/* Link to FuelLogForm page */}
          <Link
            to="/fuel-log"
            className="bg-yellow-100 p-6 rounded-lg shadow-lg hover:bg-yellow-200 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">Fuel Log Form</h2>
              <p className="text-gray-700 mb-4">
                Log fuel details including liters, cost, and location.
              </p>
              <button className="px-4 py-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition">
                Log Fuel
              </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;
