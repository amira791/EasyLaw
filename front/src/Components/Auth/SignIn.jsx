import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Logo from '../LOGO/Logo';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TitleBar from '../TitleBar/TitleBar';
import useUser from '../../Hooks/useUser';

function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: ''
  });
  const { loginUser, errorMessage } = useUser();
  const [passwordType, setPasswordType] = useState('password');
  const navigate = useNavigate();
  const [error, setError] = useState('');

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
    const loggedIn = await loginUser(formData);
    if (loggedIn) {
      const role = localStorage.getItem('role'); // Get the role from localStorage
      if (role === 'admin') {
        navigate('/admin'); // Redirect admin to admin main
      } else if (role === 'moderateur') {
        navigate('/mainmoderateur'); // Redirect moderator to moderator main
      } else {
        navigate('/'); // Redirect other users to law categories
      }
    } else {
      console.log ("hiii")
      
      navigate('/');
    }
  };

  return (
    <>
      <Logo />
      <TitleBar title="  تسجيل الدخول" />
      <div className="signin-form">
        <form onSubmit={handleSubmit}>
          <div className='username_dv1'>
            <div className='input-group'>
              <label htmlFor="dateN"> اسم المستخدم </label>
              <input
                type="text"
                id="email"
                name="username"
                className='user_info SELECT-dv'
                value={formData.username}
                onChange={handleChange}
                placeholder=' اسم المستخدم'
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
            <a>
              <Link style={{ color: '#484646' }} to="/signup">إنشاء حساب </Link>
            </a>
          </div>
        </form>
      </div>
      <Footer/>
    </>
  );
}

export default SignIn;
