import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [teamLeader_name, setName] = useState("");
  const [player2_name, setplayer2_name] = useState("");
  const [teamLeader_email, setEmail] = useState("");
  const [teamLeader_phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          teamLeader_name,
          teamLeader_email,
          teamLeader_phone,
          player2_name,
          password,
          confirmPassword
        }
      );

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

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Team Leader Name:
            </label>
            <input
              type="text"
              value={teamLeader_name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 p-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-white text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Player 2 Name:
            </label>
            <input
              type="text"
              value={player2_name}
              onChange={(e) => setplayer2_name(e.target.value)}
              required
              className="mt-1 p-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-white text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Team Leader Email:
            </label>
            <input
              type="email"
              value={teamLeader_email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 p-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-white text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Team Leader Phone Number:
            </label>
            <input
              type="tel"
              value={teamLeader_phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="mt-1 p-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-white text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 p-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-white text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password:
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="mt-1 p-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-white text-black"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full ${
              isLoading ? "bg-gray-400" : "bg-indigo-600"
            } text-white py-2 rounded-md hover:bg-indigo-700`}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="text-sm text-center">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-600">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
