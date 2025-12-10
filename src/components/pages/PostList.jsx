import { DataGrid } from "react-data-grid";
import "react-data-grid/lib/styles.css";
import { useEffect, useMemo, useState } from "react";
import { ClipLoader } from "react-spinners";
import Snackbar from "@mui/material/Snackbar";
import "./PostList.css";
import ErrorMessage from "../errors-handling/ErrorMessage";
import { usePosts } from "../context/PostContext";
import DeletePost from "../action-buttons/DeletePost";
import AddEditPostButton from "../action-buttons/AddEditPostButton";
import PostFormModal from "./PostFormModal";

export default function PostList() {
  const { posts, loading, error, deletePost } = usePosts();
  const [showLoader, setShowLoader] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [showAdd, setShowAdd] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const rowsPerPage = 10;

  useEffect(() => {
    if (!loading) {
      const t = setTimeout(() => setShowLoader(false), 2000);
      return () => clearTimeout(t);
    }
  }, [loading]);

  const filteredPosts = useMemo(() => {
    if (!posts) return [];
    let result = posts;
    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(lower) ||
          p.body.toLowerCase().includes(lower)
      );
    }
    return result;
  }, [searchTerm, posts]);

  const handleDeletePost = (id) => {
    deletePost(id);
  };

  const handleModalClose = (saved) => {
    setShowAdd(false);
    if (!saved) setShowSnackbar(true);
  };

  const mappedPosts = useMemo(() => {
    return filteredPosts.map((post, index) => ({
      ...post,
      displayId: index + 1,
      tagsText: post.tags.join(", "),
      likes: post.reactions.likes,
      dislikes: post.reactions.dislikes,
      delete: (
        <div onClick={(e) => e.stopPropagation()}>
          <DeletePost id={post.id} onDelete={handleDeletePost} />
        </div>
      ),
      edit: (
        <AddEditPostButton
          post={post}
          onModalClose={(saved) => {
            if (!saved) setShowSnackbar(true);
          }}
        />
      ),
    }));
  }, [filteredPosts]);

  const totalPages = Math.ceil(mappedPosts.length / rowsPerPage);
  const paginatedPosts = useMemo(() => {
    const start = currentPage * rowsPerPage;
    return mappedPosts.slice(start, start + rowsPerPage);
  }, [mappedPosts, currentPage]);

  if (loading || showLoader || !posts) {
    return (
      <div className="loader-container">
        <ClipLoader size={50} />
        <p className="loader-text">Fetching Posts...</p>
      </div>
    );
  }

  if (error) {
    return <ErrorMessage title="Error Loading data" message={error.message} />;
  }

  const postColumns = [
    { key: "displayId", name: "#", width: 60 },
    { key: "title", name: "Title", minWidth: 50 },
    { key: "body", name: "Content", width: 500 },
    { key: "tagsText", name: "Tags", minWidth: 200 },
    {
      key: "likes",
      name: "Likes",
      width: 100,
      renderCell: ({ row }) => (
        <span className="positive-reaction">{row.likes}</span>
      ),
    },
    {
      key: "dislikes",
      name: "Dislikes",
      width: 100,
      renderCell: ({ row }) => (
        <span className="negative-reaction">{row.dislikes}</span>
      ),
    },
    { key: "views", name: "Views", width: 100 },
    { key: "userId", name: "User ID", width: 100 },
    { key: "edit", name: "Edit", width: 120 },
    { key: "delete", name: "Delete", width: 120 },
  ];

  return (
    <div className="post-page">
      <div className="post-header">
        <h1>Post Table</h1>
        <p className="subtitle">
          Browse, search, and explore all posts in one place.
        </p>

        <div className="user-control">
          <input
            type="text"
            placeholder="Search by title or content..."
            className="filter-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={() => setShowAdd(true)} className="add-post-button">
            Add New Post
          </button>

          {showAdd && (
            <PostFormModal
              isOpen={showAdd}
              onClose={handleModalClose}
              existingPost={null}
            />
          )}
        </div>

        <div className="posts-table-container">
          <DataGrid
            columns={postColumns}
            rows={paginatedPosts}
            className="clean-grid"
          />
        </div>

        <div className="pagination-wrapper">
          <button
            className="pagination-link"
            disabled={currentPage === 0}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Previous
          </button>
          <span style={{ padding: "0 10px" }}>
            Page {currentPage + 1} of {totalPages}
          </span>
          <button
            className="pagination-link"
            disabled={currentPage + 1 === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
        message="Modal closed without saving!"
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      />
    </div>
  );
}
