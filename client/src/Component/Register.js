import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BaseUrl from "../BaseUrl";

export default function Register() {
  const [teamLeader_name, setName] = useState("");
  const [player2_name, setplayer2_name] = useState("");
  const [teamLeader_email, setEmail] = useState("");
  const [teamLeader_phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeInputs, setActiveInputs] = useState([]);
  const navigate = useNavigate();

  const openLogin = () => {
    navigate("/login");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(teamLeader_email)) {
      alert("Please enter a valid email address.");
      setIsLoading(false);
      return;
    }

    // Validate phone number
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(teamLeader_phone)) {
      alert("Please enter a valid 10-digit phone number.");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${BaseUrl}/api/auth/register`, {
        teamLeader_name,
        teamLeader_email,
        teamLeader_phone,
        player2_name,
        password,
        confirmPassword,
      });

      console.log(response.data);
      navigate("/login");
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response?.data?.message ||
        "Registration failed. Please try again.";
      alert(errorMessage); // Notify the user of the error
    } finally {
      setIsLoading(false);
    }
  };

  const handleFocus = (index) => {
    setActiveInputs((prev) => [...new Set([...prev, index])]);
  };

  const handleBlur = (index) => {
    setActiveInputs((prev) => prev.filter((i) => i !== index));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Register
        </h2>
        <form onSubmit={handleRegister} className="space-y-6">
          {/* Team Leader Name */}
          <div
            className={`input-container ${
              activeInputs.includes(0) ? "active" : ""
            }`}
          >
            <label className="block font-medium text-gray-200">
              Team Leader Name:
            </label>
            <input
              type="text"
              value={teamLeader_name}
              onChange={(e) => setName(e.target.value)}
              required
              onFocus={() => handleFocus(0)}
              onBlur={() => handleBlur(0)}
              className="mt-1 p-3 w-full border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 border-gray-700 bg-gray-1000 text-gray-200"
            />
          </div>

          {/* Player 2 Name */}
          <div
            className={`input-container ${
              activeInputs.includes(1) ? "active" : ""
            }`}
          >
            <label className="block font-medium text-gray-200">
              Player 2 Name:
            </label>
            <input
              type="text"
              value={player2_name}
              onChange={(e) => setplayer2_name(e.target.value)}
              required
              onFocus={() => handleFocus(1)}
              onBlur={() => handleBlur(1)}
              className="mt-1 p-3 w-full border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 border-gray-700 bg-gray-1000 text-gray-200"
            />
          </div>

          {/* Team Leader Email */}
          <div
            className={`input-container ${
              activeInputs.includes(2) ? "active" : ""
            }`}
          >
            <label className="block font-medium text-gray-200">
              Team Leader Email:
            </label>
            <input
              type="email"
              value={teamLeader_email}
              onChange={(e) => setEmail(e.target.value)}
              required
              onFocus={() => handleFocus(2)}
              onBlur={() => handleBlur(2)}
              className="mt-1 p-3 w-full border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 border-gray-700 bg-gray-1000 text-gray-200"
            />
          </div>

          {/* Team Leader Phone Number */}
          <div
            className={`input-container ${
              activeInputs.includes(3) ? "active" : ""
            }`}
          >
            <label className="block font-medium text-gray-200">
              Team Leader Phone Number:
            </label>
            <input
              type="tel"
              value={teamLeader_phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              onFocus={() => handleFocus(3)}
              onBlur={() => handleBlur(3)}
              className="mt-1 p-3 w-full border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 border-gray-700 bg-gray-1000 text-gray-200"
            />
          </div>

          {/* Password */}
          <div
            className={`input-container ${
              activeInputs.includes(4) ? "active" : ""
            }`}
          >
            <label className="block font-medium text-gray-200">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              onFocus={() => handleFocus(4)}
              onBlur={() => handleBlur(4)}
              className="mt-1 p-3 w-full border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 border-gray-700 bg-gray-1000 text-gray-200"
            />
          </div>

          {/* Confirm Password */}
          <div
            className={`input-container ${
              activeInputs.includes(5) ? "active" : ""
            }`}
          >
            <label className="block font-medium text-gray-200">
              Confirm Password:
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              onFocus={() => handleFocus(5)}
              onBlur={() => handleBlur(5)}
              className="mt-1 p-3 w-full border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 border-gray-700 bg-gray-1000 text-gray-200"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full ${
              isLoading ? "bg-gray-400" : "bg-gray-600"
            } text-white py-3 rounded-lg hover:bg-cyan-500 transition duration-300 ease-in-out`}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="text-center text-gray-200 mt-4">
          Already have an account?{" "}
          <button className="text-cyan-400 hover:underline" onClick={openLogin}>
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
