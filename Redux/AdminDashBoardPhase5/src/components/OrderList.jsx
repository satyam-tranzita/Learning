import {
  useDispatch,
  useSelector
} from "react-redux";

import {
  addOrder,
  updateOrder
} from "../features/orders/orderSlice";

import {
  selectOrders
} from "../features/orders/orderSelectors";

function OrderList() {
  const dispatch = useDispatch();

  const orders = useSelector(
    selectOrders
  );

  const handleAddOrder = () => {
    const order = {
      id: Date.now(),

      userId: 1,

      productIds: [101, 102],

      amount: 61000,

      status: "Pending"
    };

    dispatch(addOrder(order));
  };

  const handleDeliver = id => {
    dispatch(
      updateOrder({
        id,

        changes: {
          status: "Delivered"
        }
      })
    );
  };

  return (
    <div>
      <h2>Orders</h2>

      <button onClick={handleAddOrder}>
        Add Order
      </button>

      {orders.map(order => (
        <div key={order.id}>
          <h3>
            Order #{order.id}
          </h3>

          <p>
            User ID: {order.userId}
          </p>

          <p>
            Amount: ₹{order.amount}
          </p>

          <p>
            Status: {order.status}
          </p>

          <p>
            Products:
            {" "}
            {order.productIds.join(", ")}
          </p>

          {order.status === "Pending" && (
            <button
              onClick={() =>
                handleDeliver(order.id)
              }
            >
              Mark Delivered
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default OrderList;