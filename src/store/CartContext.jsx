import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: () => {},
  removeItem: (id) => {},
});

const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    const existingItemIdx = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const currState = [...state.items];

    if (existingItemIdx > -1) {
      const currentItem = currState[existingItemIdx];

      const updatedItem = {
        ...currentItem,
        quantity: state.items[existingItemIdx].quantity + 1,
      };

      currState[existingItemIdx] = updatedItem;
    } else {
      currState.push({ ...action.item, quantity: 1 });
    }
    return { ...state, items: currState };
  }

  /////////////////////////////

  if (action.type === "REMOVE_ITEM") {
    const existingItemIdx = state.items.findIndex(
      (item) => item.id === action.id
    );

    const currState = [...state.items];
    const currentItem = currState[existingItemIdx];

    if (currentItem.quantity === 1) {
      const currState = [...state.items];
      currState.splice(existingItemIdx, 1);
    } else {
      const updatedItem = {
        ...currentItem,
        quantity: currentItem.quantity - 1,
      };

      currState[existingItemIdx] = updatedItem;
    }
    return { ...state, items: currState };
  }
  return state;
};

export const CartContextProvider = ({ children }) => {
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  const addItem = (item) => {
    dispatchCartAction({ type: "ADD_ITEM", item });
  };
  const removeItem = (id) => {
    dispatchCartAction({ type: "REMOVE_ITEM", id });
  };

  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
  };

  console.log(cartContext);

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
};

export default CartContext;
