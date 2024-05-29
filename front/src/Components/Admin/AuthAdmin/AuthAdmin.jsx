
import LogoAdmin from '../../LOGO/LogoAdmin'
import FooterAdmin from '../../Footer/FooterAdmin'
import React , { useState }from 'react'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TitleBar from '../../TitleBar/TitleBar';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import NavBarProfile from '../../Profile/NavBarProfile'

function AuthAdmin() {

  const [formData, setFormData] = useState({ email: '', password: '' ,username:''});
  const [passwordError, setPasswordError] = useState('');
  const [passwordType, setPasswordType] = useState('password');

  const togglePassword = () => {
    setPasswordType(prevType => prevType === 'password' ? 'text' : 'password');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/user/login', formData);
      console.log(response.data.token);
      const userData = response.data;
      localStorage.clear();
     
        console.log( localStorage.setItem('access_token', response.data.token));
         localStorage.setItem('refresh_token', response.data.refresh);
         axios.defaults.headers.common['Authorization'] =  `token ${response.data['token']}`;
      // Vérification du rôle de l'utilisateur
     // if (userData.role === 'admin') {
        // Redirection vers la page d'administration
        window.location.href = '/admin';
     // } else {
        // Afficher un message d'erreur si le rôle n'est pas celui d'un administrateur
        //console.log("Vous n'avez pas les autorisations nécessaires pour accéder à cette page."); 
     // }
      <Navigate to="/admin" />
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la connexion :', error);
      // Afficher un message d'erreur en cas d'échec de la connexion
      setPasswordError('Erreur lors de la connexion. Veuillez vérifier vos identifiants.');
    }
  };

    
    
 
     
    
    /*  const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password.length < 8) {
          setPasswordError('كلمة السر يجب أن تتكون من 8 حروف أو أكثر');
        } else {
        console.log(formData);
        setPasswordError('');}
      };*/
  return (
   <>
   <LogoAdmin title="صفحة الادارة"/>
   <TitleBar title="  تسجيل الدخول كمدير   " />
    <div className="signin-form">
    
      <form onSubmit={handleSubmit}>
        
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
      {passwordError && <span className="error-message">{passwordError}</span>}
        </div>
</div>
        <button type="submit">تسجيل الدخول</button>
        
        

      </form>
    </div>
   <FooterAdmin/>
   </>
  )
}

export default AuthAdmin