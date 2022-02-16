import { BASE_PATH } from "../utils/constants";
import { authFetch } from "../utils/feth";



export const isFavorite = async(idUser, idGame, logout) => {

    try {
        const url = `${BASE_PATH}/favorites?user=${idUser}&game=${idGame}`;

        return await authFetch(url, null, logout)
    } catch (error) {
        console.log(error);
    }

}


export const addFavorite = async(idUser, idGame, logout) => {
    try {
        const url = `${BASE_PATH}/favorites`;

        const params = {
            method: 'POST',
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({user:idUser, game:idGame})
        }

        return await authFetch(url, params, logout);

    } catch (error) {
        console.log(error);
    }
}


export const deleteFavorite = async(id, logout) => {
    try {
        const url = `${BASE_PATH}/favorites/${id}`;

        const params = {
            method: 'DELETE',
            headers: {
                "Content-Type" : "application/json"
            }
        }

        return await authFetch(url, params, logout);

    } catch (error) {
        console.log(error);
    }
}


export const getFavorites = async(idUser, logout) => {
    try {
        const url = `${BASE_PATH}/favorites?user=${idUser}`;


        return await authFetch(url, null, logout);

    } catch (error) {
        console.log(error);
    }
}