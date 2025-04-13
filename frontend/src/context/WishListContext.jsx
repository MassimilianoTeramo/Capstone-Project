import React, {useReducer, useContext, createContext} from "react";


const WishStateContext = createContext()
const WishDispatchContext = createContext()


const getInitialWishList = () => {
    return [];
}


const reducer = (state, action) =>{
    switch(action.type) {
        case "UPDATE":
            return [...action.items]
        default:
            throw new Error(`unknown action ${action.type}`);
    }
}

export const WishProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, [], getInitialWishList);
    return (
    <WishDispatchContext value={dispatch}>
            <WishStateContext.Provider value={state}>
                {children}
            </WishStateContext.Provider>

        </WishDispatchContext>
    )
};

export const useWish = ()=> useContext(WishStateContext);
export const useDispatchWish = ()=> useContext(WishDispatchContext);