import React from 'react'
import './LawCategories.css'
import Footer from '../../Footer/Footer'
import Gpt from '../../Search/GPT/Gpt'
import Logo from '../../LOGO/Logo'
import NavBar from '../NavBar/NavBar'



function LawCategories() {
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
           <div className='law_item'>
           
                <div ><img  className='law-icon'src="./images/soutien.png"  /></div>
                <h3>التجارة و الأعمال </h3>
            </div>
            <div className='law_item'>
           
                <div ><img  className='law-icon'src="./images/debat.png"  /></div>
                <h3>الاستشارات القضائية</h3>
            </div>
            
            <div className='law_item'>
            <img  className=' icon-free'src="./images/Star.png"/>
            <span className='icon-free-span'>مجانا</span>
                <div ><img  className='law-icon'src="./images/دستورremovebgpreview.png"  /></div>
                <h3>الدستور الجزائري  </h3>
            </div>
            <div className='law_item'>
            <div ><img  className='law-icon'src="./images/echelledejustice.png"  /></div>
                <h3>الاجتهادات القضائية</h3>
            </div>
           
            <div className='law_item'>
            <div ><img  className='law-icon'src="./images/remarquer.png"  /></div>
                <h3>القوانين  </h3>
            </div>
            <div className='law_item'>
            <img  className=' icon-free'src="./images/Star.png"/>
            <span className='icon-free-span'>مجانا</span>
           <div ><img  className='law-icon'src="./images/algremovebgpreview.png"  /></div>
           <h3>الجرائد الرسمية</h3>
       </div>
            
           
            
        </div>
        </div>
        <Footer/>
    </>
  ) 
}

export default LawCategories