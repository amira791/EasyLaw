import React from 'react'
import './AboutUs.css'
import Logo from '../LOGO/Logo'
import Footer from '../Footer/Footer'
import NavBar from '../MainPage/NavBar/NavBar'

function AboutUs() {
  return (
    <>
    <Logo/>
    <NavBar/>
    <div className='aboutus_content'>
        <div className='aboutus_arab'>
            <p>"نحن نهدف إلى تقديم محتوى قانوني شامل وموثوق به لزوارنا. في موقعنا
                ، نسعى لتوفير معلومات دقيقة وشاملة حول مختلف المواضيع القانونية
                 التي قد تهم الأفراد والشركات على حد سواء. فريقنا مكون من متخصصين
                 في مجال القانون الذين يعملون بجد لضمان جودة المحتوى وصحة المعلومات
                 التي نقدمها. نحن ملتزمون بتقديم خدمة محترفة وشفافة لزوارنا، ونسعى 
                دائمًا لتلبية احتياجاتهم وتوجيههم بشكل صحيح في مسائلهم القانونية."</p>
        </div>

        <div className='aboutus_arab'>
            <p>"We're here to give you trustworthy legal info. Our team of experts works
                 hard to make sure our content is accurate and helpful. We're committed
                  to being clear and helpful with all your legal questions."</p>
        </div>


    </div>
    <Footer/>
    </>
  )
}

export default AboutUs
