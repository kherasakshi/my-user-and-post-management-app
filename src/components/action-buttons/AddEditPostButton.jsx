import { useState } from "react";
import PostFormModal from "../pages/PostFormModal";
import { FaPen } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function AddEditPostButton({ post, onModalClose }) {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const handleClick = (e) => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleClose = (saved = false) => {
    setOpen(false);
    if (onModalClose) onModalClose(saved);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="open-modal-btn edit-icon-btn"
        title={post ? "Edit Post" : t("addPost")}
      >
        {post ? <FaPen /> : t("addPost")}
      </button>

      <PostFormModal
        isOpen={open}
        onClose={handleClose}
        existingPost={post}
      />
    </>
  );
}
