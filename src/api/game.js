import { showCheckError } from "../Helpers/toast";
import { BASE_PATH } from "../utils/constants";


export const getLastGamesApi = async(limit=10) => {
    try {
        const url = `${BASE_PATH}/games`;
        const result = await (await fetch(url)).json();

        return result;
        
    } catch (error) {
        console.log(error);
        showCheckError("Error al traer los juegos")
    }
};

export const getGamePLatfomApi = async(platform, limit, start) => {
    try {

        const url = `${BASE_PATH}/games?platform=${platform}&_limit=${limit}&_start=${start}&_sort=createdAt:desc`;
        const result = await (await fetch(url)).json();

        return result;
    } catch (error) {
        console.log(error);
    }
}

export const getGameUrl = async(path) => {
    try {
        const url = `${BASE_PATH}/games?url=${path}`;
        const result = await (await fetch(url)).json();

        return result[0] || undefined;

    } catch (error) {
        console.log(error);
    }
}



export const getGame = async(title) => {
    try {
        const url = `${BASE_PATH}/games?_q=${title}`;
        return await (await fetch(url)).json();

    } catch (error) {
        console.log(error);
    }
}