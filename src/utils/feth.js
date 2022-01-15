import { getToken, hasExpired } from "../Helpers/functionsAuth";
import { BASE_PATH } from "./constants";

export const fetchFunction = (endpoint, data, method = 'GET') =>{

    const url = `${BASE_PATH}/${endpoint}`;

    if(method === 'GET'){
        return fetch(url);
    }else{
        return fetch(url, {
            method,
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify(data)
        })
    }
}


export const authFetch =async (url, params, logOut) => {
    //Extraer el token
    const token = getToken();
    //Comprobación del token
    if(!token){
        logOut();
    }else{
        if(hasExpired(token)){
            //Token caducado
            logOut()
        }else{
            const paramsTemp = {
                ...params,
                headers: {
                    ...params?.headers,
                    Authorization: `Bearer ${token}`
                }
            };
            //Peticion
            try {
                return await (await fetch(url, paramsTemp)).json();
            } catch (error) {
                console.log(error);
            }
        }
    }
}