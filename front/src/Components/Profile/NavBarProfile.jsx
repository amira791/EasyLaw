import React from 'react'
import './Profile.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

function NavBarProfile({ formData, isAuth }) {
  const handleLogout = async () => {
    const access_token = localStorage.getItem('access_token');
    console.log(access_token)
    try {
      const response = await axios.post('http://localhost:8000/user/logout', {
        headers: {
            Authorization: `token ${access_token}`
        }
    });
   
    <Navigate to="/" />;
  } catch (error) {
      console.error('Une erreur s\'est produite lors de la déconnexion :', error);
    }
  };
  return (
   <>
   <div className='profile_navBar'>
        <ul>
        <li>
                <Link to='/profile' >
                  الحساب الشخصي
                </Link>
              </li>
              <li>
                <Link to='/changePwd' >تغيير كلمة السر</Link>
              </li>
              <li>
                <Link to='/interest' >اهتماماتي</Link>
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

export default NavBarProfile