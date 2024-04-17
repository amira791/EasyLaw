import React from 'react'
import './Ressource.css'
import Logo from '../LOGO/Logo'
import NavBar from '../MainPage/NavBar/NavBar'
import Footer from '../Footer/Footer'
import PdfContent from '../Admin/Scraping/PdfContent'

function Ressource() {
  return (
    <>
    <Logo/>
    <NavBar/>
    <div className='ressource_container'>
        <div className='ressource-menu'>
        <p style={{fontSize:"18px"}}>المصادر الرسمية التشريعة :</p>
            <ul>
                <li>الدستور الجزائري</li>
                <li>القوانين الرسمية </li>
                <li>الاتفاقيات القانونية</li>
            </ul>
        </div>
        <h2 style={{textAlign:'right'}}>الدستور الجزائري</h2>
        <div className='pdf-content'>
            <PdfContent/>
        </div>
        <h2 style={{textAlign:'right'}}> القوانين الرسمية</h2>
        <div className='ressource-law'>
            <ul>
                <li>القانون المدني </li>
                <li> قانون العقوبات </li>
                <li> قانون العقوبات</li>
                <li>قانون العقوبات</li>
            </ul>
        </div>
        <h2 style={{textAlign:'right'}}> الاتفاقيات القانونية</h2>
        

    </div>
    
    <Footer/>
    </>
  )
}

export default Ressource