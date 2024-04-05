import LogoAdmin from '../../LOGO/LogoAdmin'
import FooterAdmin from '../../Footer/FooterAdmin'
import React , { useState }from 'react'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TitleBar from '../../TitleBar/TitleBar';

function CreateAccModerateur() {
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
   <LogoAdmin title="صفحة الادارة"/>
   <TitleBar title="  ادارة الحسابات" />
   <h2 style={{ textAlign: 'center', color:'#374957'}}>انشاء حساب مشرف جديد</h2>

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
        <button type="submit"> انشاء الحساب </button>
        
        

      </form>
    </div>
   <FooterAdmin/>
   </>
  )
}
export default CreateAccModerateur