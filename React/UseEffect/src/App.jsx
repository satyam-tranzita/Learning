import { useEffect, useState } from "react";

function App() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    console.log("useEffect executed");

    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      });

  }, []);

  const [count, setCount] = useState(0);

useEffect(() => {
  setCount(count + 1);
}, [count]);

  return (
    <div>

      <h1>User List</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        users.map(user => (
          <div key={user.id}>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>
        ))
      )}
      <button onclick={count}>Click me </button>

    </div>
  );
}

export default App;