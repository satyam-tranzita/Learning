import "./index.css";
import UserTable from "./components/userTable";

const users = [
    {
        id: 1,
        name: "Satyam",
        email: "satyam@example.com",
        role: "Admin",
        status: "Active"
    },
    {
        id: 2,
        name: "Rahul",
        email: "rahul@example.com",
        role: "User",
        status: "Active"
    },
    {
        id: 3,
        name: "Amit",
        email: "amit@example.com",
        role: "User",
        status: "Inactive"
    },
    {
        id: 4,
        name: "Priya",
        email: "priya@example.com",
        role: "Manager",
        status: "Active"
    },
    {
        id: 5,
        name: "Neha",
        email: "neha@example.com",
        role: "User",
        status: "Active"
    },
    {
        id: 6,
        name: "Arjun",
        email: "arjun@example.com",
        role: "Manager",
        status: "Inactive"
    },
    {
        id: 7,
        name: "Ankit",
        email: "ankit@example.com",
        role: "User",
        status: "Active"
    },
    {
        id: 8,
        name: "Riya",
        email: "riya@example.com",
        role: "Admin",
        status: "Active"
    }
];

function App() {
    return (
        <div className="container">
            <h1>Admin User Management</h1>

            <p>Total Users: {users.length}</p>

            <UserTable data={users} />
        </div>
    );
}

export default App;