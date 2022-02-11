import { useFormik } from "formik";
import { useState } from "react";
import Loader from "react-loader-spinner";
import * as Yup from 'yup';
import { createAddress } from "../../../api/address";
import { initialAddress } from "../../../Helpers/initialStates";
import { showCheckError, showCheckToast, showErrorToast } from "../../../Helpers/toast";

//FORMIK


const AddresForm = ({user, logOut, setModal, setReload}) => {
    
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: initialAddress,
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async(data) => {
            setLoading(true);

        
            data.users_permissions_user = user.id
            const resp =  await createAddress(data, logOut);
            
            
            if(resp?.published_at){
                setLoading(false)
                setModal(false);               
                setReload(true);
                showCheckToast("Bien, Direccion agregada correctamente");
            }else{
                showCheckError("Error al registrar la dirección");
            }

        },
        
    });

    const handleErrors =() => {
        const {title, name, state, city, phone, number, address, postalCode} = formik.errors
        if(title || name || state || city || phone || number || address || postalCode )showErrorToast("", "La informacion contiene errores");   
    }

  return (
        <div className="Modal_Container">
            <div className="Modal_Container_Header">
                <h1>Direccion</h1>
            </div>
            <form className="Modal_Container_Form flex flex-col justify-evenly p-1" autocomplete="Ñ0kompletes" onSubmit={formik.handleSubmit}>
                <label>Titulo de la dirección</label>
                <input name='title' type="text" onChange={formik.handleChange} placeholder='Titulo Dirección' value={formik.values.title} />

                <label>Nombre y Apellidos</label>
                <input name='name' type="text" onChange={formik.handleChange} placeholder='Dirección' value={formik.values.name} />

                <label>Dirección</label>
                <input name='address' type="text" onChange={formik.handleChange} placeholder='Titulo Dirección' value={formik.values.address} />

                <label>Ciudad</label>
                <input name='city' type="text" onChange={formik.handleChange} placeholder='Titulo Dirección' value={formik.values.city} />

                <label>Estado/Provincea/Región</label>
                <input name='state' type="text" onChange={formik.handleChange} placeholder='Titulo Dirección' value={formik.values.state} />

                <label>Codigó Postal</label>
                <input name='postalCode' type="number" onChange={formik.handleChange} placeholder='Titulo Dirección' value={formik.values.postalCode} />

                <label>Telefono</label>
                <input name='phone' type="number" onChange={formik.handleChange} placeholder='telefono'value={formik.values.phone} />

                <div className="Modal_Container_Buttons flex justify-around items-center mt-3">
                        
                        {
                            !loading ? <button className="btn" onClick={handleErrors} type="submit">Agregar Direccion</button> : <Loader type="Puff" color="#00BFFF" height={30} width={30} className="mb-1" />
                        }
                </div>
            </form>
        </div>
  );
};


const validationSchema = () => ({
    title: Yup.string().required(true),
    name: Yup.string().required(true),
    city: Yup.string().required(true),
    state: Yup.string().required(true),
    postalCode: Yup.number().required(true),
    phone: Yup.number().required(true),

});



export default AddresForm;
