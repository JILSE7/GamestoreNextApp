import { showCheckError, showCheckToast } from "../Helpers/toast";



export const getProductsC = () => {
    const cart = localStorage.getItem('cart');

    if(cart){
        return cart.split(',');
    }else{
        return null;
    }
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
    console.log(cart);
    return cart.length;
}