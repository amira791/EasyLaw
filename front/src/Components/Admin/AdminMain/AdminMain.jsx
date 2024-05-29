import React from 'react';
import LogoAdmin from '../../LOGO/LogoAdmin';
import TitleBar from '../../TitleBar/TitleBar';
import FooterAdmin from '../../Footer/FooterAdmin';
import './AdminMain.css';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

import { Link, useNavigate } from 'react-router-dom';

function AdminMain() {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate('/accountmanagment');
  };

  return (
    <>
      <LogoAdmin title="صفحة الادارة "/>
      <TitleBar title="ادارة المنصة"/>
      <div className='AdminMain-Container'>
        
        <div className='AdminMain-menu' >
        <Link to='/tarification'>
          <SettingsOutlinedIcon sx={{width:'90px',height:'90px',
          position:'absolute',top:'-35px',right:'9px'}}/>
          <div className='pic-menu-dv'>
            <img src="./images/money.png" className='pic-menu'/>
          </div>
          <h2>ادارة التسعيرة</h2>
          </Link>
        </div>
        
        
        <div className='AdminMain-menu'>
          <SettingsOutlinedIcon sx={{width:'90px',height:'90px',
          position:'absolute',top:'-35px',right:'9px'}}/>
          <div className='pic-menu-dv'>
            <img src="./images/remarquer.png" className='pic-menu'/>
          </div>
          <h2> ادارة المحتوى القانوني</h2>
        </div>
       
        <div className='AdminMain-menu'>
        <Link to="/accountmanagment">
          <SettingsOutlinedIcon sx={{width:'90px',height:'90px',
          position:'absolute',top:'-35px',right:'9px'}}/>
          <div className='pic-menu-dv' onClick={handleNavigation}>
            <img src="./images/account.png" className='pic-menu'/>
          </div>
          <h2>ادارة الحسابات </h2>
          </Link>
        </div>
        
      </div>
      <FooterAdmin/>
    </>
  );
}

export default AdminMain;
