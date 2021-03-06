import React, { useContext, useState } from 'react';

import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js'
import { STRIPE_TOPKEN } from '../../utils/constants';

import {FaAmazonPay} from 'react-icons/fa'
import { toast } from 'react-toastify';
import { showCheckError, showCheckToast } from '../../Helpers/toast';
import { cleanCart, paymentCartApi } from '../../api/cart';
import AuthContext from '../../context/AuthContext';
import { useRouter } from 'next/router';


const FormPayment = ({products, address}) => {

    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const {auth, logOut} = useContext(AuthContext);



    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        if(!address.title)return showCheckError("Porfavor ingrese una dirección")

        if(!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);

        const result = await stripe.createToken(cardElement);

        if(result.error) return showCheckError("Error al realizar el pago");

        const respose = await paymentCartApi(result.token, products,auth.idUser,address, logOut);
        if(respose.length > 0){
            showCheckToast("Transaccion realizada correctamente");  
            cleanCart();
            setTimeout(() => {
                router.push('/orders');
            }, 500);
        }else{
            showCheckError("Hubo un error");
        }

    }
    


  return (

      <div className='w-full   flex justify-center'>

                    <form onSubmit={handleSubmit} className="Modal_Container_Form w-4/5 flex flex-col  justify-evenly payment p-5" autocomplete="Ñ0kompletes">
                    <CardElement options={{style:{base:{color:"white"}}}}/>

                        <button type='submit' className='z-50' disabled={!stripe}>
                            <FaAmazonPay className='pay' />
                        </button>
                    
                    
                </form>

      </div>
  )
}





export default FormPayment