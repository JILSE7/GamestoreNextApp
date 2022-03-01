//FORMIK & YUP
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useContext, useEffect, useState } from 'react'
import Loader from 'react-loader-spinner';
import { toast } from 'react-toastify';
import { updateNameApi, updatePassword } from '../../../api/user';

import AuthContext from '../../../context/AuthContext';
import WaitUser from '../../WaitUser';
import { showCheckToast, showErrorToast } from '../../../Helpers/toast';


const AccountPasswordForm = ({user, logOut}) => {
    
    if(!user) return <WaitUser/>;
    const [loading, setLoading] = useState(false);

    const {setReloadUser} = useContext(AuthContext);
    
    
    const formik = useFormik({
        initialValues: initialUpdatePassword(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit : async(data) => {
            setLoading(true);
            const response = await updatePassword(user.id, data, logOut);
            if(!response){
                toast.error("Error al la contraseña");
                return;
            }
            
            //Peticion 200
            showCheckToast("Contraseña actualizada correctamente");
            setLoading(false);
            setReloadUser(true);

            
        }

    })
    

    const handleErrors =() => {
        console.log(formik.errors);
        if(formik.errors.password)showErrorToast("contraseña");
        if(formik.errors.confirm)showErrorToast("confirmar contraseña");
    }

    return (
        <>
        <div className="container_account_form">
            <h3>Cambiar contraseña</h3>
            <form className="container_account_form_data" onSubmit={formik.handleSubmit}>
                {
                    user ? (
                        <>
                            <label>Nueva Contraseña</label>
                            <input className="text-center" type="password" name="password"  placeholder="Nuevo contraseña"  onChange={formik.handleChange} value={formik.values.name} />
                            <label>Confirma Contraseña</label>
                            <input  className="text-center" type="password" name="confirm" placeholder="Confirmar contraseña"    onChange={formik.handleChange} value={formik.values.lastname} />
                            
                            {
                                loading ? 
                                (
                                    <>
                                        <Loader type="BallTriangle" color="#00BFFF" height={30} width={30} className="mb-1" />
                                        <p className="text-center">Espere porfavor</p>
                                    </>
                                )
                                :
                                (<button className="btn"  type="submit" onClick={handleErrors}>Cambiar datos</button>)

                            }

                        </>        
                    ) : (
                        <>
                            <p className="text-center">Esperando Servidor</p>
                            <Loader type="BallTriangle" color="#00BFFF" height={30} width={30} className="mb-1" />
                        </>
                    )
                }

            </form>
        </div>
        </>
    )
}


const initialUpdatePassword = () => { 
    return{
    password: "",
    confirm:  ""
    }
}

const validationSchema = () => ({
    password: Yup.string().required(true).oneOf([Yup.ref("confirm")],true),
    confirm: Yup.string().required(true).oneOf([Yup.ref("password")],true)
});



export default AccountPasswordForm;
