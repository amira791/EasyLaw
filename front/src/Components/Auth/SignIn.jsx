import React , { useState }from 'react'
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Logo from '../LOGO/Logo';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TitleBar from '../TitleBar/TitleBar';


function SignIn() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
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
        setPasswordError('');}
      };
  return (
    <>
    <Logo/>
    <TitleBar title="  تسجيل الدخول" />
    <div className="signin-form">
    
      <form onSubmit={handleSubmit}>
        
        <div className='username_dv1'>
        <div className='input-group'>
        <label htmlFor="dateN"> البريد الالكتروني</label>
        <input
          type="email"
          id="email"
          name="email"
          className='user_info SELECT-dv'
          value={formData.email}
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
      {passwordError && <span className="error-message">{passwordError}</span>}
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