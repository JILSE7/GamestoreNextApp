import { showCheckError, showCheckToast } from "../Helpers/toast";

import {BASE_PATH} from '../utils/constants';
import {authFetch} from '../utils/feth';



export const getProductsC = () => {

    const h = JSON.parse(localStorage.getItem('cart'));

    

    

    return h;
    /* const cart = localStorage.getItem('cart');

    if(cart){
        return cart.split(',');
    }else{
        return [];
} */
};


export const addProductC = (product) => {

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const resp = cart.includes(product)
    
    if(resp){
        showCheckError("Este producto ya ha sido añadido al carrito");
    }else{
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        showCheckToast("Excelente!, producto añadido");
    } 
    
}


export const countProductsCart = () => {
    console.log("countProducts");
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    return cart.length;
}


export const paymentCartApi = async(token, products, idUser, address, logout) => {
    try {
        const addressShipping = address;
        delete addressShipping.user;
        delete addressShipping.createAt;

        const url = `${BASE_PATH}/orders`;
        const params = {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                token,
                products,
                idUser,
                addressShipping
            })
        };

        const result = await authFetch(url, params,logout);
        return result;
        
    } catch (error) {
        
    }
}


export const cleanCart = () => {
    localStorage.removeItem('cart');
}