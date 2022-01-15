import BasicLayout from "../Components/Layouts/BasicLayout/BasicLayout"
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { getMeApi } from "../api/user";
import AuthContext from "../context/AuthContext";
import AccountForm from "../Components/AccountForm";
import LoginForm from "../Components/Auth/LoginForm";
import AccountEmailForm from "../Components/AccountEmailForm";
import AccountPasswordForm from "../Components/AccountPasswordForm";
import Address from "../Components/Address";


const Account = () => {
    //HACER ESTE COMPONENTE IS LOADING PARA OCUPARLO EN UN CUSTOM HOOK

    const {auth,logOut} = useContext(AuthContext);
    const [user, setUser] = useState(undefined);
    const Router = useRouter();

        
    
    useEffect(() => {
        (async()=>{
            const response = await getMeApi(logOut);
            if(response){
                setUser(response)
            }
        })();
        //Comprobando sesion
        if(user === undefined) return null;
        //Sacando al usuario si no esta activo
        if(!user && !auth ){
            Router.replace('/');
        } 
    }, [auth]);

    return (
        <div className="container ">
        <BasicLayout className={"container_account"}>
        <h2 className="container_account_title">Configuracion</h2>
            <div className="container_forms">
                <AccountForm user={user} logOut={logOut}/>
                <AccountEmailForm  user={user} logOut={logOut}/>
                <AccountPasswordForm user={user} logOut={logOut}/>
            </div>
            <Address/>
            
            
        </BasicLayout>
    </div>
    )
}

export default Account
