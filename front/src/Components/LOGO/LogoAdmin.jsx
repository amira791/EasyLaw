import React from 'react'
import "./Logo.css"
import HelpIcon from '@mui/icons-material/Help';
import LoginIcon from '@mui/icons-material/Login';
import LanguageIcon from '@mui/icons-material/Language';
import { Link } from 'react-router-dom';

function LogoAdmin(props) {
  return (
    <>
    <div className='logo_section '>
    <div className='login_section'>
    
          <Link  to ="/adminauth">
          <button className=' btn login_btn btn_admin'> 
          <p> الدخول كمستخدم </p>
           <LoginIcon sx={{ width: '20px', height: '20px' }}/>
           </button>
           </Link>
    </div>
    <div className='titre_section'>
        <h2>{props.title} </h2>
    </div>

    <div className='easylaw_section'>
        
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

export default LogoAdmin