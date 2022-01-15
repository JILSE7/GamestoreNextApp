import jwtDecode from "jwt-decode";
import { TOKEN } from "../utils/constants";


const setToken = (token) => {
    localStorage.setItem(TOKEN, token);
}

const getToken = () => localStorage.getItem(TOKEN) || '';

const removeToken  = () => localStorage.removeItem(TOKEN);

const hasExpired = (token) => {
    const tokenDecode = jwtDecode(token);
    const expireDate = tokenDecode.exp * 1000;
    const currentDate = new Date().getTime();
    if(currentDate > expireDate){
        return true;
    }

    return false;
}

  export {
      setToken,
      getToken,
      removeToken,
      hasExpired
  }