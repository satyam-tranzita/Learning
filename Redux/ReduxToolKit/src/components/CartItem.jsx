import { useDispatch } from "react-redux";

import {
  increaseQuantity,
  decreaseQuantity,
  removeItem
} from "../features/CartSlice";

function CartItem({ item }) {
  const dispatch = useDispatch();

  return (
    <div>
      <h3>{item.name}</h3>

      <p>Price: ₹{item.price}</p>

      <p>Quantity: {item.quantity}</p>

      <button
        onClick={() =>
          dispatch(decreaseQuantity(item.id))
        }
      >
        -
      </button>

      <button
        onClick={() =>
          dispatch(increaseQuantity(item.id))
        }
      >
        +
      </button>

      <button
        onClick={() =>
          dispatch(removeItem(item.id))
        }
      >
        Remove
      </button>
    </div>
  );
}

export default CartItem;