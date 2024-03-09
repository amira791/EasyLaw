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
            <img src="" alt="EasyLaw Logo" />
            <p>
              لا تنسى تحميل تطبيق EasyLaw على هاتفك
            </p>
            <div className='contact'>
            <div className='ligne_dv'></div>
             <h4>:تواصل معنا</h4>
            </div>
            <div className='socialmedia'>
               <a href='https://www.linkedin.com'> <LinkedInIcon sx={{ width: '30px', height: '30px' }} /></a>
               <a href='https://www.facebook.com/?locale=fr_FR'><FacebookOutlinedIcon sx={{ width: '30px', height: '30px' }}/></a>
               <a href='#'> <YouTubeIcon sx={{ width: '30px', height: '30px' }}/></a>
               <a href='#'> <InstagramIcon sx={{ width: '30px', height: '30px' }}/></a>

            </div>
            
          </div>
          
          <div className="footer-item">
          
          <div className="footer-item">
          <a href="#">
              <img src="" alt="EasyLaw App" />
            </a>
            <p>محرك بحث النصوص القانونية الجزائرية</p>
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