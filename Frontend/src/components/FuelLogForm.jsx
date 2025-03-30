import React, { useState, useEffect } from "react";
import Navbar from "./Navbar/Navbar";
import axios from "axios";

const FuelLogForm = () => {
  const [formData, setFormData] = useState({
    vehicle_id: "",
    fuel_in_liters: "",
    cost: "",
    location: "",
  });
  const [fuelLogs, setFuelLogs] = useState([]);
  const [token, setToken] = useState(null); // Track token explicitly

  // Fetch fuel logs based on driver_id || by token
  const fetchFuelLogs = async () => {
    if (!token) {
      console.log("No token found.");
      alert("No token found. Please log in again.");
      return;
    }
    try {
      const response = await axios.get(
        "http://localhost:5001/api/fuel/driver",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token to the Authorization header
          },
        }
      );
      setFuelLogs(response.data); // Set fuel logs after fetching
    } catch (error) {
      console.error("Error fetching fuel logs:", error);
      alert("Failed to fetch fuel logs.");
    }
  };

  // On initial render, set token and fetch records
  useEffect(() => {
    const storedToken = localStorage.getItem("jwtToken");
    if (storedToken) {
      setToken(storedToken); // Set token in state
    } else {
      console.log("No token in localStorage");
      alert("Please log in again.");
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchFuelLogs(); // Fetch fuel logs only if token exists
    }
  }, [token]); // Run when token changes or is retrieved

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("No token found. Please log in again.");
      return;
    }
    try {
      await axios.post("http://localhost:5001/api/fuel", formData, {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token to the Authorization header
        },
      });
      alert("Fuel log submitted successfully");
      setFormData({
        vehicle_id: "",
        fuel_in_liters: "",
        cost: "",
        location: "",
      });

      // Fetch updated fuel logs after submitting the fuel log
      fetchFuelLogs();
    } catch (error) {
      console.error("Error submitting fuel log:", error);
      alert("Failed to submit fuel log");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Navbar />
      <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg space-y-4">
        {/* Fuel Log Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Vehicle ID
            </label>
            <input
              type="number"
              name="vehicle_id"
              value={formData.vehicle_id}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Fuel in Liters
            </label>
            <input
              type="number"
              step="0.01"
              name="fuel_in_liters"
              value={formData.fuel_in_liters}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Cost</label>
            <input
              type="number"
              step="0.01"
              name="cost"
              value={formData.cost}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
          >
            Submit Fuel Log
          </button>
        </form>

        {/* Fuel Logs Table */}
        {fuelLogs.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Fuel Logs History</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 border">Vehicle ID</th>
                    <th className="px-4 py-2 border">Fuel (Liters)</th>
                    <th className="px-4 py-2 border">Cost</th>
                    <th className="px-4 py-2 border">Location</th>
                  </tr>
                </thead>
                <tbody>
                  {fuelLogs.map((log) => (
                    <tr key={log.id}>
                      <td className="px-4 py-2 border">{log.vehicle_id}</td>
                      <td className="px-4 py-2 border">{log.fuel_in_liters}</td>
                      <td className="px-4 py-2 border">{log.cost}</td>
                      <td className="px-4 py-2 border">{log.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FuelLogForm;
