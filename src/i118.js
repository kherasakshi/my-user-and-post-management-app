import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      welcome: "Welcome",
      settings: "Settings",
      language: "Language",
      usersList: "Users List",
      userDetails: "User Details",
      userCharts: "User Charts",
      logout: "Logout",
      dashboard: "Dashboard",
      addUser: "Add new User",
      enableNotifications: "Enable Notifications",
      posts: "Posts",
      postDetails: "Post Details",
      postCharts: "Post Charts",
    },
  },
  fr: {
    translation: {
      welcome: "Bienvenue",
      settings: "Paramètres",
      language: "Langue",
      usersList: "Liste des utilisateurs",
      userDetails: "Détails de l'utilisateur",
      userCharts: "Graphiques des utilisateurs",
      logout: "Déconnexion",
      dashboard: "Tableau de bord",
      addUser: "Ajouter un utilisateur",
      enableNotifications: "Activer les notifications",
      posts: "Publications",
      postDetails: "Détails du post",
      postCharts: "Graphiques du post",
    },
  },
};

const savedLanguage = localStorage.getItem("appLanguage") || "en";

i18n.use(initReactI18next).init({
  resources,
  lng: savedLanguage,
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
