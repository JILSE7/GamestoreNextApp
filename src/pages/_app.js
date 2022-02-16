import 'tailwindcss/tailwind.css'
import '../scss/global.scss';
//Toast
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AuthContext from '../context/AuthContext';
import useAuth from '../Hooks/useAuth';

import CartContext from '../context/CartContext';
import useCart from '../Hooks/useCart';
import { getProductsC } from '../api/cart';



function MyApp({ Component, pageProps }) {
      const {auth, login, logOut,setReloadUser,reloadUser, addProduct} = useAuth();      

      const {cart, setreloadCart} = useCart();
  return (        

        <AuthContext.Provider value={{
          auth,
          login,
          logOut,
          setReloadUser,
          reloadUser,
          setreloadCart
        }}>
            <CartContext.Provider value={{
              addProductCart:addProduct,
              getProductsCart: getProductsC,
              products: cart
             /* removeAllProductCart,
              removeProductCart */}}>

                <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                pauseOnHover
                />
                <Component {...pageProps} />

          </CartContext.Provider>
      </AuthContext.Provider>
      )
}

export default MyApp
