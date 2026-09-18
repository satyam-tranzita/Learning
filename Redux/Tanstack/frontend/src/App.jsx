import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "./api/userApi";

function App() {

 const {
    data,
    isLoading,
    error
} = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 30_000,
    gcTime: 300_000
});
    if (isLoading) {
        return <h2>Loading users...</h2>;
    }

    if (error) {
        return <h2>Error: {error.message}</h2>;
    }

    return (
        <div>
            <h1>User Management</h1>

            {data.map((user) => (
                <div key={user.id}>
                    <h3>{user.name}</h3>
                    <p>{user.email}</p>
                    <p>{user.role}</p>
                    <p>{user.status}</p>
                </div>
            ))}
        </div>
    );
}

export default App;