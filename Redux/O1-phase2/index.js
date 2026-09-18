import { store } from "./store.js";

import {
  increment,
  decrement,
  incrementByAmount
} from "./action.js";



console.log("Initial State:", store.getState());

store.subscribe(() => {
  console.log("State changed:", store.getState());
});


store.dispatch(increment());

store.dispatch(increment());

store.dispatch(incrementByAmount(10))

store.dispatch(decrement());