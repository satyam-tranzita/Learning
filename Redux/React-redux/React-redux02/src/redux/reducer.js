const initialState = {
  items: []
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {

    case "cart/addItem": {
      const existingItem = state.items.find(
        item => item.id === action.payload.id
      );

      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? {
                  ...item,
                  quantity: item.quantity + 1
                }
              : item
          )
        };
      }

      return {
        ...state,
        items: [
          ...state.items,
          {
            ...action.payload,
            quantity: 1
          }
        ]
      };
    }

    case "cart/removeItem":
      return {
        ...state,
        items: state.items.filter(
          item => item.id !== action.payload
        )
      };

    case "cart/increaseQuantity":
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload
            ? {
                ...item,
                quantity: item.quantity + 1
              }
            : item
        )
      };

    case "cart/decreaseQuantity": {
      const item = state.items.find(
        item => item.id === action.payload
      );

      if (!item) {
        return state;
      }

      if (item.quantity === 1) {
        return {
          ...state,
          items: state.items.filter(
            item => item.id !== action.payload
          )
        };
      }

      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload
            ? {
                ...item,
                quantity: item.quantity - 1
              }
            : item
        )
      };
    }

    case "cart/clearCart":
      return {
        ...state,
        items: []
      };

    default:
      return state;
  }
};
