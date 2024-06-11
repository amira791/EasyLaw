import { CardNumberElement } from '@stripe/react-stripe-js';

import  { payementApiClient } from '../API';
import axios from 'axios';

export default function usePayment() {
    
    const token = localStorage.getItem('access_token')
    var headers = {}
      if(token)
         headers= {
          'Authorization': `Token ${localStorage.getItem('access_token')}`
        }

    const getSubscriptions = async () =>{
        try {
        const response = await payementApiClient.get('/service', {headers});
        const sorted = response.data.all
        sorted.sort((a,b)=> b.tarif - a.tarif)
        const data = sorted.map(offer=> ({
        
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
          console.error('Une erreur s\'est produite lors de la recuperation des offres :', error.message);
          return (error)
        }
      }
   
   
      const getCurrentSubscription = async () =>{
        try {
        const response = await payementApiClient.get('/subscribtion', {headers});
            return (response.data)
  
        } catch (error) {
          console.error('Une erreur s\'est produite lors de la recuperation des offres :', error.message);
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
            const response = await payementApiClient.post("/subscribe", { priceId, token, paymentMethod }, {headers});
            console.log("Payment successful: " + response.data.id);
            success = response.data;
        } catch (err) {
            error = err.response?.data?.message || err.message;
        }
        
        return { success, error };
    }


     // Fonction pour récupérer les factures de l'utilisateur
     const getUserInvoices = async () => {
      try {
          const response = await payementApiClient.get('/invoice', {headers});
          const data = response.data
          data.reverse()
          return data;
      } catch (error) {
        console.error('Erreur lors de la récupération des factures :', error);
        return { invoices: null, hasInvoices: false };
      }
    };


    const getAllAccesses = async () => {
      try {
          const response = await payementApiClient.get('/access');
          const data = response.data
          return data;
      } catch (error) {
        console.error('Erreur lors de la récupération des permitions :', error);
        return { message : "un erreur est survenu"};
      }
    };


    const addSub = async (name, price, accesses) => {
      let success = false;
      let error = null;
      try {
          const response = await payementApiClient.post("/addService", { name, price, accesses }, {headers});
          console.log("Added Successfully: " + response.data.id);
          success = response.data;
      } catch (err) {
          error = err.response?.data?.message || err.message;
      }
      
      return { success, error };
  }


  const changePrice = async (id, priceId, price) => {
    let success = false;
    let error = null;
    try {
        const response = await payementApiClient.put("/price", { id, priceId, price }, {headers});
        console.log("Changed Successfully");
        success = response.data;
    } catch (err) {
        error = err.response?.data?.message || err.message;
    }
    
    return { success, error };
}

  const convert = async (from, to, amount) => {
    let success = false;
    let error = null;
    try {
      const response = await axios.get(`https://currency-conversion-and-exchange-rates.p.rapidapi.com/convert?from=${from}&to=${to}&amount=${amount}`, {
        headers: {
          'x-rapidapi-ua': 'RapidAPI-Playground',
          'x-rapidapi-key': '9ce01b3ca3msh3a6bcbd1aba2100p1bc6b4jsnd0db9da2985e',
          'x-rapidapi-host': 'currency-conversion-and-exchange-rates.p.rapidapi.com',
        }
      })
      console.log("converted Successfully. rate = "+ response.data.info.rate);
      success = response.data;
    } catch (err) {
        error = err.response?.data?.message || err.message;
    }
    
    return { success, error };
  }


  const convertionSymbols = async () => {
    let success = false;
    let error = null;
    try {
      const response = await axios.get(`https://currency-conversion-and-exchange-rates.p.rapidapi.com/symbols`, {
        headers: {
          'x-rapidapi-ua': 'RapidAPI-Playground',
          'x-rapidapi-key': '9ce01b3ca3msh3a6bcbd1aba2100p1bc6b4jsnd0db9da2985e',
          'x-rapidapi-host': 'currency-conversion-and-exchange-rates.p.rapidapi.com',
        }
      })
      success = Object.keys(response.data.symbols);
    } catch (err) {
        error = err.response?.data?.message || err.message;
    }
    
    return { success, error };
  }




  return {
    getSubscriptions,
    generateStripeToeken,
    subscribe,
    getUserInvoices,
    getCurrentSubscription,
    getAllAccesses,
    addSub,
    changePrice,
    convert,
    convertionSymbols
  };
}
