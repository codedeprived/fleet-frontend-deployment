import React, { useState, useEffect } from "react";
import Navbar from "./Navbar/Navbar";
import axios from "axios";

const TripForm = () => {
  const [formData, setFormData] = useState({
    start_location: "",
    end_location: "",
    start_time: "",
    end_time: "",
    distance_km: "",
    purpose: "",
  });
  const [tripRecords, setTripRecords] = useState([]);
  const [token, setToken] = useState(null);
  const [assignedVehicle, setAssignedVehicle] = useState(null);

  // Fetch assigned vehicle
  const fetchAssignedVehicle = async () => {
    try {
      response = getFleetByDriverId(driverId);
      setAssignedVehicle(response.data.vehicle); // Expecting { vehicle_id, vehicle_number, current_reading }
    } catch (error) {
      console.error("Error fetching assigned vehicle:", error);
    }
  };

  const fetchTripRecords = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5001/api/trip/driver",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTripRecords(response.data);
    } catch (error) {
      console.error("Error fetching trip records:", error);
      alert("Failed to fetch trip records");
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("jwtToken");
    if (storedToken) {
      setToken(storedToken);
    } else {
      alert("Please log in again.");
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchAssignedVehicle();
      fetchTripRecords();
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!assignedVehicle) {
      alert("No assigned vehicle found. Cannot submit trip.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5001/api/trip",
        {
          ...formData,
          vehicle_id: assignedVehicle.vehicle_id, // Include assigned vehicle ID
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Trip record submitted successfully");
      setFormData({
        start_location: "",
        end_location: "",
        start_time: "",
        end_time: "",
        distance_km: "",
        purpose: "",
      });

      fetchTripRecords();
      fetchAssignedVehicle(); // Refresh vehicle reading
    } catch (error) {
      console.error("Error submitting trip record:", error);
      alert("Failed to submit trip record");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Navbar />
      <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6">
        {assignedVehicle ? (
          <>
            <div className="bg-green-100 text-green-800 p-4 rounded-lg">
              <p>
                <strong>Assigned Vehicle:</strong>{" "}
                {assignedVehicle.vehicle_number}
              </p>
              <p>
                <strong>Current Odometer:</strong>{" "}
                {assignedVehicle.current_reading} km
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Form Fields */}
              {["start_location", "end_location"].map((field) => (
                <div key={field}>
                  <label className="block text-gray-700 font-medium mb-1">
                    {field.replace("_", " ").toUpperCase()}
                  </label>
                  <input
                    type="text"
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring focus:border-blue-300"
                    required
                  />
                </div>
              ))}

              {["start_time", "end_time"].map((field) => (
                <div key={field}>
                  <label className="block text-gray-700 font-medium mb-1">
                    {field.replace("_", " ").toUpperCase()}
                  </label>
                  <input
                    type="datetime-local"
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring focus:border-blue-300"
                    required
                  />
                </div>
              ))}

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Distance (km)
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="distance_km"
                  value={formData.distance_km}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring focus:border-blue-300"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Purpose
                </label>
                <textarea
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring focus:border-blue-300"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-300"
              >
                Submit Trip Record
              </button>
            </form>
          </>
        ) : (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg text-center">
            <p>No vehicle assigned. Please contact your administrator.</p>
          </div>
        )}

        {tripRecords.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Trip History</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border">
                <thead className="bg-gray-100">
                  <tr>
                    {[
                      "Trip ID",
                      "Start Location",
                      "End Location",
                      "Start Time",
                      "End Time",
                      "Distance (km)",
                      "Purpose",
                    ].map((header) => (
                      <th key={header} className="px-4 py-2 border">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tripRecords.map((trip) => (
                    <tr key={trip.trip_id}>
                      <td className="px-4 py-2 border">{trip.trip_id}</td>
                      <td className="px-4 py-2 border">
                        {trip.start_location}
                      </td>
                      <td className="px-4 py-2 border">{trip.end_location}</td>
                      <td className="px-4 py-2 border">
                        {new Date(trip.start_time).toLocaleString()}
                      </td>
                      <td className="px-4 py-2 border">
                        {new Date(trip.end_time).toLocaleString()}
                      </td>
                      <td className="px-4 py-2 border">{trip.distance_km}</td>
                      <td className="px-4 py-2 border">{trip.purpose}</td>
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

export default TripForm;
