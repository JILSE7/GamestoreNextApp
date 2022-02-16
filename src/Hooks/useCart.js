import {  useState, useEffect } from 'react'
import CartContext from '../context/CartContext'



import React from 'react'
import { countProductsCart } from '../api/cart';


const useCart = () => {
    
    const [cart, setCart] = useState(0);
    const [reloadCart, setreloadCart] = useState(false);
    
    useEffect(() => {
      setCart(countProductsCart());
    }, [reloadCart]);
    


  return {
    cart,
    setreloadCart
  }
    
  
}

export default useCart