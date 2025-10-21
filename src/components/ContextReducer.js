import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const ADD = "ADD";
const REMOVE = "REMOVE";
const CLEAR = "CLEAR";

const reducer = (state, action) => {
  switch (action.type) {
    case ADD:
      return [...state, action.item];
    case REMOVE:
      return state.filter(item => item.id !== action.id);
    case CLEAR:
      return [];
    default:
      console.log("Error in Reducer");
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, [], () => {
    const local = localStorage.getItem("cart");
    return local ? JSON.parse(local) : [];
  });

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
