
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'
import { getToken, removeToken, setToken } from '../Helpers/functionsAuth';

const useAuth = () => {
  const router = useRouter();
    const [auth, setAuth] = useState(undefined);
    const [reloadUser, setReloadUser] = useState(false);
    useEffect(() => {
      console.log("han actualizado al usuario");
      const token = getToken();
      
      token ? setAuth({
        token,
        idUser: jwtDecode(token).id
      }) : setAuth(null);
      setReloadUser(false);
    }, [reloadUser])
    
      const login = (token) => {
            
          setAuth({
            token,
            idUser: jwtDecode(token).id
          });
          //Guardando token en LS
          setToken(token);
      }

      const logOut = () => {
        if(auth){
          //console.log('toy logueado');
          removeToken();
          setAuth(null);
          router.push('/');
          
        }
      }
    
   /*  const authData = useMemo(() => ({
      auth,
      login,
      logOut: ()=>{},
      setReload : () => {}
    }), []); */


    return {
        auth,
        setAuth,
        login,
        logOut,
        setReloadUser,
        reloadUser
    }
}

export default useAuth
