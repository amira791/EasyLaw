
import React, { useState, useContext } from 'react';
import '../../Profile/Profile.css';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../../Context/LogoProvider';
import useUser from '../../../Hooks/useUser';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

function NavBarMod(props) {
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
      return <Navigate to="/mainmoderateur" />;
    }
  return (
    <>
    <div className='profile_navBar'>
      <ul>
        <li>
          <Link to='/profilemoderateur'>الحساب الشخصي</Link>
        </li>
          <li>
            <Link to='/mainmoderateur'> العودة لصفحة الاشراف</Link>
          </li>
        
          <li className='logout_btn'>
            <LogoutIcon sx={{color:'red'}}/>
            <a onClick={handleLogout}>تسجيل الخروج</a>
          </li>
      </ul>
    </div>
  </>

  )
}

export default NavBarMod