import React from 'react';

import {Elements } from '@stripe/react-stripe-js';

import { STRIPE_TOPKEN } from '../../utils/constants';
import { loadStripe } from '@stripe/stripe-js';
import FormPayment from '../FormPayment';


const stripePromise = loadStripe(STRIPE_TOPKEN);

const Payment = ({products, address}) => {
  return (
    <div className='mt-5 w-full'>
        
        
        <div className="Modal_Container_Header"><h1>Payment</h1></div>
        <Elements className="z-50" stripe={stripePromise}>
            <FormPayment products={products} address={address} />
        </Elements>
        
        
    </div>
  )
}

export default Payment