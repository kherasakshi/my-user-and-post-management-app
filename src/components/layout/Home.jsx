import "./Home.css";

export default function Home() {
  return (
    <div className="dashboard-home">
      <div className="header-section">
        <h1>Welcome to User & Post Management System</h1>
        <p>Manage users, posts, and settings all in one place.</p>
        <img
          src="/NewPostImg.jpeg"
          alt="Dashboard Illustration"
          className="hero-image"
        />
      </div>

      <div className="cards-container">
        <div className="card">
          <h3>Total Users</h3>
          <p>50+</p>
        </div>

        <div className="card">
          <h3>Posts</h3>
          <p>200+</p>
        </div>

        <div className="card">
          <h3>Settings</h3>
          <p>Manage Preferences</p>
        </div>
      </div>
    </div>
  );
}
