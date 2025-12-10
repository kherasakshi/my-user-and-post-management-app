import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import App from "./App";

export default function AppLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, [loading]);

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#f6f6f6",
        }}
      >
        <ClipLoader size={50} color="#3b82f6" loading={true} />
      </div>
    );
  }

  return <App />;
}
