import ProfileCard from "./components/ProfileCard";
import "./App.css";

function App() {


  const user = {
    name: "Satyam",
    role: "Frontend Developer",
    age: 22,
    skills: ["React", "JavaScript", "CSS"],
  };

  return (
    <div className="app">
      <h1>React Props Demo</h1>

      <p className="subtitle">
        Parent → Child → Child
      </p>

      <div className="flow">
        <div className="box parent">
          <strong>App</strong>
          <span>Parent Component</span>
        </div>

        <div className="arrow">↓</div>
        

        {/* //parent-->child  */}
        <ProfileCard
          name={user.name}
          role={user.role}
          age={user.age}
          skills={user.skills}
        />
      </div>
    </div>
  );
}

export default App;