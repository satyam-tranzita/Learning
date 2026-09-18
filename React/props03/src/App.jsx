import { useState } from "react";
import ProfileCard from "./components/ProfileCard";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  console.log("🔵 Parent App rendered");

  // Parent function
  function handleChildClick() {
    setCount((prev) => prev + 1);
  }

  const user = {
    name: "Satyam",
    role: "Frontend Developer",
    age: 22,
    skills: ["React", "JavaScript", "CSS"],
  };

  return (
    <div className="app">

      <h1>Child → Parent Communication</h1>

      <div className="counter-box">
        <h2>Parent Count: {count}</h2>

        <p>
          The button is inside the Child component.
        </p>
      </div>

      <div className="flow">

        {/* PARENT */}
        <div className="box parent">
          <strong>App</strong>
          <span>Parent Component</span>

          <span>
            Count: {count}
          </span>
        </div>

        <div className="arrow">
          ↓ props ↓
        </div>

        {/* CHILD recieves a function and call it*/}
        {/* A child cannot directly modify the parent's state. The parent passes a callback function to the child as a prop. The child calls that callback, and the callback updates the parent's state. */}
        <ProfileCard
          name={user.name}
          role={user.role}
          age={user.age}
          skills={user.skills}
          onChildClick={handleChildClick}
        />

      </div>

    </div>
  );
}

export default App;