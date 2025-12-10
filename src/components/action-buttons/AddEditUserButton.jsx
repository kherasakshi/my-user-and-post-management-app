import { useState } from "react";
import UserFormModal from "../pages/UserFormModal";
import { FaPen } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function AddEditUserButton({ user, onModalClose }) {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const handleClick = (e) => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleClose = (saved) => {
    setOpen(false);
    if (!saved && onModalClose) onModalClose(false);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="open-modal-btn edit-icon-btn"
        title={user ? "Edit User" : t("addUser")}
      >
        {user ? <FaPen /> : t("addUser")}
      </button>

      <UserFormModal isOpen={open} onClose={handleClose} existingUser={user} />
    </>
  );
}
