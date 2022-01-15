import 'tailwindcss/tailwind.css'
import '../scss/global.scss';
//Toast
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AuthContext from '../context/AuthContext';
import jwtDecode from 'jwt-decode';
import { setToken } from '../Helpers/functionsAuth';
import useAuth from '../Hooks/useAuth';

function MyApp({ Component, pageProps }) {
      const {auth, login, logOut,setReloadUser,reloadUser} = useAuth();
      console.log(auth);
  return ( 
                  <AuthContext.Provider value={{
                    auth,
                    login,
                    logOut,
                    setReloadUser,
                    reloadUser
                  }}>
                    <Component {...pageProps} />
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
                </AuthContext.Provider>
          )
}

export default MyApp
