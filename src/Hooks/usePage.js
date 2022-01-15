

import  { useContext, useEffect, useState } from 'react'
import { getMeApi } from '../api/user';
import AuthContext from '../context/AuthContext';

const usePage = () => {
    const {auth,logOut} = useContext(AuthContext);
    const [user, setUser] = useState(undefined);
    
    
    useEffect(() => {
        (async()=>{
            const response = await getMeApi(logOut);
            if(response){
                setUser(response)
            }
        })()
    }, [auth]);

    return{
        auth,
        user
    }
}

export default usePage
