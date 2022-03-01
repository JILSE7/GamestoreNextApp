
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'
import { addProductC } from '../api/cart';
import { getToken, removeToken, setToken } from '../Helpers/functionsAuth';
import { showCheckError } from '../Helpers/toast';

const useAuth = () => {
    const router = useRouter();
    const [auth, setAuth] = useState(undefined);
    const [reloadUser, setReloadUser] = useState(false);
    
    
    
    const login = (token) => {
      
      setAuth({
        token,
            idUser: jwtDecode(token).id
          });
          //Guardando token en LS
          setToken(token);
        };

        const logOut = () => {
        if(auth){
          //console.log('toy logueado');
          removeToken();
          setAuth(undefined);
          router.push('/');
          
        }
      };
      
      
      const addProduct = (product) => {
        
        if(getToken()){
          //console.log("entro aqui");
          addProductC(product);
        }else{
          showCheckError("Para comprar necesitas iniciar sesión");
        }
      };
      
      
      useEffect(() => {
        const token = getToken();
        
        token ? setAuth({
          token,
          idUser: jwtDecode(token).id
        }) : setAuth(undefined);
        setReloadUser(false);
      }, [reloadUser]);
    


    return {
        addProduct,
        auth,
        login,
        logOut,
        reloadUser,
        setAuth,
        setReloadUser,

    }
}

export default useAuth
