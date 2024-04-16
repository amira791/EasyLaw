import React, { useState,useContext } from 'react'
import "./Payment.css"
import { Navigate, useParams,useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Logo from '../LOGO/Logo';
import { Link } from 'react-router-dom';
import TitleBar from '../TitleBar/TitleBar';
import { AuthContext } from '../../Context/LogoProvider';

function Payment() {
  const [activeButton, setActiveButton] = useState(0);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  
   const { hasSubscription, setHasSubscription } = useContext(AuthContext);
  
    const [formData, setFormData] = useState({
        NumCart: '',
          username: '',
          NumCVC: '',
          DateExp: ''
      });
    
      //const [hasSubscription, setHasSubscription] = useState(false);
    const handleButtonClick = (index) => {
      setActiveButton(index); 
      // Mettre à jour le mode de paiement sélectionné en fonction de l'index
      switch(index) {
        case 0:
          setFormData(prevData => ({ ...prevData, modePaiement: 'Dahabia' }));
          break;
        case 1:
          setFormData(prevData => ({ ...prevData, modePaiement: 'BaridiMOB' }));
          break;
        case 2:
          setFormData(prevData => ({ ...prevData, modePaiement: 'CIB' }));
          break;
        default:
          setFormData(prevData => ({ ...prevData, modePaiement: '' }));
      }
    };
      
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
          ...prevData,
          [name]: value
        }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // Validation des champs
    const errors = {};
    if (!formData.NumCart || formData.NumCart.length !== 16) {
      errors.NumCart = 'Le numéro de carte doit comporter 16 chiffres';
    }
    if (!formData.NumCVC || formData.NumCVC.length !== 3) {
      errors.NumCVC = 'Le CVC doit comporter 3 chiffres';
    }
    if (!formData.DateExp || formData.DateExp.length !== 5 || !isValidDate(formData.DateExp)) {
      errors.DateExp = 'Format de date invalide (MM/YY)';
    }
    
   

    /*if (Object.keys(errors).length === 0) {
      // Envoi des données au serveur si aucune erreur de validation
      axios.post('http://localhost:8000/payment', formData)
        .then(response => {
          console.log('Réponse de l\'API:', response.data);
          setPaymentSuccess(true); // Met à jour l'état pour afficher le message de succès
        })
        .catch(error => {
          console.error('Erreur lors de la soumission du formulaire:', error);
          // Gérer les erreurs
        });*/
          console.log(formData);
          setPaymentSuccess(true);
          setHasSubscription(true);
          console.log(hasSubscription);
        // Reset form 
        setFormData({
          NumCart: '',
          username: '',
          NumCVC: '',
          DateExp: '',
          modePaiement: ''
        });
      //}else{
        setErrors(errors);
      //}
      const isValidDate = (date) => {
        const [month, year] = date.split('/');
        const currentYear = new Date().getFullYear() % 100; // Récupère les deux derniers chiffres de l'année actuelle
        return (
          /^\d{2}$/.test(month) &&
          /^\d{2}$/.test(year) &&
          parseInt(month) >= 1 && parseInt(month) <= 12 &&
          parseInt(year) >= currentYear
        );
      };  
        
    }    
  return (
    <>
     <Logo/>
     <TitleBar title="صفحة الدفع" />
    <div className='payment-form'>
    
    <form onSubmit={handleSubmit} className='payment_sub'>
    {paymentSuccess &&  <p>Le paiement a été effectué avec succès !</p>}
    <div className='payment-section1'>
    <h2>Details de l'abonnement sélectionné: {id}</h2>
      <div className='payment-group-col'>
        <label htmlFor="modeP"> : طريقة الدفع </label>
       <div className='paiement-mode'>
       <div className={`paiement-mode-item ${activeButton === 2 ? 'active' : ''}`} onClick={() => handleButtonClick(2)}> 
       <img src='../images/cib.png'/>
       <h3>CIB</h3>
       </div>
       <div className={`paiement-mode-item ${activeButton === 1 ? 'active' : ''}`} onClick={() => handleButtonClick(1)}> 
       <img src='../images/baridimob.png'/>
       <h3>BaridiMOB</h3>
       </div>
       <div className={`paiement-mode-item ${activeButton === 0 ? 'active' : ''}`} onClick={() => handleButtonClick(0)}> 
       <img src='../images/dahabia.png'/>
       <h3>Dahabia</h3>
       </div>

       </div>
      </div>
      <div className='payment-group-col'>
        <label htmlFor="Ncart"> : رقم البطاقة </label>
        <input
            type="text"
            id="NumCart"
            name="NumCart"
            className={`payment_item_col ${errors.NumCart ? 'error' : ''}`}
            value={formData.NumCart}
            onChange={handleChange}
            placeholder='رقم البطاقة'
            required
         />
          {errors.NumCart && <span className='error-message'>{errors.NumCart}</span>}
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
          className={`payment_item ${errors.NumCVC ? 'error' : ''}`}
            type="text"
            id="NumCVC"
            name="NumCVC"
            value={formData.NumCVC}
            onChange={handleChange}
            placeholder='CVC رقم '
            required
          />
           {errors.NumCVC && <span className='error-message'>{errors.NumCVC}</span>}
      </div>
      <div className='payment-group'>
         <label htmlFor="DateExp">:تاريخ انتهاء الصلاحية </label>
         <input
                className={`payment_item ${errors.DateExp ? 'error' : ''}`}
                type="text"
                id="DateExp"
                name="DateExp"
                value={formData.DateExp}
                onChange={handleChange}
                placeholder='MM/YY'
                maxLength="4"
                required
              />
         {errors.DateExp && <span className='error-message'>{errors.DateExp}</span>}
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