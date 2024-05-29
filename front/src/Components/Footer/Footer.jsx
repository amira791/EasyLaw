import React from 'react'
import './Footer.css'
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';



function Footer() {
  return (
    <>
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-item">
           
            <p>
              لا تنسى تحميل تطبيق EasyLaw على هاتفك
            </p>
            <div className='contact'>
            <div className='ligne_dv'></div>
             <h4>:تواصل معنا</h4>
            </div>
            <div className='socialmedia'>
               <a href='https://www.linkedin.com'> <LinkedInIcon sx={{ width: '35px', height: '35px',color: '#045253' ,backgroundColor:'white',borderRadius:'100%' ,padding:'6px' }} /></a>
               <a href='https://www.facebook.com/?locale=fr_FR'><FacebookOutlinedIcon sx={{ width: '35px', height: '35px',color: '#045253' ,backgroundColor:'white',borderRadius:'100%' ,padding:'6px' }}/></a>
               <a href='#'> <YouTubeIcon sx={{ width: '35px', height: '35px',color: '#045253' ,backgroundColor:'white',borderRadius:'100%' ,padding:'6px' }}/></a>
               <a href='#'> <InstagramIcon sx={{ width: '35px', height: '35px',color: '#045253' ,backgroundColor:'white',borderRadius:'100%' ,padding:'6px' }} /></a>

            </div>
            
          </div>
          
          <div className="footer-item">
          
          <div className="footer-item1">
          <a href="#">
              <img src="./images/whitelogo.png" alt="EasyLaw App" />
            </a>
            
            <hr/>
          </div>
           
            <ul className='ftr_list'>
              <li className='ftr_item'><a href="#">حول المنصة</a></li>
              <li className='ftr_item' >|</li>
              <li className='ftr_item' ><a href="#">عروضنا</a></li>
              <li className='ftr_item' >|</li>
              <li className='ftr_item' ><a href="#">المصادر الرسمية</a></li>
              <li className='ftr_item' >|</li>
              <li className='ftr_item' ><a href="#">آخر المستجدات</a></li>
              <li className='ftr_item' >|</li>
              <li className='ftr_item' ><a href="#">الرئيسية</a></li>
              
            </ul>
          </div>
        </div>
    
      </div>
    </footer>
    </>
  )
}

export default Footer