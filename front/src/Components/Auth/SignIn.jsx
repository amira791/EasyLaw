import React, { useState } from 'react';
import { Link} from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import Footer from '../Footer/Footer';
import Logo from '../LOGO/Logo';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TitleBar from '../TitleBar/TitleBar';
import axios from 'axios';

function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: ''
  });

  const [passwordError, setPasswordError] = useState('');
  const [passwordType, setPasswordType] = useState('password');
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/user/login', formData);
      console.log(response.data.token);

    localStorage.clear();
     
      

        console.log( localStorage.setItem('access_token', response.data.token));
         localStorage.setItem('refresh_token', response.data.refresh);
         axios.defaults.headers.common['Authorization'] =  `token ${response.data['token']}`;
         
        // localStorage.setItem('username', response.data.username);  Storing the username
         setLoggedIn(true);
    } catch (error) {
      console.error('Une erreur s\'est produite lors de l\'authentification :', error);
      setErrorMessage('Erreur lors de l\'authentification. Veuillez vérifier vos informations.');
    
    }
  };

  if (loggedIn) {
     return <Navigate to="/profile" />;
  }

  return (
    <>
    <Logo />
    <TitleBar title="  تسجيل الدخول" />
    <div className="signin-form">
    
      <form onSubmit={handleSubmit}>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className='username_dv1'>
        <div className='input-group'>
        <label htmlFor="dateN"> البريد الالكتروني</label>
        <input
          type="text"
          id="email"
          name="username"
          className='user_info SELECT-dv'
          value={formData.username}
          onChange={handleChange}
          placeholder=' البريد الالكتروني'
          required
        />
        </div>
        <div className='input-group'>
        <label htmlFor="company">كلمة السر </label>
        <div className='input-group-row '>
        <div className='visibility-icon' onClick={togglePassword}>
          {passwordType === 'password' ? (
            <VisibilityIcon sx={{ width: '20px', height: '20px' }}/>
          ) : (
            <VisibilityOffIcon sx={{ width: '18px', height: '18px' }}/>
          )}
        </div>
        <input
           type={passwordType}
          id="password"
          name="password"
          className='user_info SELECT-dv'
          value={formData.password}
          onChange={handleChange}
          placeholder='كلمة السر'
          required
        />
        </div>
      
        </div>
</div>
        <button type="submit">تسجيل الدخول</button>
        <div className="connection_link">
        <a   >
          <Link style={{ color: '#484646' }}  to ="/signup">إنشاء حساب </Link>
          </a>
        </div>
        

      </form>
    </div>
    <Footer/>

    </>
  )
}

export default SignIn