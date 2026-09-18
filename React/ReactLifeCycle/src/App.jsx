import { useState } from "react";
import Child from "./components/Child";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [showChild, setShowChild] = useState(true);

  console.log("🔵 Parent Render");

  return (
    <div className="app">

      <h1>React Lifecycle Visualizer</h1>

      <p className="subtitle">
        Mount → Update → Unmount
      </p>

      {/* Parent Section */}
      <div className="parent-card">

        <div className="badge parent-badge">
          PARENT
        </div>

        <h2>App Component</h2>

        <p>
          Parent Count:
          <strong> {count}</strong>
        </p>

        <div className="buttons">

          <button onClick={() => setCount(count + 1)}>
            Update Parent
          </button>

          <button onClick={() => setShowChild(!showChild)}>
            {showChild ? "Unmount Child" : "Mount Child"}
          </button>

        </div>

      </div>

      <div className="arrow">
        ↓
        <span>props</span>
        ↓
      </div>

      {/* Child */}
      {showChild && (
        <Child count={count} />
      )}

      {!showChild && (
        <div className="unmounted">
          🔴 Child is Unmounted
        </div>
      )}

      {/* Lifecycle explanation */}

      <div className="lifecycle">

        <h2>Lifecycle</h2>

        <div className="steps">

          <div className="step">
            <span>1</span>
            <h3>Mount</h3>
            <p>Component is created and displayed.</p>
          </div>

          <div className="step">
            <span>2</span>
            <h3>Update</h3>
            <p>State or props change → component renders again.</p>
          </div>

          <div className="step">
            <span>3</span>
            <h3>Unmount</h3>
            <p>Component is removed from the screen.</p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default App;