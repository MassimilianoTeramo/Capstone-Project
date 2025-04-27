import React, {
  useReducer,
  useContext,
  createContext,
  useState,
  useEffect,
} from "react";
import api from "../utils/api";

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const getInitialCart = () => {
  if (typeof window !== "undefined") {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  }
  return [];
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      const existingItem = state.find((item) => item._id === action.item._id);
      if (existingItem) {
        const newState = state.map((item) =>
          item._id === action.item._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        localStorage.setItem("cart", JSON.stringify(newState));
        return newState;
      } else {
        const newState = [...state, { ...action.item, quantity: 1 }];
        localStorage.setItem("cart", JSON.stringify(newState));
        return newState;
      }
    case "REMOVE":
      const filteredState = state.filter(
        (item) => item._id !== action.payload.id
      );
      localStorage.setItem("cart", JSON.stringify(filteredState));
      return filteredState;
    case "UPDATE_QUANTITY":
      const updatedState = state.map((item) =>
        item._id === action.payload.id
          ? {
              ...item,
              quantity: Math.max(1, item.quantity + action.payload.change),
            }
          : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedState));
      return updatedState;
    case "CLEAR":
      localStorage.removeItem("cart");
      return [];
    default:
      throw new Error(`unknown action ${action.type}`);
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, [], getInitialCart);
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
