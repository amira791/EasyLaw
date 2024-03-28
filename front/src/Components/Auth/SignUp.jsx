import React, { useState } from 'react'
import "./SignUp.css"
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Logo from '../LOGO/Logo';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TitleBar from '../TitleBar/TitleBar';
import axios from 'axios';


function SignUp() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    DateN: '',
    company: '',
    job: '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password.length < 8) {
      setPasswordError('كلمة السر يجب أن تتكون من 8 حروف أو أكثر');
    } else {
      try {
        const response = await axios.post('http://localhost:8000/signup/', formData);
        console.log(response.data);
        // Réinitialiser le formulaire après l'inscription réussie
        setFormData({
          firstName: '',
          lastName: '',
          DateN: '',
          company: '',
          job: '',
          email: '',
          password: ''
        });
        setPasswordError('');
      } catch (error) {
        console.error('Une erreur s\'est produite lors de l\'inscription :', error);
        // Gérer les erreurs d'inscription ici, par exemple :
        // if (error.response.data.password) {
        //   setPasswordError(error.response.data.password);
        // }
      }
    }
  };
  return (
    <>
    <Logo/>
    <TitleBar title="  إنشاء حساب " />
<div className="signup-form">
  <form onSubmit={handleSubmit} className='signup_sub'>
    <div className='username_dv'>
      <div className='input-group'>
         <label htmlFor="lastName">اللقب</label>
         <input
         className='input_item'
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder='اللقب'
            required
          />
      </div>
      <div className='input-group'>
         <label htmlFor="firstName">الاسم</label>
         <input
         className='input_item'
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder='الاسم'
            required
        />
       </div>
    </div>
    <div className='username_dv'>
      <div className='input-group'>
         <label htmlFor="company"> البريد الالكتروني </label>
         <input
         className='input_item'
             type="email"
             id="email"
             name="email"
             //lassName='user_info SELECT-dv'
             value={formData.email}
             onChange={handleChange}
             placeholder=' البريد الالكتروني'
             required
          />
      </div>
      <div className='input-group'>
         <label htmlFor="dateN">تاريخ الميلاد</label>
         <input
         className='input_item'
             type="date"
             id="dateN"
             name="DateN"
             //className='user_info SELECT-dv'
             value={formData.DateN}
             onChange={handleChange}
             placeholder='تاريخ الميلاد'
             required
          />
      </div>
   </div>
   <div className='username_dv1'>
      <div className='input-group-col'>
        <label htmlFor="company">الشركة / الجامعة </label>
        <input
            type="text"
            id="company"
            name="company"
            className='input_item_col'
            value={formData.company}
            onChange={handleChange}
            placeholder=' الشركة / الجامعة'
            required
         />
      </div>
      <div className='input-group-col'>
        <label htmlFor="job">المهنة</label>
        <select
           id="job"
           name="job"
           className='input_item_col '
           value={formData.job}
           onChange={handleChange}
           required
         >
          <option value="">اختر المهنة</option>
          <option value="طالب">طالب</option>
          <option value="موظف">موظف</option>
          <option value="مهندس">مهندس</option>
        </select>
      </div>
      <div className='input-group-col'>
      <label htmlFor="password"> كلمة السر </label>
      <div className='input-group-row '>
      <div className='visibility-icon' onClick={togglePassword}>
          {passwordType === 'password' ? (
            <VisibilityIcon sx={{ width: '20px', height: '20px',marginTop:'5px' }}/>
          ) : (
            <VisibilityOffIcon sx={{ width: '20px', height: '20px',marginTop:'5px' }}/>
          )}
        </div>
        <input
          type={passwordType}
          id="password"
          name="password"
          className='input_item_col'
          value={formData.password}
          onChange={handleChange}
          placeholder=' كلمة السر'
          required
        />
        
      </div>
      {passwordError && <span className="error-message">{passwordError}</span>}
    </div>
      <div className='input-group-col'>
         <label htmlFor="company"> تأكيد كلمة السر </label>
         <div className='input-group-row '>
         <div className='visibility-icon' onClick={togglePassword}>
          {passwordType === 'password' ? (
            <VisibilityIcon sx={{ width: '20px', height: '20px',marginTop:'5px' }}/>
          ) : (
            <VisibilityOffIcon sx={{ width: '20px', height: '20px',marginTop:'5px' }}/>
          )}
        </div>
            <input
             type="password"
             id="passwordV"
             name="password"
             className='input_item_col'
             value={formData.password}
             onChange={handleChange}
             placeholder=' تأكيد كلمة السر'
             required
            />
            </div>
      </div>
</div>

 <button type="submit" >انشاء حساب</button>
        <a className='connection_link'><Link style={{ color: '#484646'}}  to ="/signin">تسجيل الدخول</Link></a>
      </form>
    </div>
    <Footer/>

    </>
  )
}

export default SignUp