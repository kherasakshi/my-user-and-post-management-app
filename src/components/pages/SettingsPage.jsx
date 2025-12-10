import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./SettingsPage.css";

export default function SettingsPage() {
  const { t, i18n } = useTranslation();

  const [notificationsEnabled, setNotificationsEnabled] = useState(() => JSON.parse(localStorage.getItem("notificationsEnabled")) ?? true);

  const handleToggle = () => {
    const newValue = !notificationsEnabled;
    setNotificationsEnabled(newValue);
    localStorage.setItem("notificationsEnabled", JSON.stringify(newValue));
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("appLanguage", lang);
  };

  return (
    <div className="settings-container">
      <h1 className="settings-title">{t("settings")}</h1>

      <div className="settings-section">
        <label className="settings-label">{t("language")}</label>
        <select value={i18n.language} onChange={(e) => changeLanguage(e.target.value)} className="settings-select">
          <option value="en">English</option>
          <option value="fr">Français</option>
        </select>
      </div>

      <div className="settings-section">
        <label className="settings-checkbox-label">
          <input type="checkbox" className="settings-checkbox" checked={notificationsEnabled} onChange={handleToggle} />
          {t("enableNotifications")}
        </label>
      </div>
    </div>
  );
}
