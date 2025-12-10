import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./DeleteUser.css";
import { FaTrashAlt } from "react-icons/fa";

export default function DeleteUser({ id, onDelete }) {
  const handleClick = (e) => {
    e.stopPropagation();
    confirmAlert({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this user?",
      buttons: [
        { label: "Yes", onClick: () => onDelete(id) },
        { label: "No", onClick: () => {} },
      ],
    });
  };

  return (
    <button
      className="delete-btn"
      onClick={handleClick}
      title="Delete user"
      type="button"
    >
      <FaTrashAlt />
    </button>
  );
}
