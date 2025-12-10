import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./components/context/UserContext";
import AppLoader from "./AppLoader";
import "./i118";
import { PostProvider } from "./components/context/PostContext";
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UserProvider>
      <PostProvider>
        <AppLoader />
      </PostProvider>
    </UserProvider>
  </BrowserRouter>
);
