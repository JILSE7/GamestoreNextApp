//Formik & Yup
import { Formik, useFormik } from "formik";
import { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import {toast} from 'react-toastify';
import * as Yup from 'yup';


import { registerApi } from "../../../api/user";


import { initialRegister } from "../../../Helpers/initialStates";

const RegisterForm = ({login}) => {

    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: initialRegister,
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async(data) => {
        
            setLoading(true);
            const resp =  await registerApi(data);
            setTimeout(() => setLoading(false), 800);
            console.log(resp);
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
                
                //Ir al login
                login();
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

        },
        
    })

  

    return (
        <div className="Modal_Container">
            <div className="Modal_Container_Header">
                <h1>Register</h1>
            </div>
            <form onSubmit={formik.handleSubmit} className="Modal_Container_Form flex flex-col justify-evenly" autocomplete="Ñ0kompletes">
                <label >Nombre {formik.errors.name ? "*" :""}</label>
                <input type="text" name="name" placeholder="Escribe tu nombre"   onChange={formik.handleChange}/>
                <label>Apellidos {formik.errors.lastname ? "*" :""}</label>
                <input type="text" name="lastname" placeholder="Escribe tus apellidos"  onChange={formik.handleChange}/>
                <label>Username  {formik.errors.username ? "*" :""}</label>
                <input type="text" name="username" placeholder="Escribe tu nombre de usuario"  autocomplete="disabled"  onChange={formik.handleChange}/>
                <label>Email  {formik.errors.email ? "*" :""}</label>
                <input type="email" name="email" placeholder="Escribe tu email"  onChange={formik.handleChange}/>
                <label>Password  {formik.errors.password ? "*" :""}</label>
                <input type="password" name="password" placeholder="Escribe tu contraseña"  onChange={formik.handleChange} autoComplete="off"/>
                <div className="Modal_Container_Buttons flex justify-around items-center mt-3">
                        <p className="btn"  onClick={() => login()}>ir al login</p>
                        {
                            !loading ? <button className="btn"  type="submit">Registrar</button> : <Loader type="Rings" color="#00BFFF" height={30} width={30} className="mb-1" />
                        }
                </div>
            </form>
  
        </div>
    )
};


const validationSchema = () =>({
    name: Yup.string().required(true),
    lastname: Yup.string().required(true),
    username: Yup.string().required(true),
    email: Yup.string().email(true).required(true),
    password: Yup.string().required(true)
})




export default RegisterForm
