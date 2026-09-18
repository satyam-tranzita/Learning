import Profile from "./Profile";

function Dashboard({ user }) {

  console.log("Dashboard rendered");

  return (
    <div className="component-box dashboard-box">

      <h2>Dashboard</h2>

      <p className="component-description">
        ❌ Dashboard doesn't need user
      </p>

      <div className="arrow">
        ↓ user prop
      </div>

      <Profile user={user} />

    </div>
  );
}

export default Dashboard;