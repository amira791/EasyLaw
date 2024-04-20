import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

import { AuthContext } from '../Context/LogoProvider';
import { CardNumberElement } from '@stripe/react-stripe-js';


export default function usePayment() {
    
    axios.defaults.headers.common['Authorization'] = "token "+  localStorage.getItem('access_token');

    const getSubscriptions = async () =>{
        try {
        const response = await axios.get('http://localhost:8000/payment/service');
        const data = response.data.all.map(offer=> ({
        
              id: offer.id,
              priceId : offer.priceId,
              title: offer.nom,
              price:  `${offer.tarif}دج/شهر`,
              features: offer.accesses.map(access=>({
                  nom:access.nom
              }))
            }))
            return ({offers: data, curent: response.data.current})
  
        } catch (error) {
          console.error('Une erreur s\'est produite lors de la recuperation des offres :', error);
          return (error)
        }
      }


      const generateStripeToeken = async (stripe, elements, type, holderName) =>
    {
        if (!stripe || ! elements)
        {
          console.log("stripe or elements weren's set properly");
          return
        }

        

        const cardNumberElement = elements.getElement(CardNumberElement)
        
        const {token, error} =  type!= 2 ? await stripe.createToken(cardNumberElement,
            {
              name : holderName
            }): {token:{id: "tok_unionpay"}, error: null}
            
           
        
        if (!token || error)
        {
          throw error || "token creation failed"
        }
        return token
    }


    const subscribe = async (priceId, token, paymentMethod) => {
        let success = false;
        let error = null;
        try {
            const response = await axios.post("http://localhost:8000/payment/subscribe", { priceId, token, paymentMethod });
            console.log("Payment successful: " + response.data.id);
            success = true;
        } catch (err) {
            error = err.response?.data?.message || err.message;
        }
        return { success, error };
    };


  return {
    getSubscriptions,
    generateStripeToeken,
    subscribe
  };
}
