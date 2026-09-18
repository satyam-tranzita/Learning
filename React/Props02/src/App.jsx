import { useState } from "react";
import ProfileCard from "./components/ProfileCard";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  console.log("🔵 Parent App rendered");

  const user = {
    name: "Satyam",
    role: "Frontend Developer",
    age: 22,
    skills: ["React", "JavaScript", "CSS"],
  };

  return (
    <div className="app">
      <h1>Parent → Child Re-render</h1>

      <div className="counter-box">
        <h2>Parent Count: {count}</h2>


        <button onClick={() => setCount(count + 1)}>
          Re-render Parent
        </button>
      </div>

      <div className="flow">

        <div className="box parent">
          <strong>App</strong>
          <span>Parent Component</span>
          <span>Count: {count}</span>
        </div>

        <div className="arrow">↓ props ↓</div>
{/* parent-->child */}
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