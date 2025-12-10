import React, { useState, useEffect } from "react";
import useFetch from "../data-service/useFetch";
import PostCharts from "./PostCharts";
import { ClipLoader } from "react-spinners";
import ErrorMessage from "../errors-handling/ErrorMessage";
export default function PostChartsPage() {
  const { data, loading, error } = useFetch(
    "https://dummyjson.com/posts?limit=50"
  );

  const [showCharts, setShowCharts] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
      setShowCharts(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading || showLoader) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
          gap: "1rem",
        }}
      >
        <ClipLoader color="#8884d8" size={50} />
        <p style={{ color: "#555", fontSize: "1.2rem" }}>
          Fetching Post Charts...
        </p>
      </div>
    );
  }
  if (error) {
    return <ErrorMessage title="Error loading data" message={error} />;
  }
  const posts = data?.posts ?? [];

  return (
    <div>
      <h1>Post Charts</h1>
      {showCharts && <PostCharts posts={posts} />}
    </div>
  );
}
