import React from 'react'
import './LawCategories.css'
import Footer from '../../Footer/Footer'
import Gpt from '../GPT/Gpt'


function LawCategories() {
  return (

    <>
    <Gpt/>
    <div className='LawCategories'>
        
    <h1 className='law-titre'>
     اطلع الان على على مختلف 
    <span className='background-text'> النصوص القانونية</span>
</h1>
        <div className='Law_content'>
            <div className='law_item'>
                <h3>القانون</h3>
                <div ><img  className='law-icon'src="./images/echelledejustice.png"  /></div>
            </div>
            <div className='law_item'>
                <h3>الاجتهادات القضائية</h3>
                <div ><img  className='law-icon'src="./images/remarquer.png"  /></div>
            </div>
            <div className='law_item'>
                <h3>الجرائد الرسمية</h3>
                <div ><img  className='law-icon'src="./images/algremovebgpreview.png"  /></div>
            </div>
            <div className='law_item'>
                <h3>التجارة و الأعمال </h3>
                <div ><img  className='law-icon'src="./images/soutien.png"  /></div>
            </div>
            <div className='law_item'>
                <h3>الاستشارات القضائية</h3>
                <div ><img  className='law-icon'src="./images/debat.png"  /></div>
            </div>
            <div className='law_item'>
                <h3>الدستور</h3>
                <div ><img  className='law-icon'src="./images/دستورremovebgpreview.png"  /></div>
            </div>
        </div>
        </div>
        <Footer/>
    </>
  ) 
}

export default LawCategories