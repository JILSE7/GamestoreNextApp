import { toast } from "react-toastify";

const showErrorToast = (field, msg = false) => {
    return toast.error((!msg)?`El campo ${field} no puede ir vacio`: msg,{
        theme: "dark",
        progress: undefined,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        autoClose: 3000,
    })
};


const showCheckToast = (msg ="") =>{
    return toast.success(`Excelente ${msg}`,{
        theme: "dark",
        progress: undefined,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        autoClose: 3000,
    });
};

const showCheckError = (msg ="") =>{
    return toast.error(`${msg}`,{
        theme: "dark",
        progress: undefined,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        autoClose: 3000,
    });
};


export  {
showErrorToast,
showCheckToast,
showCheckError
}
