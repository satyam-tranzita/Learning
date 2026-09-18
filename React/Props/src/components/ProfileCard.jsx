import { memo } from "react";
import SkillList from "./SkillList";

function ProfileCard({ user, onChildClick }) {
  console.log("🟢 Child ProfileCard rendered");

  return (
    <div className="profile-card">

      <div className="badge">
        React.memo
      </div>

      <div className="avatar">
        {user.name.charAt(0)}
      </div>

      <h2>{user.name}</h2>

      <p className="role">
        {user.role}
      </p>

      <div className="info">
        <p>
          <strong>Age:</strong> {user.age}
        </p>
      </div>

      <SkillList skills={user.skills} />

      <button
        className="child-button"
        onClick={onChildClick}
      >
        Child Changes Parent Count
      </button>

    </div>
  );
}

// 3️⃣ React.memo
// Child only re-renders when its props change
export default memo(ProfileCard);