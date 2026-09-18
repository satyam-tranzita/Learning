const initialState = {
  count: 0
};

export const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "counter/increment":
      return {
        ...state,
        count: state.count + 1
      };

    case "counter/decrement":
      return {
        ...state,
        count: state.count - 1
      };

    case "counter/incrementByAmount":
      return {
        ...state,
        count: state.count + action.payload
      };

    case "counter/reset":
      return {
        ...state,
        count: 0
      };

    default:
      return state;
  }
};