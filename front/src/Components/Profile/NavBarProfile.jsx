import React, { useState, useContext } from 'react';
import './Profile.css';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../Context/LogoProvider';
import useUser from '../../Hooks/useUser';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

function NavBarProfile(props) {
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const { setFormData ,setIsAuth} = useContext(AuthContext);
  const { logout } = useUser(); // Utilisez la fonction logout du hook useUser

  const handleLogout = async () => {
    const isLogout = await logout(); // Appelez la fonction logout correcte
    if (isLogout) {
      setIsLoggedOut(true); // Mettre à jour l'état après la déconnexion
    }
  }

  if (isLoggedOut) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className='profile_navBar'>
        <ul>
          <li>
            <Link to='/profile'>الحساب الشخصي</Link>
          </li>
          {props.role != 'moderateur' && (
          <li>
            <Link to='/changePwd'>تغيير كلمة السر</Link>
          </li>
          )}
          {props.role != 'moderateur' && (
          <li>
            <Link to='/interest'>{props.interest}</Link>
          </li>
          )}
          {props.role != 'moderateur' && (
          <li>
            <Link to='/services'>{props.services}</Link>
          </li>
           )}
          {props.role != 'moderateur' && ( 
          <li>
            <Link to='/facture'>فواتيري</Link>
          </li>
          )}
          {props.role === 'moderateur' && ( 
            <li>
              <Link to='/mainmoderateur'> العودة لصفحة الاشراف</Link>
            </li>
          )}
          <li className='logout_btn'>
            <LogoutIcon sx={{color:'red'}}/>
            <a onClick={handleLogout}>تسجيل الخروج</a>
          </li>
        </ul>
      </div>
    </>
  )
}

export default NavBarProfile;
