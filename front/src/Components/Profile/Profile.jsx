import React , { useState }from 'react'
import Logo from '../LOGO/Logo'
import "./Profile.css"
import Footer from '../Footer/Footer'

import Compte from './Compte';
import ChangePwd from './ChangePwd';
import Services from './Services';
import Interest from './Interest'
import NavBarProfile from './NavBarProfile';



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
      <Compte/>
    <NavBarProfile/>
  </div>
</div>
    <Footer/>
    </>
  )
}

export default Profile