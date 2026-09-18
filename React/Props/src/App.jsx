import { useCallback, useMemo, useState } from "react";
import ProfileCard from "./components/ProfileCard";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  console.log("🔵 Parent App rendered");

  // 1️⃣ useCallback
  // Keeps the same function reference between renders
  const handleChildClick = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  // 2️⃣ useMemo
  // Keeps the same object reference between renders
  const user = useMemo(
    () => ({
      name: "Satyam",
      role: "Frontend Developer",
      age: 22,
      skills: ["React", "JavaScript", "CSS"],
    }),
    []
  );

  return (
    <div className="app">
      <h1>React Performance Demo</h1>

      <p className="subtitle">
        React.memo + useCallback + useMemo
      </p>

      {/* Parent State */}
      <div className="counter-box">
        <h2>Parent Count: {count}</h2>

        <p>
          Click the button inside the Child.
        </p>
      </div>

      {/* Visualization */}
      <div className="flow">

        {/* PARENT */}
        <div className="box parent">
          <strong>App</strong>
          <span>Parent Component</span>
          <span>Count: {count}</span>
        </div>

        <div className="arrow">
          ↓ props ↓
        </div>

        {/* CHILD */}
        <ProfileCard
          user={user} //object
          onChildClick={handleChildClick} //callbackfunction
        />

      </div>
    </div>
  );
}

export default App;