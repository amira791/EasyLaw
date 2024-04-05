import React from 'react'
import './Footer.css'
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';


function FooterAdmin() {
  return (
    <>
    <footer className="footer">
    
        <div className="footer-content">
            
          <div className="footer-item">
            <div className='ligne_dv'></div>
            <div className='socialmedia'>
               <a href='https://www.linkedin.com'> <LinkedInIcon sx={{ width: '35px', height: '35px',color: '#045253' ,backgroundColor:'white',borderRadius:'100%' ,padding:'6px' }} /></a>
               <a href='https://www.facebook.com/?locale=fr_FR'><FacebookOutlinedIcon sx={{ width: '35px', height: '35px',color: '#045253' ,backgroundColor:'white',borderRadius:'100%' ,padding:'6px' }}/></a>
               <a href='#'> <YouTubeIcon sx={{ width: '35px', height: '35px',color: '#045253' ,backgroundColor:'white',borderRadius:'100%' ,padding:'6px' }}/></a>
               <a href='#'> <InstagramIcon sx={{ width: '35px', height: '35px',color: '#045253' ,backgroundColor:'white',borderRadius:'100%' ,padding:'6px' }} /></a>

            </div>
          </div>
          
          <div className="footer-item  footer-item-admin">
          <a href="#">
              <img  className="img_logo" src="./images/LOGO1.png" alt="EasyLaw App" />
            </a>
          </div>
           
        </div>
    </footer>
    </>
  )
}

export default FooterAdmin