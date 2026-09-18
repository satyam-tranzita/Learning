import SkillList from "./SkillList";

function ProfileCard({ name, role, age, skills }) {
  return (
    <div className="profile-card">
      <div className="avatar">
        {name.charAt(0)}
      </div>

      <h2>{name}</h2>

      <p className="role">{role}</p>

      <div className="info">
        <p>
          <strong>Age:</strong> {age}
        </p>
      </div>
      
      {/* //parent-->child  */}
      <SkillList skills={skills} />
    </div>
  );
}

export default ProfileCard;