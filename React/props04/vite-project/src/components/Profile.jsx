import UserCard from "./UserCard";

function Profile({ user }) {

  console.log("Profile rendered");

  return (
    <div className="component-box profile-box">

      <h2>Profile</h2>

      <p className="component-description">
        ❌ Profile doesn't need user either
      </p>

      <div className="arrow">
        ↓ user prop
      </div>

      <UserCard user={user} />

    </div>
  );
}

export default Profile;