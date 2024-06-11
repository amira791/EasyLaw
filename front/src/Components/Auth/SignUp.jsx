import React, { useState } from 'react'
import "./SignUp.css"
import { Link} from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Logo from '../LOGO/Logo';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TitleBar from '../TitleBar/TitleBar';
import useUser from '../../Hooks/useUser';
import axios from 'axios';


function SignUp() {
  const { addNewUser } = useUser();
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    dateNaiss: '',
    univer_Entrep: '',
    occupation: '',
    email: '',
    password: '',
    username: ''
  });
  const [passwordError, setPasswordError] = useState('');
  const [passwordType, setPasswordType] = useState('password');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const [isLoading,setIsLoading] = useState(true)

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
    setIsLoading(true)
    e.preventDefault();
    addNewUser(formData, confirmPassword, setErrorMessage, setPasswordError, setSuccessMessage, navigate);
    setIsLoading(false)
  };


  return (
    
    <>
    <Logo/>
    <TitleBar title="  إنشاء حساب " />
<div className="signup-form">
  <form onSubmit={handleSubmit} className='signup_sub'>
  <div className='message-container'>
            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </div>
    <div className='username_dv'>
      <div className='input-group'>
         <label htmlFor="nom">اللقب</label>
         <input
         className='input_item'
            type="text"
            id="nom"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            placeholder='اللقب'
            required
          />
      </div>
      <div className='input-group'>
         <label htmlFor="prenom">الاسم</label>
         <input
         className='input_item'
            type="text"
            id="prenom"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            placeholder='الاسم'
            required
        />
       </div>
    </div>
    <div className='username_dv'>
      <div className='input-group'>
         <label htmlFor="email"> البريد الالكتروني </label>
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
         <label htmlFor="dateNaiss">تاريخ الميلاد</label>
         <input
         className='input_item'
             type="date"
             id="dateNaiss"
             name="dateNaiss"
             //className='user_info SELECT-dv'
             value={formData.dateNaiss}
             onChange={handleChange}
             placeholder='تاريخ الميلاد'
             required
          />
      </div>
   </div>
   <div className='username_dv1'>
      <div className='input-group-col'>
        <label htmlFor="univer_Entrep">الشركة / الجامعة </label>
        <input
            type="text"
            id="univer_Entrep"
            name="univer_Entrep"
            className='input_item_col'
            value={formData.univer_Entrep}
            onChange={handleChange}
            placeholder=' الشركة / الجامعة'
            required
         />
      </div>
      <div className='input-group-col'>
        <label htmlFor="username">اسم المستخدم</label>
        <input
            type="text"
            id="username"
            name="username"
            className='input_item_col'
            value={formData.username}
            onChange={handleChange}
            placeholder=' اسم المستخدم'
            required
         />
      </div>
      <div className='input-group-col'>
        <label htmlFor="occupation">المهنة</label>
        <select
           id="occupation"
           name="occupation"
           className='input_item_col '
           value={formData.occupation}
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
         
        </div>
        <input
    type="password"
    id="confirmPassword"
    name="confirmPassword"
    className='input_item_col'
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
    placeholder='تأكيد كلمة السر'
    required
/>
            </div>
      </div>
      
      
</div>

 <button type="submit" >انشاء حساب</button>
        <a className='connection_link'><Link style={{ color: '#484646'}}  to ="/signin">تسجيل الدخول {isLoading && <i className='sloading'></i>}</Link></a>
      </form>
    </div>
    <Footer/>

    </>
  )
}

export default SignUp