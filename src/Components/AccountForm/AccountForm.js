//FORMIK & YUP
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useContext, useEffect, useState } from 'react'
import Loader from 'react-loader-spinner';
import { toast } from 'react-toastify';
import { updateNameApi } from '../../api/user';

import AuthContext from '../../context/AuthContext';
import WaitUser from '../WaitUser';
import { showCheckToast, showErrorToast } from '../../Helpers/toast';


const AccountForm = ({user, logOut}) => {
    
    if(!user) return <WaitUser/>;
    const [loading, setLoading] = useState(false);

    const {setReloadUser} = useContext(AuthContext);
    
    
    const formik = useFormik({
        initialValues: initialUpdateUser(user),
        validationSchema: Yup.object(validationSchema()),
        onSubmit : async(data) => {
            setLoading(true);
            const response = await updateNameApi(user.id, data, logOut);
            if(!response){
                toast.error("Error al actualizar el nombre y apellidos");
                return;
            }
            
            //Peticion 200
            showCheckToast(", Campos actualizados correctamente");
            setLoading(false);
            setReloadUser(true);
            
        }

    })
    

    const handleErrors =() => {
        if(formik.errors.name)showErrorToast("nombre");
        if(formik.errors.lastname)showErrorToast("apellidos");
    }

    return (
        <>
        
        <div className="container_account_form">
            <h3>Editar Datos</h3>
            <form className="container_account_form_data" onSubmit={formik.handleSubmit}>
                {
                    user ? (
                        <>
                            <label>Cambia tu nombre</label>
                            <input className="text-center" type="text" name="name"  placeholder="Nuevo nombre"  onChange={formik.handleChange} value={formik.values.name} />
                            <label>Cambia tus apellidos</label>
                            <input  className="text-center" type="text" name="lastname" placeholder="Nuevos apellidos"    onChange={formik.handleChange} value={formik.values.lastname} />
                            
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


const initialUpdateUser = (user) => { 
    return{
    name: user?.name || "",
    lastname: user?.lastname || ""
    }
}

const validationSchema = () => ({
    name: Yup.string().required(true),
    lastname: Yup.string().required(true)
});



export default AccountForm;
