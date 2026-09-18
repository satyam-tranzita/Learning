const initialState = {
  count: 0
};

export const counterReducer = (state = initialState, action) => {

  switch (action.type) { //reducer checks action type

    case "counter/increment":
      return {
        ...state,
        count: state.count + 1
      };

    case "counter/decrement":
      return {
        ...state, //copy exisiting + change state -->redux follows immutable principle
        count: state.count - 1
      };

    case "counter/incrementByAmount":
      return {
        ...state,
        count: state.count + action.payload
      };

    default:
      return state;
  }
};






            //      index.js
            //         |
            //         |
            //   dispatch(action)
            //         |
            //         ↓
            //       Store
            //         |
            //         ↓
            //     Reducer
            //         |
            //         ↓
            //     New State
            //         |
            //         ↓
            //       Store
            //         |
            //         ↓
            //     subscribe()