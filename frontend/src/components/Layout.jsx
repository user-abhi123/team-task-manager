import React from "react";

export default function Layout({ children }) {

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location = "/";
  };

  return (
    <div className="flex h-screen bg-[#0B1220] text-white">
      
      {/* Sidebar */}
      <div className="w-64 bg-[#0A0F1C] p-5 flex flex-col justify-between">
        
        <div>
          <h1 className="text-xl font-bold mb-6">Task Track</h1>

          <div className="mb-6">
            <p className="font-semibold">Abhishek</p>
            <span className="text-xs bg-gray-700 px-2 py-1 rounded">
              MEMBER
            </span>
          </div>

          <ul className="space-y-3">
            <li className="text-cyan-400 cursor-pointer">Dashboard</li>
            <li className="cursor-pointer">My Tasks</li>
            <li className="cursor-pointer">My Projects</li>
            <li className="cursor-pointer">Attendance</li>
            <li className="cursor-pointer">Apply Leave</li>
          </ul>
        </div>

        {/* ✅ Sign Out Button */}
        <button
          onClick={handleLogout}
          className="text-red-400 hover:text-red-500 transition"
        >
          Sign Out
        </button>
      </div>

      {/* Main */}
      <div className="flex-1 p-6 overflow-auto">
        
        {/* Top bar */}
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold">My Dashboard</h1>
          <div className="bg-gray-800 px-4 py-2 rounded">AC</div>
        </div>

        {children}
      </div>
    </div>
  );
}