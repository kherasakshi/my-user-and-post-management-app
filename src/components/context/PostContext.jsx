import { createContext, useContext, useEffect, useState } from "react";
import useFetch from "../data-service/useFetch";

const PostContext = createContext();
export const usePosts = () => useContext(PostContext);

const showNotification = (title, options) => {
  const notificationsEnabled =
    JSON.parse(localStorage.getItem("notificationsEnabled")) ?? true;

  if (
    notificationsEnabled &&
    "Notification" in window &&
    Notification.permission === "granted"
  ) {
    new Notification(title, options);
  }
};

export function PostProvider({ children }) {
  const { data, loading, error } = useFetch(
    "https://dummyjson.com/posts?limit=50"
  );

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("postsData"));

    if (saved && saved.length > 0) {
      setPosts(saved);
    }
  }, []);

  useEffect(() => {
    if (data?.posts) {
      const saved = JSON.parse(localStorage.getItem("postsData"));
      if (!saved || saved.length === 0) {
        setPosts(data.posts);
        localStorage.setItem("postsData", JSON.stringify(data.posts));
      }
    }
  }, [data]);

  useEffect(() => {
    if (posts && posts.length > 0) {
      localStorage.setItem("postsData", JSON.stringify(posts));
    }
  }, [posts]);

  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  const deletePost = (id) => {
    const deleted = posts.find((p) => p.id === id);

    setPosts((prev) => prev.filter((p) => p.id !== id));

    if (deleted) {
      showNotification("Post Deleted", {
        body: `${deleted.title || `ID ${id}`} deleted.`,
      });
    }
  };
  const addPost = (newPost) => {
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;

    const postToAdd = { id, ...newPost };

    setPosts((prev) => [...prev, postToAdd]);
    showNotification("Post Added", { body: `${newPost.title} added.` });
  };

  const updatePost = (id, updatedPost) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedPost } : p))
    );

    showNotification("Post Updated", {
      body: `${updatedPost.title} updated.`,
    });
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        deletePost,
        addPost,
        updatePost,
        loading,
        error,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
