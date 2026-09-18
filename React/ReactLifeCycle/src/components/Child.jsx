import { useEffect, useState } from "react";

function Child({ count }) {

  const [childCount, setChildCount] = useState(0);

  console.log("🟢 Child Render");

  // MOUNT + UNMOUNT
  useEffect(() => {

    console.log("🟡 Child Mounted");

    return () => {
      console.log("🔴 Child Unmounted / Cleanup");
    };

  }, []);


  // UPDATE
  useEffect(() => {

    console.log("🟣 Child count changed:", count);

  }, [count]);


  // Child state update
  useEffect(() => {

    console.log("🟠 Child state changed:", childCount);

  }, [childCount]);


  return (
    <div className="child-card">

      <div className="badge child-badge">
        CHILD
      </div>

      <h2>Child Component</h2>

      <div className="value">
        Parent Count:
        <strong> {count}</strong>
      </div>

      <div className="value">
        Child Count:
        <strong> {childCount}</strong>
      </div>

      <button
        onClick={() => setChildCount(childCount + 1)}
      >
        Update Child
      </button>

      <div className="status">

        <p>
          🟢 Component is currently mounted
        </p>

        <p>
          📦 Received prop:
          <strong> count</strong>
        </p>

        <p>
          🔄 Updating child state causes Child re-render
        </p>

      </div>

    </div>
  );
}

export default Child;