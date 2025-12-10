import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { useUsers } from "../context/UserContext";
import "./UserFormModal.css";

Modal.setAppElement("#root");

export default function UserFormModal({ isOpen, onClose, existingUser }) {
  const { addUser, editUser } = useUsers();
  const [showPhysical, setShowPhysical] = useState(false);

  const formatDate = (dateString) =>
    dateString ? new Date(dateString).toISOString().split("T")[0] : "";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, touchedFields },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      age: "",
      phone: "",
      birthDate: "",
      profession: "",
      sportInterest: "",
      height: "",
      weight: "",
    },
  });

  useEffect(() => {
    const emptyValues = {
      firstName: "",
      lastName: "",
      email: "",
      age: "",
      phone: "",
      birthDate: "",
      profession: "",
      sportInterest: "",
      height: "",
      weight: "",
    };
    if (existingUser) {
      reset({
        ...emptyValues,
        ...existingUser,
        birthDate: formatDate(existingUser.birthDate),
      });
      setShowPhysical(Boolean(existingUser.height || existingUser.weight));
    } else {
      reset(emptyValues);
      setShowPhysical(false);
    }
  }, [existingUser, reset, isOpen]);

  const onSubmit = (data) => {
    const normalized = {
      ...data,
      age: Number(data.age) || "",
      height: Number(data.height) || "",
      weight: Number(data.weight) || "",
    };
    if (existingUser) editUser(existingUser.id, normalized);
    else addUser(normalized);
    if (typeof onClose === "function") onClose(true);
  };

  const handleCloseWithoutSaving = () => {
    if (typeof onClose === "function") onClose(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCloseWithoutSaving}
      contentLabel={existingUser ? "Edit User" : "Add User"}
      className="user-modal"
      overlayClassName="user-modal-overlay"
    >
      <div className="modal-header">
        <h3>{existingUser ? "Edit User" : "Add User"}</h3>
        <button className="close-btn" onClick={handleCloseWithoutSaving}>
          ×
        </button>
      </div>

      <form className="modal-body" onSubmit={handleSubmit(onSubmit)}>
        <label className="field">
          First Name
          <input
            {...register("firstName", { required: "First name is required" })}
          />
          {touchedFields.firstName && errors.firstName && (
            <p className="error-text">{errors.firstName.message}</p>
          )}
        </label>

        <label className="field">
          Last Name
          <input
            {...register("lastName", { required: "Last name is required" })}
          />
          {touchedFields.lastName && errors.lastName && (
            <p className="error-text">{errors.lastName.message}</p>
          )}
        </label>

        <label className="field">
          Email Address
          <input {...register("email", { required: "Email is required" })} />
          {touchedFields.email && errors.email && (
            <p className="error-text">{errors.email.message}</p>
          )}
        </label>

        <label className="field">
          Age
          <input
            type="number"
            {...register("age", { required: "Age is required" })}
          />
          {touchedFields.age && errors.age && (
            <p className="error-text">{errors.age.message}</p>
          )}
        </label>

        <label className="field">
          Contact Number
          <input
            {...register("phone", { required: "Contact number is required" })}
          />
          {touchedFields.phone && errors.phone && (
            <p className="error-text">{errors.phone.message}</p>
          )}
        </label>

        <label className="field">
          Date of Birth
          <input
            type="date"
            {...register("birthDate", { required: "Birthdate is required" })}
          />
          {touchedFields.birthDate && errors.birthDate && (
            <p className="error-text">{errors.birthDate.message}</p>
          )}
        </label>

        <label className="field">
          Profession
          <input
            {...register("profession", { required: "Profession is required" })}
          />
          {touchedFields.profession && errors.profession && (
            <p className="error-text">{errors.profession.message}</p>
          )}
        </label>

        <label className="field">
          Sport Interest
          <select
            {...register("sportInterest", {
              required: "Sport-Interest is required",
            })}
          >
            <option value="">Select</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          {touchedFields.sportInterest && errors.sportInterest && (
            <p className="error-text">{errors.sportInterest.message}</p>
          )}
        </label>

        <label className="field checkbox-field">
          <input
            type="checkbox"
            checked={showPhysical}
            onChange={() => setShowPhysical((s) => !s)}
          />
          <span>Add Physical Details (Height & Weight)</span>
        </label>

        {showPhysical && (
          <>
            <label className="field">
              Height (cm)
              <input
                type="number"
                {...register("height", { required: "Height is required" })}
              />
              {touchedFields.height && errors.height && (
                <p className="error-text">{errors.height.message}</p>
              )}
            </label>

            <label className="field">
              Weight (kg)
              <input
                type="number"
                {...register("weight", { required: "Weight is required" })}
              />
              {touchedFields.weight && errors.weight && (
                <p className="error-text">{errors.weight.message}</p>
              )}
            </label>
          </>
        )}

        <div className="modal-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={handleCloseWithoutSaving}
          >
            Close
          </button>
          <button type="submit" className="btn-primary">
            {existingUser ? "Update" : "Submit"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
