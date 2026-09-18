import UserInfo from "./UserInfo";

function UserCard({ user }) {

  console.log("UserCard rendered");

  return (
    <div className="component-box user-card-box">

      <h2>UserCard</h2>

      <p className="component-description">
        Finally passing user to the component
        that needs it
      </p>

      <div className="arrow">
        ↓ user prop
      </div>

      <UserInfo user={user} />

    </div>
  );
}

export default UserCard;