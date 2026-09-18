import SkillList from "./SkillList";

function ProfileCard({
  name,
  role,
  age,
  skills,
  onChildClick,
}) {
  console.log("🟢 Child ProfileCard rendered");

  return (
    <div className="profile-card">

      <div className="avatar">
        {name.charAt(0)}
      </div>

      <h2>{name}</h2>

      <p className="role">
        {role}
      </p>

      <div className="info">
        <p>
          <strong>Age:</strong> {age}
        </p>
      </div>

      <SkillList skills={skills} />

      {/* CHILD BUTTON */}
      <button
        className="child-button"
        onClick={onChildClick}
      >
        Child Changes Parent Count
      </button>

    </div>
  );
}

export default ProfileCard;