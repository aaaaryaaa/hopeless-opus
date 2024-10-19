import { useState, useEffect } from "react";
import BaseUrl from "../BaseUrl";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ isOpen, setIsOpen }) {
  const navi = useNavigate();
  const [data, setData] = useState({
    teamId: '',
    points: 0,
    lives: 0,
    health: 100, // Health percentage
    money: 0,
    inventory: {
      script: { value: false, description: "" },
      journal: { value: false, description: "" },
      kumbh: { value: false, description: "" },
      sword: { value: false, description: "" },
      pickaxe: { value: false, description: "" },
      axe: { value: false, description: "" },
    },
  });

  const fetchUserDetails = async () => {
    const token = localStorage.getItem("token"); // Get the token from localStorage

    try {
      const response = await fetch(`${BaseUrl}/api/user/getuser`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }

      const userDetails = await response.json();
      // Update state using the received user details
      setData({
        teamId: userDetails?.teamId,
        points: userDetails?.points,
        lives: userDetails?.lives,
        health: userDetails?.health,
        money: userDetails?.money,
        inventory: userDetails?.inventory,
      });
    } catch (error) {
      console.error("Error fetching user details:", error.message);
    }
  };

  useEffect(() => {
    fetchUserDetails(); // Fetch user details when the component mounts
  }, [isOpen]); // Empty dependency array ensures it runs only once when the component mounts

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsOpen(!isOpen);
    navi('/');
  };

  return (
    <aside
      className={`fixed right-0 top-0 h-full mt-0 z-[9999] bg-[#000000] text-white w-64 transition-transform duration-300 ease-in-out transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <nav className="flex flex-col justify-between">
        {localStorage.getItem("token")!==null ? (<>
            <ul className="space-y-6 mt-8 text-center">
                <SidebarItem label="Team ID" value={data.teamId} />
                <SidebarItem label="Points" value={data.points} />
                <HealthProgress health={data.health} />
                <SidebarItem label="Money" value={`₹${data.money}`} />

                {/* Inventory Dropdown */}
                <li className="relative flex flex-col items-center text-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors">
                    <span className="text-sm">Inventory</span>
                    <ul className="space-y-2 mt-2">
                    {/* {Object.entries(data.inventory).some(([_, item]) => item.value) ? (
                        Object.entries(data.inventory).map(([key, item], index) =>
                        item.value ? (
                            // <li key={index} className="text-sm">
                            //   {key} - 
                            // </li>
                            <li
                                key={index}
                                className="text-sm cursor-pointer text-blue-700 hover:text-blue-400 transition-colors"
                                onClick={() => navi(`/${key}`)}
                            >
                                {key.toUpperCase()}
                            </li>
                        ) : null
                        )
                    ) : (
                        <li className="text-sm text-gray-400">No items</li>
                    )} */}
                    <p className="text-sm cursor-pointer text-blue-700 hover:text-blue-400 transition-colors" onClick={() => navi('/script')}>
                      Script
                    </p>
                    <p className="text-sm cursor-pointer text-blue-700 hover:text-blue-400 transition-colors" onClick={() => navi('/journal')}>
                      Journal
                    </p>
                    </ul>
                </li>
            </ul>

            {/* Logout Button */}
            <div className="py-4 border-t border-gray-700 text-center">
            <button
                className="rounded-xl w-[80%] bg-red-700 p-2 text-gray-200 border-none font-semibold"
                onClick={handleLogout}
            >
                Logout
            </button>
                </div>
        </>) : (<>
            <a 
          href="/login" 
          className="inline-block mx-auto mt-12 px-6 py-3 text-lg font-semibold text-black bg-white rounded-lg hover:bg-gray-300 transition">
           Login
        </a>
        </>)}
      </nav>
    </aside>
  );
}

function SidebarItem({ label, value }) {
  return (
    <li className="flex flex-col items-center justify-center">
      <span className="text-sm font-semibold">{label}</span>
      <span className="text-lg">{value}</span>
    </li>
  );
}

function HealthProgress({ health }) {
  return (
    <li className="flex flex-col items-center justify-center">
      <span className="text-sm font-semibold">Health</span>
      <div className="group w-[80%]">
        <div className="w-full h-4 bg-gray-800 rounded-lg overflow-hidden mt-2">
          <div
            className="bg-green-500 h-full transition-width duration-500"
            style={{ width: `${health}%` }}
          ></div>
        </div>
        <span className="text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-600 delay-500">
          {health}%
        </span>
      </div>
    </li>
  );
}
