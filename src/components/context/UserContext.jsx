import { createContext, useContext, useState, useEffect } from "react";
import useFetch from "../data-service/useFetch";

const UserContext = createContext();
export const useUsers = () => useContext(UserContext);

const showNotification = (title, options) => {
  const enabled = JSON.parse(localStorage.getItem("notificationsEnabled")) ?? true;
  if (!enabled || !("Notification" in window)) return;

  if (Notification.permission === "granted") {
    new Notification(title, options);
    return;
  }

  if (Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") new Notification(title, options);
    });
  }
};

export function UserProvider({ children }) {
  const { data, loading, error } = useFetch("https://dummyjson.com/users?limit=50");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission().catch(() => {});
    }
  }, []);

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem("usersData") || "[]");
    if (savedUsers.length > 0) {
      setUsers(savedUsers);
      return;
    }

    if (data?.users) {
      const professions = ["Software Engineer","Designer","Doctor","Teacher","Lawyer","Accountant","Mechanic","Chef"];
      const sports = ["High","Medium","Low"];

      const formatted = data.users.map((u) => ({
        ...u,
        profession: professions[Math.floor(Math.random() * professions.length)],
        sportInterest: sports[Math.floor(Math.random() * sports.length)],
        birthDate: u.birthDate ? new Date(u.birthDate).toISOString().split("T")[0] : "",
      }));

      setUsers(formatted);
      localStorage.setItem("usersData", JSON.stringify(formatted));
    }
  }, [data]);

  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem("usersData", JSON.stringify(users));
    }
  }, [users]);

  const addUser = (user) => {
    const newUser = { ...user, id: user.id };
    setUsers((prev) => [...prev, newUser]);

    showNotification("User Added", {
      body: `${newUser.firstName || ""} ${newUser.lastName || ""} added successfully.`,
    });
  };

  const editUser = (id, updatedUser) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...updatedUser } : u)));

    showNotification("User Updated", {
      body: `${updatedUser.firstName || ""} ${updatedUser.lastName || ""} updated successfully.`,
    });
  };

  const deleteUser = (id) => {
    const deleted = users.find((u) => u.id === id);
    setUsers((prev) => prev.filter((u) => u.id !== id));

    if (deleted) {
      showNotification("User Deleted", {
        body: `${deleted.firstName || ""} ${deleted.lastName || ""} deleted successfully.`,
      });
    }
  };

  const loadUsers = (array) => setUsers(array);

  return (
    <UserContext.Provider value={{ users, addUser, editUser, deleteUser, loadUsers, loading, error }}>
      {children}
    </UserContext.Provider>
  );
}
