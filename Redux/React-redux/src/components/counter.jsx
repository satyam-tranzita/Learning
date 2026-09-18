import { useDispatch, useSelector } from "react-redux";

import {
  increment,
  decrement,
  incrementByAmount,
  reset
} from "../redux/action.js"
function Counter() {
  const count = useSelector((state) => state.count);

  const dispatch = useDispatch();

  return (
    <div>
      <h1>Count: {count}</h1>
 {/* usedispatch --->access redux dispacth---> dispatch increment ---->now this redux==> send to reducer */}
      <button onClick={() => dispatch(increment())}>
        +
      </button>

      <button onClick={() => dispatch(decrement())}>
        -
      </button>

      <button onClick={() => dispatch(incrementByAmount(10))}>
        +10
      </button>

      <button onClick={() => dispatch(reset())}>
        Reset
      </button>
    </div>
  );
}

export default Counter;




// Redux state changes
//        ↓
// useSelector detects selected value changed
//        ↓
// Counter component re-renders
//        ↓
// UI updates