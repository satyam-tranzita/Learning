import {
  useDispatch,
  useSelector
} from "react-redux";

import {
  addUser,
  deleteUser,
  setSearchTerm
} from "../features/users/userSlice";

import {
  selectFilteredUsers,
  selectSearchTerm
} from "../features/users/userSelectors";

function UserList() {
  const dispatch = useDispatch();

  const users = useSelector(selectFilteredUsers);

  const searchTerm = useSelector(
    selectSearchTerm
  );

  const handleAddUser = () => {
    const newUser = {
      id: Date.now(),
      name: "Satyam",
      email: "satyam@gmail.com",
      active: true
    };

    dispatch(addUser(newUser));
  };

  return (
    <div>
      <h2>Users</h2>

      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={e =>
          dispatch(
            setSearchTerm(e.target.value)
          )
        }
      />

      <button onClick={handleAddUser}>
        Add User
      </button>

      {users.map(user => (
        <div key={user.id}>
          <h3>{user.name}</h3>

          <p>{user.email}</p>

          <p>
            {user.active
              ? "Active"
              : "Inactive"}
          </p>

          <button
            onClick={() =>
              dispatch(deleteUser(user.id))
            }
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default UserList;