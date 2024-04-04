import React, { useState, useContext } from 'react';
import './Profile.css';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../Context/LogoProvider';

function NavBarProfile() {
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const { setFormData ,setIsAuth} = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:8000/user/logout', null, {
        headers: {
          'Authorization': `Token ${localStorage.getItem('access_token')}`
        }
      });
      console.log(response.data.message);
      localStorage.removeItem('access_token');
      setIsLoggedOut(true);

      setFormData({ nom: '' }); // Réinitialiser formData après la déconnexion
      setIsAuth(false);
    } catch (error) {
      console.error(error);
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
          <li>
            <Link to='/changePwd'>تغيير كلمة السر</Link>
          </li>
          <li>
            <Link to='/interest'>اهتماماتي</Link>
          </li>
          <li>
            <Link to='/services'>خدماتي</Link>
          </li>
          <li>
            <a onClick={handleLogout}>تسجيل الخروج</a>
          </li>
        </ul>
      </div>
    </>
  )
}

export default NavBarProfile;