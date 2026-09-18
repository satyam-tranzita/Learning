import {
  useDispatch,
  useSelector
} from "react-redux";

import {
  fetchUsers
} from "../features/users/userSlice";

import {
  selectUsers,
  selectLoading,
  selectError
} from "../features/users/userSelector";

function UserList() {

  const dispatch = useDispatch();

  const users = useSelector(selectUsers);

  const loading = useSelector(
    selectLoading
  );

  const error = useSelector(
    selectError
  );

  const handleFetchUsers = () => {
    dispatch(fetchUsers());
  };

  return (
    <div>

      <h2>User Management</h2>

      <button
        onClick={handleFetchUsers}
        disabled={loading}
      >
        {loading
          ? "Loading..."
          : "Fetch Users"}
      </button>

      {loading && (
        <p>
          Loading users...
        </p>
      )}

      {error && (
        <p>
          Error: {error}
        </p>
      )}

      {!loading &&
        !error &&
        users.map(user => (
          <div key={user.id}>

            <h3>
              {user.name}
            </h3>

            <p>
              Email: {user.email}
            </p>

            <p>
              Phone: {user.phone}
            </p>

          </div>
        ))}

    </div>
  );
}

export default UserList;