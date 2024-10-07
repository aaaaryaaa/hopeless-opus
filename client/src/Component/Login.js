// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import BaseUrl from '../BaseUrl';

// export default function Login() {
//   const [teamLeader_email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const openSignup = () => {
//     navigate('/register');
//   };

//   const handleLogin = (e) => {
//     e.preventDefault();
//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailPattern.test(teamLeader_email)) {
//       alert("Please enter a valid email address.");
//       return;
//     }

//     axios
//       .post(`${BaseUrl}/api/auth/login`, {
//         teamLeader_email,
//         password,
//       })
//       .then((response) => {
//         console.log(response.data);
//         console.log(`${BaseUrl}/api/auth/login`);
//         localStorage.setItem("token", response.data.token); 
//         navigate("/play");
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-black">
//       <div className="bg-gray-600 p-8 rounded-lg shadow-lg w-full max-w-sm">
//         <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
//         <form onSubmit={handleLogin} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Team Leader Email:
//             </label>
//             <input
//               type="email"
//               value={teamLeader_email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="mt-1 p-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-white text-black"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Password:
//             </label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="mt-1 p-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-white text-black"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
//           >
//             Login
//           </button>
//           <p className="text-sm text-center">
//             {" "}
//             Don't have an account?{" "}
//             <button className="text-indigo-600" onClick={openSignup}>
//               Register
//             </button>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BaseUrl from '../BaseUrl';

export default function Login() {
  const [teamLeader_email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const openSignup = () => {
    navigate('/register');
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(teamLeader_email)) {
      alert("Please enter a valid email address.");
      return;
    }

    axios
      .post(`${BaseUrl}/api/auth/login`, {
        teamLeader_email,
        password,
      })
      .then((response) => {
        console.log(response.data);
        console.log(`${BaseUrl}/api/auth/login`);
        localStorage.setItem("token", response.data.token); // Store the token
        navigate("/play"); // Navigate to /play on success
      })
      .catch((error) => {
        console.error(error);
        // Handle error (e.g., show error message)
      });
  };

  return (
    <div className="flex pb-80 justify-center min-h-screen bg-black">
      <div className="bg-gray-900 backdrop-blur-md p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block font-medium text-gray-200">
              Team Leader Email:
            </label>
            <input
              type="email"
              value={teamLeader_email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 p-3 w-full border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 border-gray-700 bg-gray-1000 text-gray-200"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-200">
              Password:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 p-3 w-full border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 border-gray-700 bg-gray-1000 text-gray-200"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-600 text-white py-3 rounded-lg hover:bg-cyan-500 transition duration-300 ease-in-out"
          >
            Login
          </button>
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

