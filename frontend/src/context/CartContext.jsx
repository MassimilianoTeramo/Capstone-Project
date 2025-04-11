import React, {useReducer, useContext, createContext, useState, useEffect} from "react";
import api from "../utils/api";

const CartStateContext = createContext()
const CartDispatchContext = createContext()

const getInitialCart = () => {
    if (typeof window !== "undefined") {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
}

const reducer = (state, action) =>{
    switch(action.type) {
        case "ADD":
            const newState = [...state, action.item];
            localStorage.setItem("cart", JSON.stringify(newState));
            return newState;
        case "REMOVE":
            const filteredState = state.filter((_, index) => index !== action.index);
            localStorage.setItem("cart", JSON.stringify(filteredState));
            return filteredState;
        case "CLEAR":
            localStorage.removeItem("cart");
            return [];
        default:
            throw new Error(`unknown action ${action.type}`);
    }
}


export const CartProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, [], getInitialCart)
    return(
        <CartDispatchContext value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>

        </CartDispatchContext>
    )
}

export const useCart = ()=> useContext(CartStateContext);
export const useDispatchCart = ()=> useContext(CartDispatchContext);