import React, { useState,useContext } from 'react'
import "./Payment.css"
import { Navigate, useParams,useNavigate, useLocation } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Logo from '../LOGO/Logo';
import { Link } from 'react-router-dom';
import TitleBar from '../TitleBar/TitleBar';
import { CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import ShoppingCart from '@mui/icons-material/ShoppingCart';

import { AuthContext } from '../../Context/LogoProvider';
import usePayment from '../../Hooks/usePayment';

function Payment(props) {

  const stripe = useStripe()
  const elements = useElements()

  const [errors, setErrors] = useState({});
  const [activeButton, setActiveButton] = useState(0);
  const methods = {0:"Dhahabia", 1:"CIB", 2:"BaridiMOB"};
  const [holderName, setHolderName] = useState("")
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")

  const [isLoading,setIsLoading] = useState(false)
console.log(stripe);
 
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  const { id } = useParams();

  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const name = params.get('name');
  const price = params.get('price');
  
  const {generateStripeToeken, subscribe} = usePayment()    

    



    
      const handleSubmit = async (e) => {
       
        e.preventDefault();
        
        setIsLoading(true)

        const errors = {}

        try{
          const token = await generateStripeToeken(stripe, elements, activeButton, holderName)


          const {success , error} = await subscribe(id, token, methods[activeButton])
          if(success) 
            setPaymentSuccess(true)
          else
            errors["general"] = error
         }
        catch (error)
        {
          console.error(error)
          const map = {
            number : "NumCart",
            expiry : "DateExp",
            cvc :"NumCVC",
          }

          for (let key in map)
          {
            if(error.code?.includes(key))
            {
              errors[map[key]] = error.message
            }
            else {
              errors["general"] = error.message
            }
          }
          
        } finally {
          setErrors(errors)
          console.log(errors);
          setIsLoading(false)
        }

        
        
    }    


    

  


  return (


    <>
     <Logo/>
     <TitleBar title="صفحة الدفع" />
    <div className='payment-form'>

    {paymentSuccess?

    <section className='successful-payment'>
      <h2>  تم إتمام معاملة الدفع بنجاح <i style={{color:"var(--primary-color)"}}>&#10003;</i></h2>

      <Link to={`/subscrib`} className='payment-button'>
        مغادرة
      </Link>
    </section>

    :

    <form onSubmit={handleSubmit} className='payment_sub'>
    <div className='payment-section1'>
    <div className='mini-invoice'>
      <div>
        <span>{name}</span> <br/>
       <span>{price}</span>
      </div>
      <ShoppingCart sx={{ width: '2em', height: '2em', color: 'var(--primary-color)'}}/>
    </div>
      <div className='payment-group-col'>
        <label htmlFor="modeP"> : طريقة الدفع </label>
       <div className='paiement-mode'>
       <button className={`paiement-mode-item ${activeButton === 2 ? 'active' : ''}`} onClick={(e)=>{ e.preventDefault(); setActiveButton(2)}} > 
       <img src='../images/baridimob.png'/>
       <h3>BaridiMOB</h3>
       </button>
       <button className={`paiement-mode-item ${activeButton === 1 ? 'active' : ''}`} onClick={(e)=>{ e.preventDefault(); setActiveButton(1)}} > 
       <img src='../images/cib.png'/>
       <h3>CIB</h3>
       </button>
       <button className={`paiement-mode-item ${activeButton === 0 ? 'active' : ''}`} onClick={(e)=>{ e.preventDefault(); setActiveButton(0)}} > 
       <img src='../images/dahabia.png'/>
       <h3>Dahabia</h3>
       </button>
      
       </div>
      </div>
      {errors.general && <span className='error-message'>{errors.general}</span>}

      {activeButton != 2 ? 
      <>
      <div className='payment-group-col'>
        <label htmlFor="Ncart"> : رقم البطاقة </label>
        
        <CardNumberElement
            id="NumCart"
            name="NumCart"
            className={`payment_item_col ${errors.NumCart ? 'error' : ''}`}
            placeholder='رقم البطاقة'
          />

          {errors.NumCart && <span className='error-message'>{errors.NumCart}</span>}
          
      </div>
      <div className='payment-group-col'>
        <label htmlFor="holderName"> :اسم صاحب البطاقة </label>
        <input
            type= "text"
            id="holderName"
            name="holdername"
            className='payment_item_col'
            value={holderName}
            onChange={e => setHolderName(e.target.value)}
            placeholder='اسم صاحب البطاقة '
            required
         />
      </div>  
      </>
      
      :
        <>
        <div className='payment-group-col'>
        <label htmlFor="userName"> : البريد الالكتروني </label>
        
          <input
              type= "text"
              id="userName"
              name="userName"
              className='payment_item_col'
              value={userName}
              onChange={e => setUserName(e.target.value)}
              placeholder='البريد الالكتروني'
              required
          />

          {errors.NumCart && <span className='error-message'>{errors.NumCart}</span>}
          
        </div>
        <div className='payment-group-col'>
          <label htmlFor="password"> :كلمة السر </label>
          <input
              type= "password"
              id="password"
              name="password"
              className='payment_item_col'
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder='كلمة السر '
              required
          />
        </div>  
        </>
      }
     </div>     





    {activeButton == 2 ||  
    <div className='payment-section2'>
      <div className='payment-group'>
         <label htmlFor="NumCVC">: CVC2/CVV2 رقم </label>
         <CardCvcElement
          className={`payment_item ${errors.NumCVC ? 'error' : ''}`}
            id="NumCVC"
            name="NumCVC"
            
          />
           {errors.NumCVC && <span className='error-message'>{errors.NumCVC}</span>}
      </div>
      <div className='payment-group'>
         <label htmlFor="DateExp">:تاريخ انتهاء الصلاحية </label>
         <CardExpiryElement 
            className={`payment_item ${errors.DateExp ? 'error' : ''}`}
            id="DateExp"
            name="DateExp"   
         />
         {errors.DateExp && <span className='error-message'>{errors.DateExp}</span>}
       </div>
    </div>}
   
    <div className='payment-button-container'>
         <button type="submit" className="payment-button">  دفع {isLoading && <i className='loading'></i>}</button> 
          
    </div>
      </form>}
    </div>
    <Footer/>
    </>
   

  )
}

export default Payment