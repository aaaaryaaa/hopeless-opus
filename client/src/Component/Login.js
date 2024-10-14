import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BaseUrl from "../BaseUrl";
import "./Login.css";
export default function Login() {
  const [teamLeader_email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailActive, setEmailActive] = useState(false);
  const [passwordActive, setPasswordActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const openSignup = () => {
    navigate("/register");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMessage("");

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(teamLeader_email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    axios
      .post(`${BaseUrl}/api/auth/login`, {
        teamLeader_email,
        password,
      })
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("token", response.data.token);
        navigate("/play");
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage("Login failed. Please check your credentials.");
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black relative overflow-hidden">
      <div className="bg-gray-900 backdrop-blur-md p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email Input with Animation */}
          <div
            className={`input-container ${
              emailActive || teamLeader_email ? "active" : ""
            }`}
          >
            <label className="block font-medium text-gray-200">
              Team Leader Email:
            </label>
            <input
              type="email"
              value={teamLeader_email}
              onFocus={() => setEmailActive(true)}
              onBlur={() => setEmailActive(false)}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 p-3 w-full border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 border-gray-700 bg-gray-1000 text-gray-200"
            />
          </div>

          {/* Password Input with Animation */}
          <div
            className={`input-container ${
              passwordActive || password ? "active" : ""
            }`}
          >
            <label className="block font-medium text-gray-200">Password:</label>
            <input
              type="password"
              value={password}
              onFocus={() => setPasswordActive(true)}
              onBlur={() => setPasswordActive(false)}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 p-3 w-full border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 border-gray-700 bg-gray-1000 text-gray-200"
            />
          </div>

          {/* Error Message */}
          {errorMessage && (
            <p className="text-red-500 text-sm text-center">{errorMessage}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gray-600 text-white py-3 rounded-lg hover:bg-cyan-500 transition duration-300 ease-in-out"
          >
            Login
          </button>

          {/* Sign-up Redirect */}
          <p className="text-center text-gray-200">
            Don&apos;t have an account?{" "}
            <button
              type="button"
              className="text-cyan-400 hover:underline"
              onClick={openSignup}
            >
              Register
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
