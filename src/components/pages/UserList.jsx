import { DataGrid } from "react-data-grid";
import "react-data-grid/lib/styles.css";
import "./UserList.css";
import { ClipLoader } from "react-spinners";
import Snackbar from "@mui/material/Snackbar";
import UserFormModal from "./UserFormModal";
import ErrorMessage from "../errors-handling/ErrorMessage";
import DeleteUser from "../action-buttons/DeleteUser";
import AddEditUserButton from "../action-buttons/AddEditUserButton";
import { useUsers } from "../context/UserContext";
import { useEffect, useMemo, useState } from "react";

export default function UsersList() {
  const { users, deleteUser, loading, error } = useUsers();
  const [showLoader, setShowLoader] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [ageFilter, setAgeFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");

  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 10;

  useEffect(() => {
    if (!loading) {
      const t = setTimeout(() => setShowLoader(false), 2000);
      return () => clearTimeout(t);
    }
  }, [loading]);

const filteredUsers = useMemo(() => {
  const term = searchTerm.toLowerCase();

  return users.filter((u) => {
    const matchesSearch =
      u.firstName.toLowerCase().includes(term) ||
      u.lastName.toLowerCase().includes(term) ||
      u.email.toLowerCase().includes(term);

    const matchesAge = ageFilter ? u.age == ageFilter : true;
    const matchesGender = genderFilter ? u.gender?.toLowerCase() === genderFilter  : true;
    return matchesSearch && matchesAge && matchesGender;
  });
}, [users, searchTerm, ageFilter, genderFilter]);


  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / rowsPerPage));

  useEffect(() => {
    if (currentPage >= totalPages) setCurrentPage(totalPages - 1);
  }, [totalPages]);

  const pageRows = useMemo(() => {
    const start = currentPage * rowsPerPage;
    return filteredUsers.slice(start, start + rowsPerPage);
  }, [filteredUsers, currentPage]);

  const handleDeleteUser = (id) => {
    deleteUser(id);
  };

  const rowsForGrid = pageRows.map((user, idx) => ({
    ...user,
    displayId: currentPage * rowsPerPage + idx + 1,

    edit: (
      <div onClick={(e) => e.stopPropagation()}>
        <AddEditUserButton
          user={user}
          onModalClose={(saved) => {
            if (!saved) setShowSnackbar(true);
          }}
        />
      </div>
    ),

    delete: (
      <div onClick={(e) => e.stopPropagation()}>
        <DeleteUser id={user.id} onDelete={() => handleDeleteUser(user.id)} />
      </div>
    ),
  }));

  const columns = [
    { key: "displayId", name: "#", width: 60 },
    { key: "firstName", name: "First", minWidth: 120 },
    { key: "lastName", name: "Last", minWidth: 120 },
    { key: "email", name: "Email", minWidth: 220 },
    {
      key: "age",
      name: "Age",
      width: 80,
      cellClass: (row) => (row.age < 50 ? "age-red" : "age-green"),
    },
    { key: "phone", name: "Contact Number", minWidth: 150 },
    { key: "birthDate", name: "DOB", minWidth: 130 },
    { key: "profession", name: "Profession", minWidth: 150 },
    { key: "sportInterest", name: "Sport Interest", minWidth: 150 },
    { key: "edit", name: "Edit", width: 100 },
    { key: "delete", name: "Delete", width: 100 },
  ];

  if (loading || showLoader) {
    return (
      <div className="loader-container">
        <ClipLoader size={50} />
        <p className="loader-text">Fetching Users...</p>
      </div>
    );
  }

  if (error) {
    return <ErrorMessage title="Error loading users" message={error} />;
  }

  return (
    <div className="users-page">
      <div className="users-header">
        <h1>User Table</h1>
        <p className="subtitle">Manage all users in one place.</p>
      </div>

      <div className="user-controls">
        <input
          type="text"
          className="filter-input"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(0);
          }}
        />

        <input
          type="number"
          className="filter-input"
          placeholder="Filter by age..."
          value={ageFilter}
          onChange={(e) => {
            setAgeFilter(e.target.value);
            setCurrentPage(0);
          }}
        />

        <select
          className="filter-input"
          value={genderFilter}
          onChange={(e) => {
            setGenderFilter(e.target.value);
            setCurrentPage(0);
          }}
        >
          <option value="">All Genders</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <button
          className="add-user-button"
          onClick={() => setShowAddModal(true)}
        >
          Add New User
        </button>

        {showAddModal && (
          <UserFormModal
            isOpen={showAddModal}
            existingUser={null}
            onClose={(saved) => {
              setShowAddModal(false);
              if (!saved) setShowSnackbar(true);
            }}
          />
        )}
      </div>

      <div className="users-table-container">
        <DataGrid columns={columns} rows={rowsForGrid} className="clean-grid" />
      </div>

      <div className="pagination-wrapper">
        <button
          className="pagination-link"
          disabled={currentPage === 0}
          onClick={() => setCurrentPage((p) => p - 1)}
        >
          Previous
        </button>

        <span style={{ padding: "0 10px" }}>
          Page {currentPage + 1} of {totalPages}
        </span>

        <button
          className="pagination-link"
          disabled={currentPage + 1 === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          Next
        </button>
      </div>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={2500}
        onClose={() => setShowSnackbar(false)}
        message="Modal Closed Without Saving!"
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      />
    </div>
  );
}
