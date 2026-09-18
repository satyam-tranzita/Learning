function SkillList({ skills }) {
  console.log("🟡 SkillList rendered");

  return (
    <div className="skills-section">
      <h3>Skills</h3>

      <div className="skills">
        {skills.map((skill) => (
          <span className="skill" key={skill}>
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export default SkillList;