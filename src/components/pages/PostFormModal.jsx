import { useEffect } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { usePosts } from "../context/PostContext";
import "./UserFormModal.css";
Modal.setAppElement("#root");

export default function PostFormModal({ isOpen, onClose, existingPost }) {
  const { addPost, updatePost } = usePosts();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, touchedFields },
  } = useForm({
    mode: "onTouched",
    defaultValues: existingPost || {
      title: "",
      body: "",
      tags: "",
      views: 0,
      userId: "",
      reactions: { likes: 0, dislikes: 0 },
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset(
        existingPost || {
          title: "",
          body: "",
          tags: "",
          views: 0,
          userId: "",
          reactions: { likes: 0, dislikes: 0 },
        }
      );
    }
  }, [isOpen, existingPost, reset]);

  const onSubmit = (data) => {
    const formatted = {
      ...data,
      tags:
        typeof data.tags === "string"
          ? data.tags.split(",").map((t) => t.trim())
          : [],
      reactions: {
        likes: Number(data.reactions?.likes ?? 0),
        dislikes: Number(data.reactions?.dislikes ?? 0),
      },
      views: Number(data.views),
    };

    if (existingPost) {
      updatePost(existingPost.id, formatted);
    } else {
      addPost(formatted);
    }

    onClose(true);
    reset();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => onClose(false)}
      contentLabel={existingPost ? "Edit Post" : "Add Post"}
      className="user-modal"
      overlayClassName="user-modal-overlay"
    >
      <div className="modal-header">
        <h3>{existingPost ? "Edit Post" : "Add Post"}</h3>
        <button className="close-btn" onClick={() => onClose(false)}>
          ×
        </button>
      </div>

      <form className="modal-body" onSubmit={handleSubmit(onSubmit)}>
        <label className="field">
          Title
          <input {...register("title", { required: "Title is required" })} />
          {touchedFields.title && errors.title && (
            <p className="error-text">{errors.title.message}</p>
          )}
        </label>

        <label className="field">
          Content
          <textarea
            {...register("body", { required: "Content is required" })}
          />
          {touchedFields.body && errors.body && (
            <p className="error-text">{errors.body.message}</p>
          )}
        </label>

        <label className="field">
          Tags (comma separated)
          <input {...register("tags")} />
        </label>

        <label className="field">
          Likes
          <input type="number" {...register("reactions.likes")} />
        </label>

        <label className="field">
          Dislikes
          <input type="number" {...register("reactions.dislikes")} />
        </label>

        <label className="field">
          Views
          <input type="number" {...register("views")} />
        </label>

        <label className="field">
          User ID
          <input type="number" {...register("userId")} />
        </label>

        <div className="modal-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={() => onClose(false)}
          >
            Close
          </button>
          <button type="submit" className="btn-primary">
            {existingPost ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
