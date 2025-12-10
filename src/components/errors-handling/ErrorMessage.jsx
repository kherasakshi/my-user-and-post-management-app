import "./ErrorMessage.css";

export default function ErrorMessage({ title = "Error", message }) {
  return (
    <div className="error-box">
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  );
}
