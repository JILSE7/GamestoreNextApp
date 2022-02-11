import { showCheckError, showErrorToast } from "../Helpers/toast";
import { BASE_PATH } from "../utils/constants";
import { authFetch, fetchFunction } from "../utils/feth";


export async function registerApi(formData) {      
    try {
        const register = await (await fetchFunction('auth/local/register', formData, 'POST')).json();
        return register;
    } catch (error) {
        console.log(error);
        return false;
    }
};


export const loginUser = async(formData) => {
    try {
        const login = await (await fetchFunction('auth/local', formData, 'POST')).json();
        return login;    
    } catch (error) {
        console.log(error);
    }
};

export const resetPasswordStrapi = async(email) => {
    
    const res = await fetchFunction('auth/forgot-password', {email}, 'POST');
    const reset = await res.json();

    return reset;
};

export const getMeApi = async(logOut) => {
    try {
        const url = `${BASE_PATH}/users/me`;
        const result = await authFetch(url, null, logOut);
        return result
    } catch (error) {
        console.log(error);
    }
};


export const updateNameApi = async(idUser, data, logOut) => {
    try {
            const url = `${BASE_PATH}/users/${idUser}`;
            const params = {
                method: 'PUT',
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(data)
            }
            return  await authFetch(url,params,logOut);
    } catch (error) {
        
    }
};


export const updateEmailApi = async(idUser, email, logOut) => {
    try {
        const url = `${BASE_PATH}/users/${idUser}`;
            const params = {
                method: 'PUT',
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(email)
            }

            return  await authFetch(url,params,logOut);
    } catch (error) {
        console.log(error);
    }
}

export const updatePassword = async(idUser, password, logOut) => {
    try {
            const url = `${BASE_PATH}/users/${idUser}`;
            const params = {
                method: 'PUT',
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(password)
            }
            return  await authFetch(url,params,logOut);
    } catch (error) {
        showCheckError("Error al actualizar la contraseña")
    }
};




