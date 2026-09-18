//contains action creator
export const increment = () => {
  return {
    type: "counter/increment"
  };
};

export const decrement = () => {
  return {
    type: "counter/decrement"
  };
};

export const incrementByAmount = (amount) => {
  return {
    type: "counter/incrementByAmount",
    payload: amount
  };
};