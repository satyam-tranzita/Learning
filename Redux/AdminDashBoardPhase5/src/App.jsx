import { useEffect } from "react";

import { useDispatch } from "react-redux";

import {
  addUsers
} from "./features/users/userSlice";

import {
  addProducts
} from "./features/products/productSlice";

import {
  addOrders
} from "./features/orders/orderSlice";

import UserList from "./components/UserList";
import ProductList from "./components/ProductList";
import OrderList from "./components/OrderList";
import OrderDetails from "./components/OrderDetails";

function App() {

  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(
      addUsers([
        {
          id: 1,
          name: "Satyam",
          email: "satyam@gmail.com",
          active: true
        },

        {
          id: 2,
          name: "Rahul",
          email: "rahul@gmail.com",
          active: true
        }
      ])
    );

    dispatch(
      addProducts([
        {
          id: 101,
          name: "Laptop",
          price: 60000,
          stock: 10
        },

        {
          id: 102,
          name: "Mouse",
          price: 1000,
          stock: 20
        }
      ])
    );

    dispatch(
      addOrders([
        {
          id: 1001,

          userId: 1,

          productIds: [
            101,
            102
          ],

          amount: 61000,

          status: "Pending"
        }
      ])
    );

  }, [dispatch]);

  return (
    <div>
      <h1>
        Redux Admin Dashboard
      </h1>

      <hr />

      <UserList />

      <hr />

      <ProductList />

      <hr />

      <OrderList />

      <hr />

      <OrderDetails
        orderId={1001}
      />
    </div>
  );
}

export default App;