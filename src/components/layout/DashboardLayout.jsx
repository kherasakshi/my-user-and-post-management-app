import Sidebar from "./Sidebar";
import "./Home.css";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="home-container">
      <Sidebar />
      <div className="home-content">
        <Outlet />   {}
      </div>
    </div>
  );
}                                          
