import DashboardStats from "./components/DashboardStats";
import OrderList from "./components/OrderList";
import ProductList from "./components/ProductList";
import UserList from "./components/userList";


const App = () => {
  return (
    <div>
      <h2>
         <UserList />
         <ProductList />
         <OrderList />
      </h2>

      <div>
        <DashboardStats/>
      </div>
    </div>
  );
};

export default App;