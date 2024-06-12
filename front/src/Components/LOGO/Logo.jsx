import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/LogoProvider';
import HelpIcon from '@mui/icons-material/Help';
import LoginIcon from '@mui/icons-material/Login';
import useUser from '../../Hooks/useUser';

function Logo() {
  const { isAuth, setIsAuth, formData, updateFormData } = useContext(AuthContext);
  const [initials, setInitials] = useState('');
  const [warned,setWarned] = useState(false);

  const {isWarned} = useUser();

  useEffect(() => {

    
    if (localStorage.getItem('access_token') !== null) {
      setIsAuth(true);
    }
    const storedName = localStorage.getItem('user_name');
    if (storedName) {
      updateFormData({ nom: storedName });
    }
    const nameInitials = formData.nom ? formData.nom.slice(0, 2).toUpperCase() : '';
    setInitials(nameInitials);
  }, [isAuth, formData.nom]);

  useEffect(()=>
  {
    const fetchwarned = async ()=>{

      const result = await isWarned()

      setWarned(result.warned)
      console.log(warned);
    }

    fetchwarned()

  },[])

  return (
    <>
      <div className='logo_section'>
        <div className='login_section'>
        { /*<div>
           <select
              id="lang"
              name="lang"
              className='btn select_lang'>
              <option value=""> اختر اللغة</option>
              <option value="FR">FR</option>
              <option value="AR">AR</option>
  </select>
          </div>*/}
          {isAuth ? (
            <div className="user-initials-circle"> <Link to="/profile">{initials}</Link></div>
          ) : (
            <Link to="/signin">
              <button className=' btn login_btn'>
                <p>تسجيل الدخول </p>
                <LoginIcon sx={{ width: '20px', height: '20px' }} />
              </button>
            </Link>
          )}
        </div>
        <div className='easylaw_section'>

          { warned &&
              <div className='warning'>
                .كان أحد المشرفين مشككًا في نشاطك. يرجى احترام <a href="terms" target='_' style={{"color": "blue"}}>شروط الخدمة الخاصة بنا</a> لتجنب الحظر
              </div>
          }

        <Link to='/help'>
          <div className='help_icon'> 
            <p>مساعدة</p>
            <HelpIcon /> 
          </div>
          </Link>
          <div className='lign_dv'></div>
          <div className='easylaw_logo'>
            <Link to="/">
              <img src="../images/logo.png" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Logo;
