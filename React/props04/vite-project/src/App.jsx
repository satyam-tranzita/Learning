import Dashboard from "./components/Dashboard.jsx";
import "./App.css";

function App() {
  const user = {
    name: "Satyam",
    role: "Frontend Developer",
    age: 22,
  };

  return (
    <div className="app">

      <h1>Props Drilling Demo</h1>

      <p className="subtitle">
        Passing data through multiple components
      </p>

      <div className="flow">

        {/* Level 1 */}
        <div className="component-box app-box">
          <h2>App</h2>
          <p>Has user data</p>
        </div>

        <div className="arrow">
          ↓ user prop
        </div>

        {/* Level 2 */}
        <Dashboard user={user} />

      </div>

    </div>
  );
}

export default App;