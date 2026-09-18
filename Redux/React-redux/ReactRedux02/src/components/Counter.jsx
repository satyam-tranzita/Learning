import { useDispatch, useSelector } from "react-redux";
import {
  increment,
  decrement,
   amount
} from "../redux/actions";

const Counter = () => {
    const dispatch=useDispatch();
    const count=useSelector((state)=>state.count)
  return (
    <div>
      <h2>Counter</h2>
         <h1>Count: {count}</h1>
      <div>
      <button onClick={() => dispatch(increment())}>
    +
</button>
        <button onClick={()=>dispatch(decrement())}>-</button>
        

        <button onClick={()=>dispatch(amount(10))}>+++</button>
      </div>
    </div>
  );
};

export default Counter;