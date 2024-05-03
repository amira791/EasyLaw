import React, { useState,useContext,useEffect } from 'react'
import './Profile.css'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

import Logo from '../LOGO/Logo';
import Footer from '../Footer/Footer';
import NavBarProfile from './NavBarProfile';
import { AuthContext } from '../../Context/LogoProvider';
import axios from 'axios';
import useUser from '../../Hooks/useUser';
function ChangePwd() {
  const { changePassword } = useUser();
  const {  formData} = useContext(AuthContext);
  const [pwd, setPwd] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
  const [passwordError, setPasswordError] = useState('');
  const [passwordType, setPasswordType] = useState('password');
  const [initials, setInitials] = useState('');

  const togglePassword = () => {
    setPasswordType(prevType => prevType === 'password' ? 'text' : 'password');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPwd(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (pwd.newPassword.length < 8) {
      setPasswordError('كلمة السر يجب أن تتكون من 8 حروف أو أكثر');
    } else if (pwd.newPassword !== pwd.confirmPassword) {
      setPasswordError('كلمتا السر الجديدتان غير متطابقتين');
    } else {
      await changePassword(pwd.oldPassword, pwd.newPassword); // Utilisez la fonction changePassword pour modifier le mot de passe
      setPwd({ oldPassword: '', newPassword: '', confirmPassword: '' });
      setPasswordError('');
    }
  };
  useEffect(() => {
    const nameInitials = formData.nom ? formData.nom.slice(0, 2).toUpperCase() : '';
    setInitials(nameInitials);
  }, [formData.nom]);
  return (
    <>
      <Logo />
      <div className='profile_container'>
      <div className='profile_name'>
    <div className="user-initials-circle"> {initials}</div>
        <h3>{formData.nom}</h3>
    </div>
        <div className='profile_content'>
          <form onSubmit={handleSubmit} className='profile_form'>
            <div className='col_dv'>
              <div className='profile_info'>
                <label htmlFor="oldPassword"> كلمة السر الحالية </label>
                <input
                  className='profile_info_input'
                  type={passwordType}
                  id="oldPassword"
                  name="oldPassword"
                  value={pwd.oldPassword}
                  onChange={handleChange}
                  placeholder=' كلمة السر الحالية'
                  required
                />
              </div>
              <div className='profile_info'>
                <label htmlFor="newPassword">كلمة السر الجديدة </label>
                <input
                  className='profile_info_input'
                  type={passwordType}
                  id="newPassword"
                  name="newPassword"
                  value={pwd.newPassword}
                  onChange={handleChange}
                  placeholder='كلمة السر الجديدة'
                  required
                />
              </div>
              <div className='profile_info'>
                <label htmlFor="confirmPassword"> تأكيد كلمة السر الجديدة</label>
                <input
                  className='profile_info_input'
                  type={passwordType}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={pwd.confirmPassword}
                  onChange={handleChange}
                  placeholder=' تأكيد كلمة السر الجديدة '
                  required
                />
              </div>
            </div>
            <button className='save_info' type="submit"> حفظ كلمة السر الجديدة </button>
          </form>
          <NavBarProfile  interest="اهتماماتي"  services="خدماتي" />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ChangePwd