import { useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeItem
} from "../redux/actions";

const CartItem = ({item}) => {
    const dispatch=useDispatch()
  return (
    <div>
      <h2>{item.name}</h2>
      <p>
        Price:rs{item.price}
      </p>
      <p>quantity:{item.quantity}</p>

      <button onClick={()=>dispatch(increaseQuantity(item.id))}>increaseQuantity</button>
      <button onClick={()=>dispatch(decreaseQuantity(item.id))}>decreaseuantity</button>
      <button onClick={()=>dispatch(removeItem(item.id))}>removeQuantity</button>

    </div>
  );
};

export default CartItem;