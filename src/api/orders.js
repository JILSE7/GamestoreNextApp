import { BASE_PATH } from "../utils/constants";
import { authFetch } from "../utils/feth";


export const getOrderApi = async(idUser, logout) => {
    try {
        const url = `${BASE_PATH}/orders?_sort=createdAt:desc&users_permissions_user=${idUser}`;
        const result = authFetch(url, null, logout);
        
        return result
    } catch (error) {
        console.log(error);
    }
}