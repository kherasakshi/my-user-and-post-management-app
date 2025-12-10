import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import "./Sidebar.css";

export default function Sidebar({ onToggle }) {
  const [isOpen, setIsOpen] = useState(true);
  const { t } = useTranslation();
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    onToggle(!isOpen);
  };

  const isUserDetailsActive = location.pathname.startsWith("/userDetails/");
  const isPostDetailsActive = location.pathname.startsWith("/postDetails/");

  return (
    <>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        <FaBars />
      </button>

      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <h2 className="logo">{t("dashboard")}</h2>

        <nav>
          <NavLink to="/users" className="nav-item">
            {({ isActive }) => (
              <span className={isActive ? "active" : ""}>{t("usersList")}</span>
            )}
          </NavLink>

          <NavLink to="/userDetails/1" className={`nav-item ${isUserDetailsActive ? "active" : ""}`}>
            {t("userDetails")}
          </NavLink>

          <NavLink to="/charts" className="nav-item">
            {t("userCharts")}
          </NavLink>

          <NavLink to="/posts" className="nav-item">
            {({ isActive }) => (
              <span className={isActive ? "active" : ""}>{t("posts")}</span>
            )}
          </NavLink>

          <NavLink to="/postDetails/1" className={`nav-item ${isPostDetailsActive ? "active" : ""}`}>
            {t("postDetails")}
          </NavLink>

          <NavLink to="/postCharts" className="nav-item">
            {t("postCharts")}
          </NavLink>

          <NavLink to="/settings" className="nav-item">
            {t("settings")}
          </NavLink>

          <NavLink to="/login" className="nav-item">
            {t("logout")}
          </NavLink>
        </nav>
      </div>
    </>
  );
}
