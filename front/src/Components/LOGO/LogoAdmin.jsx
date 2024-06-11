import React, { useState, useEffect, useContext } from 'react';
import "./Logo.css"
import HelpIcon from '@mui/icons-material/Help';
import LoginIcon from '@mui/icons-material/Login';
import LanguageIcon from '@mui/icons-material/Language';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/LogoProvider';

function LogoAdmin(props) {
  const { isAuth, setIsAuth, formData, updateFormData } = useContext(AuthContext);
  const [initials, setInitials] = useState('');

  useEffect(() => {
    if (localStorage.getItem('access_token') !== null) {
      setIsAuth(true);
    }
    const storedName = localStorage.getItem('user_name');
    if (storedName) {
      updateFormData({ nom: storedName });
    }
    const nameInitials = formData.nom ? formData.nom.slice(0, 2).toUpperCase() : '';
    setInitials(nameInitials);
  }, [isAuth, formData.nom]);
  return (
    <>
    <div className='logo_section '>
    <div className='login_section'>
    {isAuth ? (
            <div className="user-initials-circle"> <Link to="/profileadmin">{initials}</Link></div>
          ) : (
            <Link to="/signin">
            <button className=' btn login_btn'>
              <p>تسجيل الدخول </p>
              <LoginIcon sx={{ width: '20px', height: '20px' }} />
            </button>
          </Link>
            )}
    </div>
    <div className='titre_section'>
        <h2>{props.title} </h2>
    </div>

    <div className='easylaw_section'>
        
        <div className='lign_dv'></div>
        <div className='easylaw_logo'> 
        <Link  to ="/admin">
            <img src ="./images/logo.png"/>
            </Link>
            </div>
    </div>
    </div>
    </>
  )
}

export default LogoAdmin