import React, { useState } from 'react'
import "./Payment.css"
import Footer from '../Footer/Footer';
import Logo from '../LOGO/Logo';
import { Link } from 'react-router-dom';
import TitleBar from '../TitleBar/TitleBar';

function Payment() {

    const [formData, setFormData] = useState({
        NumCart: '',
          username: '',
          NumCVC: '',
          DateExp: ''
      });
    
      
      
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
          ...prevData,
          [name]: value
        }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
          console.log(formData);
        // Reset form 
        setFormData({
          NumCart: '',
          username: '',
          NumCVC: '',
          DateExp: ''
        });
        
    }    
  return (
    <>
     <Logo/>
     <TitleBar title="صفحة الدفع" />
    <div className='payment-form'>
    <form onSubmit={handleSubmit} className='payment_sub'>
    <div className='payment-section1'>
      <div className='payment-group-col'>
        <label htmlFor="modeP"> : طريقة الدفع </label>
       hhh
      </div>
      <div className='payment-group-col'>
        <label htmlFor="Ncart"> : رقم البطاقة </label>
        <input
            type="text"
            id="NumCart"
            name="NumCart"
            className='payment_item_col'
            value={formData.NumCart}
            onChange={handleChange}
            placeholder='رقم البطاقة'
            required
         />
      </div>
      <div className='payment-group-col'>
        <label htmlFor="username"> :اسم صاحب البطاقة </label>
        <input
            type="text"
            id="username"
            name="username"
            className='payment_item_col'
            value={formData.username}
            onChange={handleChange}
            placeholder='اسم صاحب البطاقة '
            required
         />
      </div>  
</div>        
    <div className='payment-section2'>
      <div className='payment-group'>
         <label htmlFor="NumCVC">: CVCرقم </label>
         <input
         className='payment_item'
            type="text"
            id="NumCVC"
            name="NumCVC"
            value={formData.NumCVC}
            onChange={handleChange}
            placeholder='CVC رقم '
            required
          />
      </div>
      <div className='payment-group'>
         <label htmlFor="DateExp">:تاريخ انتهاء الصلاحية </label>
         <input
         className='payment_item'
            type="text"
            id="DateExp"
            name="DateExp"
            value={formData.DateExp}
            onChange={handleChange}
            placeholder='تاريخ انتهاء الصلاحية '
            required
        />
       </div>
    </div>
   
    <div className='payment-button-container'>
         <button type="submit" className="payment-button"> دفع</button>
    </div>
       
      </form>
    </div>
    <Footer/>
    </>
   
  )
}

export default Payment