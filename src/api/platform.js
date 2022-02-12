import { BASE_PATH } from "../utils/constants";

export const getPlatformsApi =  async() => {

    try{
        const url = `${BASE_PATH}/platforms?_sort=position:asc`;

        return await(await fetch(url)).json();
        
    }catch(e){
        console.log(e);
    }

}