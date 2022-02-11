import { showCheckError } from "../Helpers/toast";
import { BASE_PATH } from "../utils/constants";
import { authFetch } from "../utils/feth";

export const createAddress = async(address, logOut) => {
        try {
            const url = `${BASE_PATH}/addresses`;
            const params = {
                method: 'POST',
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(address)
            }
            return  await authFetch(url,params,logOut);
    } catch (error) {
        console.log(error);
        showCheckError("Error al crear la nueva direccion")
    }
}


export const getAdress =  async(user,logOut) => {
    try {
        const url = `${BASE_PATH}/addresses?users_permissions_user=${user}`;
        const params = {
            method: 'GET',
            headers: {
                "Content-Type" : "application/json"
            }
        }
        return  await authFetch(url,params,logOut);
        
    } catch (error) {
        console.log(error);
        showCheckError("Error al crear la nueva direccion")
    }
}