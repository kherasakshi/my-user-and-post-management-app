import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./DeletePost.css";
import { FaTrashAlt } from "react-icons/fa";

export default function DeletePost({ id, onDelete }) {
  function handleClick(e) {
    e.stopPropagation();

    confirmAlert({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this post?",
      buttons: [
        {
          label: "Yes",
          onClick: () => onDelete(id),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  }

  return (
    <button
      className="delete-btn"
      onClick={handleClick}
      title="Delete post"
      type="button"
    >
      <FaTrashAlt />
    </button>
  );
}
