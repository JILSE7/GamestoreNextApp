import { createContext } from "react";


const initialState = {
    productCart: 0,
    addProductCart: () => null,
    getProductsCart: () => null,
    removeProductCart: () => null,
    removeAllProductCart: () => null,
};


const CartContext = createContext(initialState);

export default CartContext;