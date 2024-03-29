import React from 'react'
import './Profile.css'
import { Link } from 'react-router-dom';

function NavBarProfile() {
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
                <a>تسجيل الخروج</a>
              </li>
        </ul>
    </div>
   </>
  )
}

export default NavBarProfile