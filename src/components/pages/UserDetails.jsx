import { useNavigate, useParams } from "react-router-dom";
import ErrorMessage from "../errors-handling/ErrorMessage";
import { useEffect } from "react";
import { ClipLoader } from "react-spinners";
import useFetch from "../data-service/useFetch";
import "./UserDetails.css";
import { useState } from "react";

export default function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showLoader, setShowLoader] = useState(true);
  const {
    data: user,
    loading,
    error,
  } = useFetch(`https://dummyjson.com/users/${id}`);

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
        <p className="loader-text">Fetching User Details...</p>
      </div>
    );
  }

  if (error) {
    return <ErrorMessage title="Error Loading user Details" message={error} />;
  }

  const goToNextUser = () => {
    navigate(`/userDetails/${Number(id) + 1}`);
  };

  const goToPreviousUser = () => {
    if (Number(id) > 1) {
      navigate(`/userDetails/${Number(id) - 1}`);
    }
  };

  return (
    <div className="details-container">
      <h2>User Details</h2>
      <div className="nav-btn-wrapper">
        <button className="next-btn" onClick={goToPreviousUser}>
          ← Previous
        </button>
        <button className="next-btn" onClick={goToNextUser}>
          Next →
        </button>
      </div>
      <div className="table-wrapper">
        <table className="user-details-table">
          <tbody>
            <tr>
              <td>Full Name</td>
              <td>
                {user.firstName} {user.lastName}
              </td>
            </tr>
            <tr>
              <td>Username</td>
              <td>{user.username}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{user.email}</td>
            </tr>
            <tr>
              <td>Phone</td>
              <td>{user.phone}</td>
            </tr>
            <tr>
              <td>Age</td>
              <td>{user.age}</td>
            </tr>
            <tr>
              <td>Gender</td>
              <td>{user.gender}</td>
            </tr>
            <tr>
              <td>City</td>
              <td>{user.address.city}</td>
            </tr>
            <tr>
              <td>Company</td>
              <td>{user.company.name}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
