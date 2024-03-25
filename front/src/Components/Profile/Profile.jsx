import React , { useState }from 'react'
import Logo from '../LOGO/Logo'
import "./Profile.css"
import Footer from '../Footer/Footer'
import { Link } from 'react-router-dom';
import Compte from './Compte';
import ChangePwd from './ChangePwd';
import Services from './Services';


function Profile() {
      const [activeList, setNavList] = useState('profile');
      const handleListChange = (newContent) => {
        setNavList( newContent); // Update the active List
      };
      const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        DateN: '',
        company: '',
        job: '',
        mail:''
      });

      
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
          ...prevData,
          [name]: value
        }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // Reset form 
        setFormData({
          firstName: '',
          lastName: '',
          DateN: '',
          company: '',
          job: '',
          mail:''
        });
      };

  return (
    <>
    <Logo/>
<div className='profile_container'>
    <div className='profile_name'>
        <img alt='photo profile'/>
        <h3>Sanaa_791</h3>
    </div>

    <div className='profile_content'>
      <Services/>
    <div className='profile_navBar'>
        <ul>
        <li>
                <Link to='/profile' onClick={() => handleListChange('profile')}>
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
  </div>
</div>
    <Footer/>
    </>
  )
}

export default Profile