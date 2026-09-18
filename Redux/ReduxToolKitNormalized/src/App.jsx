
import UserList from "./components/userList";

import ProductList from "./components/ProductList";
import OrderList from "./components/OrderList";

function App() {
  return (
    <div>
      <h1>Redux Admin Dashboard</h1>

      <UserStats />

      <hr />

      <UserForm />

      <UserList />

      <hr />

      <ProductList />

      <hr />

      <OrderList />
    </div>
  );
}

export default App;