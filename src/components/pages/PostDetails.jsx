import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../data-service/useFetch";
import { ClipLoader } from "react-spinners";
import ErrorMessage from "../errors-handling/ErrorMessage";
import "./PostDetails.css";
export default function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showLoader, setShowLoader] = useState(true);
  const {
    data: post,
    loading,
    error,
  } = useFetch(`https://dummyjson.com/posts/${id}`);

  useEffect(() => {
    if (!loading) {
      const t = setTimeout(() => setShowLoader(false), 2000);
      return () => clearTimeout(t);
    }
  }, [loading]);
  if (loading || showLoader) {
    return (
      <div className="loader-container">
        <ClipLoader size={50} color="#4e6ef2" />
        <p className="loader-text">Fetching Post Details...</p>
      </div>
    );
  }
  if (error) {
    return <ErrorMessage title="Error Loading Post Details" message={error} />;
  }
  const goToNextUser = () => {
    navigate(`/postDetails/${Number(id) + 1}`);
  };

  const goToPreviousUser = () => {
    if (Number(id) > 1) {
      navigate(`/postDetails/${Number(id) - 1}`);
    }
  };
  return (
    <div className="details-container">
      <h2>Post Details</h2>
      <div className="nav-btn-wrapper">
        <button className="next-btn" onClick={goToPreviousUser}>
          ← Previous
        </button>
        <button className="next-btn" onClick={goToNextUser}>
          Next →
        </button>
      </div>
      <div className="table-wrapper">
        <table className="post-details-table">
          <tbody>
            <tr>
              <td>Post Name</td>
              <td>{post.title}</td>
            </tr>
            <tr>
              <td>Post Body</td>
              <td>{post.body}</td>
            </tr>
            <tr>
              <td>Reactions </td>
              <td>Likes 👍</td>
              <td>{post.reactions.likes}</td>
            </tr>
            <tr>
              <td>Reactions</td>
              <td>Dislikes 👎</td>
              <td>{post.reactions.dislikes}</td>
            </tr>
            <tr>
              <td>Views</td>
              <td>{post.views}</td>
            </tr>
            <tr>
              <td>User ID</td>
              <td>{post.userId}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
