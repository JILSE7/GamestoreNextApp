//Formik & Yup
import { Formik, useFormik } from "formik";
import { useContext, useEffect, useRef, useState } from "react";
import Loader from "react-loader-spinner";
import {toast} from 'react-toastify';
import * as Yup from 'yup';
import { loginUser, resetPasswordStrapi } from "../../../api/user";
import AuthContext from "../../../context/AuthContext";
import { initialLogin } from "../../../Helpers/initialStates";
import useAuth from "../../../Hooks/useAuth";
import UseModal from "../../../Hooks/UseModal";



const LoginForm = ({login, setModal}) => {
    const auth = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const ref = useRef();
    
    const formik = useFormik({
        initialValues: initialLogin,
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async(data) => {
            
            setLoading(true);
            const resp =  await loginUser(data);
            
            if(resp?.jwt){
                toast.success("Excelente",{
                    theme: "dark",
                    progress: undefined,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    autoClose: 3000,
                });
                setModal(false);
                auth.login(resp.jwt)

                
                
            }else{
                toast.error("Error al regitrar al usuario. Username o email existentes",{
                    theme: "dark",
                    progress: undefined,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    autoClose: 3000,
                })
            }
            setLoading(false)

          
      
        },
        
    });

    const resetPassword = async() => {
            const validateEmail = Yup.string().email().required();
            if(!validateEmail.isValidSync(formik.values.identifier)){
                console.log("Email invalido");
                ref.current.value= '';
                ref.current.placeholder = "EMAIL INVALIDO"
                return;
            }
                await resetPasswordStrapi(formik.values.identifier)

    }
    return (
        <div className="Modal_Container">
            <div className="Modal_Container_Header">
                <h1>Login</h1>
            </div>
            <div className="flex justify-center sepia">
                <img src="/play1.gif"  className="Modal_Container_Gif "/>
            </div>
            <form onSubmit={formik.handleSubmit} className="Modal_Container_Form flex flex-col justify-evenly p-3" autocomplete="Ñ0kompletes">
                <label >Username {formik.errors.identifier  ? "*" :""}</label>
                <input type="text" name="identifier" placeholder="Username" ref={ref}   onChange={formik.handleChange}/>
                <label>Password  {formik.errors.password ? "*" :""}</label>
                <input type="password" name="password" placeholder="Password"  onChange={formik.handleChange} autoComplete="off"/>
                <div className="Modal_Container_Buttons flex justify-around items-center mt-3">
                        <p className="btn"  onClick={() => login()}>ir al register</p>
                        {
                            !loading ? <button className="btn"  type="submit">Iniciar</button> : <Loader type="Rings" color="#00BFFF" height={30} width={30} className="mb-1" />
                        }
                </div>
                <p className="btn text-center"  onClick={() => resetPassword()}>Olvidate tu contraseña</p>
            </form>
        </div>
    )
}

const validationSchema = () =>({
    
    identifier: Yup.string().required(true),
    password: Yup.string().required(true)
})

export default LoginForm
