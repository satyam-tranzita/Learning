export const increment = () => ({
    type: "action/increment"
});

export const decrement = () => ({
    type: "action/decrement"
});

export const amount = (amount) => ({
    type: "action/amount",
    payload: amount
});

