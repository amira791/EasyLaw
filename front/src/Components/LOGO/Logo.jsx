import React from 'react'
import "./Logo.css"
import HelpIcon from '@mui/icons-material/Help';
import LoginIcon from '@mui/icons-material/Login';
import LanguageIcon from '@mui/icons-material/Language';
import { Link } from 'react-router-dom';

function Logo() {
  return (
    <>
    <div className='logo_section'>
    <div className='login_section'>
        <div>
    <select
        id="lang"
        name="lang"
        className='btn select_lang'>
            
          <option value=""> اختر اللغة</option>
          <option value="FR">FR</option>
          <option value="AR">AR</option>      
          </select>
          
          </div>
          <Link  to ="/signin">
          <button className=' btn login_btn'> 
          <p>تسجيل الدخول </p>
           <LoginIcon sx={{ width: '20px', height: '20px' }}/>
           </button>
           </Link>
    </div>

    <div className='easylaw_section'>
        <div className='help_icon'>
            <p>مساعدة</p>
            <HelpIcon/>
        </div>
        <div className='lign_dv'></div>
        <div className='easylaw_logo'> 
        <Link  to ="/">
            <img src ="./images/logo.png"/>
            </Link>
            </div>
    </div>
    </div>
    </>
    
  )
}

export default Logo