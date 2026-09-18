import { useDispatch, useSelector } from "react-redux";

import {
  clearCart
} from "../features/CartSlice"

import CartItem from "./CartItem";

function Cart() {
  const items = useSelector(
    state => state.cart.items
  );

  const dispatch = useDispatch();

  const totalItems = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = items.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  return (
    <div>
      <h2>Cart</h2>

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {items.map(item => (
            <CartItem
              key={item.id}
              item={item}
            />
          ))}

          <h3>
            Total Items: {totalItems}
          </h3>

          <h3>
            Total Price: ₹{totalPrice}
          </h3>

          <button
            onClick={() => dispatch(clearCart())}
          >
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;