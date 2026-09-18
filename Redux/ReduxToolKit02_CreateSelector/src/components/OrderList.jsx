import { useDispatch, useSelector } from "react-redux";
import {
  addOrder,
  updateOrderStatus
} from "../features/orders/orderSlice";

function OrderList() {
  const dispatch = useDispatch();

  const orders = useSelector(
    state => state.orders.items
  );

  const handleAddOrder = () => {
    const order = {
      id: Date.now(),
      customer: "Satyam",
      amount: 60000,
      status: "Pending"
    };

    dispatch(addOrder(order));
  };

  return (
    <div>
      <h2>Orders</h2>

      <button onClick={handleAddOrder}>
        Add Order
      </button>

      {orders.map(order => (
        <div key={order.id}>
          <h3>Order #{order.id}</h3>

          <p>Customer: {order.customer}</p>

          <p>Amount: ₹{order.amount}</p>

          <p>Status: {order.status}</p>

          <button
            onClick={() =>
              dispatch(
                updateOrderStatus({
                  id: order.id,
                  status: "Delivered"
                })
              )
            }
          >
            Mark Delivered
          </button>
        </div>
      ))}
    </div>
  );
}

export default OrderList;