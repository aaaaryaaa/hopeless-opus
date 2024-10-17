import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import BaseUrl from "../BaseUrl";

export default function Register() {
  const [teamId, setTeamId] = useState("");
  const [teamLeader_name, setTeamLeaderName] = useState("");
  const [teamLeader_email, setTeamLeaderEmail] = useState("");
  const [teamLeader_phone, setTeamLeaderPhone] = useState("");
  const [teamLeader_registrationNumber, setTeamLeaderRegistrationNumber] =
    useState("");
  const [teamLeader_institute, setTeamLeaderInstitute] = useState("");
  const [teamLeader_delegateId, setTeamLeaderDelegateId] = useState("");
  const [player2_name, setPlayer2Name] = useState("");
  const [player2_registrationNumber, setPlayer2RegistrationNumber] =
    useState("");
  const [player2_phone, setPlayer2Phone] = useState("");
  const [player2_institute, setPlayer2Institute] = useState("");
  const [player2_delegateId, setPlayer2DelegateId] = useState("");
  const [player2_email, setPlayer2Email] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`${BaseUrl}/api/auth/register`, {
        teamId,
        teamLeader_name,
        teamLeader_email,
        teamLeader_phone,
        teamLeader_registrationNumber,
        teamLeader_institute,
        teamLeader_delegateId,
        player2_name,
        player2_phone,
        player2_email,
        player2_registrationNumber,
        player2_institute,
        player2_delegateId,
        password,
        confirmPassword,
      });

      toast.success("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response?.data?.message ||
        "Registration failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <ToastContainer />
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Register
        </h2>
        <form onSubmit={handleRegister} className="space-y-4">
          {/* Team ID */}
          <div className="flex justify-between mb-4">
            <label className="block font-medium text-gray-200 w-1/3">
              Team ID:
            </label>
            <input
              type="text"
              value={teamId}
              onChange={(e) => setTeamId(e.target.value)}
              required
              className="mt-1 p-3 w-2/3 border rounded-lg"
            />
          </div>
          {/* Team Leader Details */}
          <h3 className="text-xl font-semibold text-gray-200 mb-2">
            Team Leader Details
          </h3>
          <div className="flex justify-between mb-4">
            <label className="block font-medium text-gray-200 w-1/3">
              Name:
            </label>
            <input
              type="text"
              value={teamLeader_name}
              onChange={(e) => setTeamLeaderName(e.target.value)}
              required
              className="mt-1 p-3 w-2/3 border rounded-lg"
            />
          </div>
          <div className="flex justify-between mb-4">
            <label className="block font-medium text-gray-200 w-1/3">
              Email:
            </label>
            <input
              type="email"
              value={teamLeader_email}
              onChange={(e) => setTeamLeaderEmail(e.target.value)}
              required
              className="mt-1 p-3 w-2/3 border rounded-lg"
            />
          </div>
          <div className="flex justify-between mb-4">
            <label className="block font-medium text-gray-200 w-1/3">
              Phone:
            </label>
            <input
              type="tel"
              value={teamLeader_phone}
              onChange={(e) => setTeamLeaderPhone(e.target.value)}
              required
              className="mt-1 p-3 w-2/3 border rounded-lg"
            />
          </div>
          <div className="flex justify-between mb-4">
            <label className="block font-medium text-gray-200 w-1/3">
              Registration Number:
            </label>
            <input
              type="text"
              value={teamLeader_registrationNumber}
              onChange={(e) => setTeamLeaderRegistrationNumber(e.target.value)}
              required
              className="mt-1 p-3 w-2/3 border rounded-lg"
            />
          </div>
          <div className="flex justify-between mb-4">
            <label className="block font-medium text-gray-200 w-1/3">
              Institute:
            </label>
            <input
              type="text"
              value={teamLeader_institute}
              onChange={(e) => setTeamLeaderInstitute(e.target.value)}
              required
              className="mt-1 p-3 w-2/3 border rounded-lg"
            />
          </div>
          <div className="flex justify-between mb-4">
            <label className="block font-medium text-gray-200 w-1/3">
              Delegate ID:
            </label>
            <input
              type="text"
              value={teamLeader_delegateId}
              onChange={(e) => setTeamLeaderDelegateId(e.target.value)}
              required
              className="mt-1 p-3 w-2/3 border rounded-lg"
            />
          </div>
          {/* Player 2 Details */}
          <h3 className="text-xl font-semibold text-gray-200 mb-2">
            Player 2 Details
          </h3>
          <div className="flex justify-between mb-4">
            <label className="block font-medium text-gray-200 w-1/3">
              Name:
            </label>
            <input
              type="text"
              value={player2_name}
              onChange={(e) => setPlayer2Name(e.target.value)}
             
              className="mt-1 p-3 w-2/3 border rounded-lg"
            />
          </div>
          <div className="flex justify-between mb-4">
            <label className="block font-medium text-gray-200 w-1/3">
              Email:
            </label>
            <input
              type="email"
              value={player2_email}
              onChange={(e) => setPlayer2Email(e.target.value)}
              
              className="mt-1 p-3 w-2/3 border rounded-lg"
            />
          </div>
          <div className="flex justify-between mb-4">
            <label className="block font-medium text-gray-200 w-1/3">
              Phone:
            </label>
            <input
              type="tel"
              value={player2_phone}
              onChange={(e) => setPlayer2Phone(e.target.value)}
          
              className="mt-1 p-3 w-2/3 border rounded-lg"
            />
          </div>
          <div className="flex justify-between mb-4">
            <label className="block font-medium text-gray-200 w-1/3">
              Registration Number:
            </label>
            <input
              type="text"
              value={player2_registrationNumber}
              onChange={(e) => setPlayer2RegistrationNumber(e.target.value)}
            
              className="mt-1 p-3 w-2/3 border rounded-lg"
            />
          </div>
          <div className="flex justify-between mb-4">
            <label className="block font-medium text-gray-200 w-1/3">
              Institute:
            </label>
            <input
              type="text"
              value={player2_institute}
              onChange={(e) => setPlayer2Institute(e.target.value)}
            
              className="mt-1 p-3 w-2/3 border rounded-lg"
            />
          </div>
          <div className="flex justify-between mb-4">
            <label className="block font-medium text-gray-200 w-1/3">
              Delegate ID:
            </label>
            <input
              type="text"
              value={player2_delegateId}
              onChange={(e) => setPlayer2DelegateId(e.target.value)}
           
              className="mt-1 p-3 w-2/3 border rounded-lg"
            />
          </div>
          {/* Password */}
          <div className="flex justify-between mb-4">
            <label className="block font-medium text-gray-200 w-1/3">
              Password:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 p-3 w-2/3 border rounded-lg"
            />
          </div>
          <div className="flex justify-between mb-4">
            <label className="block font-medium text-gray-200 w-1/3">
              Confirm Password:
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="mt-1 p-3 w-2/3 border rounded-lg"
            />
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}