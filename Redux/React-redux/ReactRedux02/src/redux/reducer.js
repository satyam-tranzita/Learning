const initialState={
    count:0
}

export const CountReducer=(state=initialState,action)=>{
    switch(action.type){
        case "action/increment":
            return{
                ...state,
                count:state.count+1
            }
          case "action/decrement":
            return{
                ...state,
                count:state.count-1
            }
          case "action/amount":
            return{
                ...state,
                count:state.count+action.payload
            }
         default:
            return state
    }
}

import {
    increment,
    decrement,
    amount
} from "./actions.js"
export default CountReducer;