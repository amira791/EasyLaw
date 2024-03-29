import React , { useState }from 'react'
import "./Profile.css"
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from 'react-router-dom';
import Logo from '../LOGO/Logo';
import Footer from '../Footer/Footer';
import NavBarProfile from './NavBarProfile';


function ChangePwd() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        DateN: '',
        company: '',
        job: '',
        mail:''
      });
      const [passwordError, setPasswordError] = useState('');
      const [passwordType, setPasswordType] = useState('password');
      const togglePassword = () => {
        setPasswordType(prevType => prevType === 'password' ? 'text' : 'password');
      };
      
    
    
      
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
          ...prevData,
          [name]: value
        }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password.length < 8) {
          setPasswordError('كلمة السر يجب أن تتكون من 8 حروف أو أكثر');
        } else {
          console.log(formData);
        // Reset form 
        setFormData({
          firstName: '',
          lastName: '',
          DateN: '',
          company: '',
          job: '',
          email: '',
          password: ''
        });
        setPasswordError('');}
    
        
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
    <form onSubmit={handleSubmit} className='profile_form'>
    
    <div className='col_dv'>
        <div className='profile_info'>
            <label htmlFor="company"> كلمة السر الحالية </label>
            <input
            className='profile_info_input'
              type="password"
              id="company"
              name="company"
            
              value={formData.company}
              onChange={handleChange}
              placeholder='  كلمة السر الحالية'
              required
            />
        </div>
        <div className='profile_info'>
            <label htmlFor="company">كلمة السر الجديدة </label>
            <input
            className='profile_info_input'
              type="password"
              id="company"
              name="company"
            
              value={formData.company}
              onChange={handleChange}
              placeholder='كلمة السر الجديدة'
              required
            />
        </div>
        <div className='profile_info'>
            <label htmlFor="company"> تأكيد كلمة السر الجديدة</label>
            <input
            className='profile_info_input'
              type="password"
              id="company"
              name="company"
            
              value={formData.company}
              onChange={handleChange}
              placeholder=' تأكيد كلمة السر الجديدة '
              required
            />
        </div>
        
     </div>
     <button className='save_info' type="submit"> حفظ كلمة السر الجديدة </button>
</form>
    <NavBarProfile/>
  </div>
</div>
    <Footer/>
    
      </>
  )
}

export default ChangePwd