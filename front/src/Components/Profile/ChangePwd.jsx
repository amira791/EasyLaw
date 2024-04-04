import React, { useState,useContext } from 'react'
import './Profile.css'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';
import Logo from '../LOGO/Logo';
import Footer from '../Footer/Footer';
import NavBarProfile from './NavBarProfile';
import { AuthContext } from '../Context/LogoProvider';

function ChangePwd() {
  const {  formData} = useContext(AuthContext);
  const [pwd, setPwd] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
  const [passwordError, setPasswordError] = useState('');
  const [passwordType, setPasswordType] = useState('password');

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
      try {
        const response = await axios.post('http://localhost:8000/user/change_password', {
          old_password: pwd.oldPassword,
          new_password: pwd.newPassword
        }, {
          headers: {
            'Authorization': `Token ${localStorage.getItem('access_token')}`
          }
        });
        console.log(response.data.message);
        setPwd({ oldPassword: '', newPassword: '', confirmPassword: '' });
        setPasswordError('');
      } catch (error) {
        console.error(error);
        setPasswordError('خطأ في تغيير كلمة السر');
      }
    }
  };

  return (
    <>
      <Logo />
      <div className='profile_container'>
        <div className='profile_name'>
          <img alt='photo profile' />
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
          <NavBarProfile />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ChangePwd