import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const handleRegister = (e) => {
    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Validate phone number
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    axios
      .post("http://localhost:5000/api/auth/register", {
        name,
        email,
        phone,
        password,
        confirmPassword,
      })
      .then((response) => {
        console.log(response.data);
        navigate("/login");
        // Handle success (e.g., navigate to login page)
      })
      .catch((error) => {
        console.error(error);
        // Handle error (e.g., show error message)
      });
  };

  return (
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 class="text-2xl font-semibold text-center mb-6">Register</h2>
        <form onSubmit={handleRegister} class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              class="mt-1 p-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500   bg-white text-black"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">
              Email:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              class="mt-1 p-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500   bg-white text-black"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">
              Phone Number:
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              class="mt-1 p-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500   bg-white text-black"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">
              Password:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              class="mt-1 p-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500   bg-white text-black"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">
              Confirm Password:
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              class="mt-1 p-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500   bg-white text-black"
            />
          </div>
          <button
            type="submit"
            class="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 "
          >
            Register
          </button>
        </form>
        <p class="text-sm text-center">Already have an account? <a href="/login" class="text-indigo-600">Login</a></p>
      </div>
    </div>
  );
}
