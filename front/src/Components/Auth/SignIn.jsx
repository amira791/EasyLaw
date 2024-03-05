import React , { useState }from 'react'
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Logo from '../LOGO/Logo';

function SignIn() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
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
      };
  return (
    <>
    <Logo/>
<div className='signup_titre'>
      <h2>تسجيل الدخول</h2>
    </div>
    <div className="signup-form">
    
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
        <input
          type="password"
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