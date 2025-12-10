import { useState } from "react";
import Sidebar from "./Sidebar";
import "./Home.css";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <div className={`home-container ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
      <Sidebar onToggle={setSidebarOpen} />
      
      <div className="home-content">
        <Outlet />
      </div>
    </div>
  );
}
