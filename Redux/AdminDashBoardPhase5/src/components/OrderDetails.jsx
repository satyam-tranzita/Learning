import { useSelector } from "react-redux";

import {
  selectOrderById,
  selectProductsForOrder
} from "../features/orders/orderSelectors";

import {
  selectUserById
} from "../features/users/userSelectors";

function OrderDetails({ orderId }) {

  const order = useSelector(
    state =>
      selectOrderById(state, orderId)
  );

  const user = useSelector(
    state =>
      order
        ? selectUserById(
            state,
            order.userId
          )
        : null
  );

  const products = useSelector(
    state =>
      selectProductsForOrder(
        state,
        orderId
      )
  );

  if (!order) {
    return (
      <p>
        Order not found
      </p>
    );
  }

  return (
    <div>
      <h2>
        Order Details
      </h2>

      <p>
        Order ID: {order.id}
      </p>

      <p>
        Customer:
        {" "}
        {user?.name || "Unknown"}
      </p>

      <h3>
        Products
      </h3>

      {products.map(product => (
        <div key={product.id}>
          <p>
            {product.name}
            {" - "}
            ₹{product.price}
          </p>
        </div>
      ))}

      <p>
        Amount: ₹{order.amount}
      </p>

      <p>
        Status: {order.status}
      </p>
    </div>
  );
}

export default OrderDetails;