import {
  useDispatch,
  useSelector
} from "react-redux";

import {
  addUser,
  setSearchTerm
} from "../features/users/userSlice";

import {
  selectFilteredUsers,
  selectSearchTerm
} from "../features/users/userSelector";

function UserList() {
  const dispatch = useDispatch();

  const users = useSelector(
    selectFilteredUsers
  );

  const searchTerm = useSelector(
    selectSearchTerm
  );

  const handleAddUser = () => {
    const user = {
      id: Date.now(),
      name: `User ${Date.now()}`,
      email: `user${Date.now()}@example.com`,
      active: true
    };

    dispatch(addUser(user));
  };

  const handleSearch = e => {
    dispatch(
      setSearchTerm(e.target.value)
    );
  };

  return (
    <div>
      <h2>Users</h2>

      <button onClick={handleAddUser}>
        Add User
      </button>

      <br />
      <br />

      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={handleSearch}
      />

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        users.map(user => (
          <div key={user.id}>
            <h3>{user.name}</h3>

            <p>{user.email}</p>

            <p>
              Status:{" "}
              {user.active
                ? "Active"
                : "Inactive"}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default UserList;