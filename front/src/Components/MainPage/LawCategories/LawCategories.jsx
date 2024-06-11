import React, { useState } from 'react';
import './LawCategories.css'
import Footer from '../../Footer/Footer'
import Gpt from '../../Search/GPT/Gpt'
import Logo from '../../LOGO/Logo'
import NavBar from '../NavBar/NavBar'
import { Link } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close';



function LawCategories() {

    const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleItemClick = () => {
    setIsPopupVisible(true);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };
  return (

    <>
     <Logo />
    <NavBar/>
    <Gpt/>
    <div className='LawCategories'>
        
    <h1 className='law-titre'>
     اطلع الان على على مختلف 
    <span className='background-text'> النصوص القانونية</span>
</h1>
        <div className='Law_content'>
           <div className='law_item' onClick={handleItemClick}>
           
                <div ><img  className='law-icon'src="./images/soutien.png"  /></div>
                <h3>التجارة و الأعمال </h3>
            </div>
            <div className='law_item' onClick={handleItemClick}>
           
                <div ><img  className='law-icon'src="./images/debat.png"  /></div>
                <h3>الاستشارات القضائية</h3>
            </div>
            
            <div className='law_item'>
    <a href='https://www.joradp.dz/TRV/AConsti.pdf' target='_blank' rel='noopener noreferrer'>
        <img className='icon-free' src="./images/Star.png" alt="icon" />
        <span className='icon-free-span'>مجانا</span>
        <div>
            <img className='law-icon' src="./images/دستورremovebgpreview.png" alt="law icon" />
        </div>
        <h3>الدستور الجزائري</h3>
    </a>
</div>

            <div className='law_item' onClick={handleItemClick}>
            <div ><img  className='law-icon'src="./images/echelledejustice.png"  /></div>
                <h3>الاجتهادات القضائية</h3>
            </div>
           
            <div className='law_item'>
            <Link to='/law'>
            <div ><img  className='law-icon'src="./images/remarquer.png"  /></div>
                <h3>القوانين  </h3>
                </Link>
            </div>
           
            <div className='law_item'>
            <Link to="/jaraid">
            <img  className=' icon-free'src="./images/Star.png"/>
            <span className='icon-free-span'>مجانا</span>
           <div ><img  className='law-icon'src="./images/algremovebgpreview.png"  /></div>
           <h3>الجرائد الرسمية</h3>
           </Link>
       </div>  
        </div>
        {isPopupVisible && (
          <div className='popup'>
            <div className='popup-content'>
                <CloseIcon onClick={closePopup} className='close'/>
          
              <p>المحتوى غير متوفر حاليا</p>
            </div>
          </div>
        )}
        </div>
        <Footer/>
    </>
  ) 
}

export default LawCategories