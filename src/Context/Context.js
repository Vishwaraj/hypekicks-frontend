// import { createContext, useContext, useReducer } from "react";
// import {cartReducer} from './Reducer'


// const Cart = createContext();


// export const Context = ({children}) => {

// const initialState = {
//     loading: false,
//     cart: [],
//     error: ''
// }

// const [cartState, cartDispatch] = useReducer(cartReducer, initialState);


// return (
//     <Cart.Provider value={{cartState, cartDispatch}}> {children} </Cart.Provider>
// )

// }

// export const CartState = () => {
//     return useContext(Cart);
// }