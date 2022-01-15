//FORMIK & YUP
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useContext, useEffect, useState } from 'react'
import Loader from 'react-loader-spinner';
import { toast } from 'react-toastify';
import { updateEmailApi, updateNameApi } from '../../api/user';

import AuthContext from '../../context/AuthContext';
import WaitUser from '../WaitUser';
import { showCheckToast, showErrorToast } from '../../Helpers/toast';


const AccountEmailForm = ({user, logOut}) => {
    console.log(user);
     
    if(!user) return <WaitUser/>;
    const [loading, setLoading] = useState(false);

    const {setReloadUser} = useContext(AuthContext);
    
    
    const formik = useFormik({
        initialValues: initialUpdateEmail(user),
        validationSchema: Yup.object(validationSchema()),
        onSubmit : async(data) => {
            console.log(data);
            setLoading(true);
            const response = await updateEmailApi(user.id, data, logOut);
            console.log(response);
            if(!response || response.statusCode === 400){
                showErrorToast("email", "Error al actualizar el email");
                if(response.data[0]?.messages[0].message)showErrorToast('email',response.data[0].messages[0].message);
                setLoading(false);
                return;
            }
            
            //Peticion 200
            showCheckToast(", Campos actualizados correctamente");
            setLoading(false);
            setReloadUser(true);
            
        }

    })
    const handleErrors =() => {
        if(formik.errors.email || formik.errors.repeatEmail )showErrorToast("email", "Los correos no concuerdan entre si, porfavor verifiquelos");
        
        
    }
    return (
        <>
        <div className="container_account_form">
            <h3>Editar - Email</h3>
            {/* <h3 className="underline">{user.email}</h3> */}
            <form className="container_account_form_data" onSubmit={formik.handleSubmit}>
                {
                    user ? (
                        <>
                            <label>Cambia tu Email</label>
                            <input className="text-center" type="text" name="email"  placeholder={"Email Actual: " +user.email}  onChange={formik.handleChange} value={formik.values.email} />
                            <label>Confirma tu email</label>
                            <input  className="text-center" type="text" name="repeatEmail" placeholder="Nuevos apellidos"    onChange={formik.handleChange} value={formik.values.repeatEmail} />
                            
                            {
                                loading ? 
                                (
                                    <>
                                        <Loader type="BallTriangle" color="#00BFFF" height={30} width={30} className="mb-1" />
                                        <p className="text-center">Espere porfavor</p>
                                    </>
                                )
                                :
                                (<button className="btn"  type="submit" onClick={handleErrors}>Cambiar Email</button>)

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
};

const initialUpdateEmail = (user) => { 
    return{
    email: "",
    repeatEmail:  ""
    }
};

const validationSchema = () => ({
    email: Yup.string().required(true).oneOf([Yup.ref("repeatEmail")],true),
    repeatEmail: Yup.string().required(true).oneOf([Yup.ref("email")],true)
});



export default AccountEmailForm;
