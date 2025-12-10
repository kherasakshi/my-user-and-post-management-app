import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/auth-login/Login";
import ProtectedRoute from "./components/pages/ProtectedRoute";
import DashboardLayout from "./components/layout/DashboardLayout";
import Home from "./components/layout/Home";
import UsersList from "./components/pages/UserList";
import NotFound from "./components/pages/NotFound";
import UserDetails from "./components/pages/UserDetails";
import UserChartsPage from "./components/pages/UserChartsPage";
import SettingsPage from "./components/pages/SettingsPage";
import PostList from "./components/pages/PostList";
import PostDetails from "./components/pages/PostDetails";
import PostChartsPage from "./components/pages/PostChartsPage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="home" element={<Home />} />
        <Route path="users" element={<UsersList />} />
        <Route path="userDetails/:id" element={<UserDetails />} />
        <Route path="charts" element={<UserChartsPage />} />
        <Route path="/posts" element={<PostList />} />
        <Route path="/postDetails/:id" element={<PostDetails />} />
        <Route path="/postCharts" element={<PostChartsPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
