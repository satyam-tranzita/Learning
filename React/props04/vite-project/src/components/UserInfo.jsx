function UserInfo({ user }) {

  console.log("UserInfo rendered");

  return (
    <div className="user-info">

      <div className="avatar">
        {user.name.charAt(0)}
      </div>

      <h2>{user.name}</h2>

      <p>{user.role}</p>

      <p>
        Age: {user.age}
      </p>

    </div>
  );
}

export default UserInfo;