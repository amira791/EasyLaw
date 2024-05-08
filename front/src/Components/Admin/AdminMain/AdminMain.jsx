import React from 'react'
import LogoAdmin from '../../LOGO/LogoAdmin'
import TitleBar from '../../TitleBar/TitleBar'
import FooterAdmin from '../../Footer/FooterAdmin'
import './AdminMain.css'
import SettingsSharpIcon from '@mui/icons-material/SettingsSharp';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Link } from 'react-router-dom'

function AdminMain() {
  return (
    <>
    <LogoAdmin title="صفحة الادارة "/>
    <TitleBar title="ادارة المنصة"/>
    <div className='AdminMain-Container'>
        <div className='AdminMain-menu'>
            <SettingsOutlinedIcon sx={{width:'90px',height:'90px',
            position:'absolute',top:'-35px',right:'9px'}}/>
            <div className='pic-menu-dv'>
                 <img src="./images/money.png" className='pic-menu'/>
            </div>
            
            <h2>ادارة التسعيرة</h2>
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
        <Link to="/">
            <SettingsOutlinedIcon sx={{width:'90px',height:'90px',
            position:'absolute',top:'-35px',right:'9px'}}/>
            <div className='pic-menu-dv'>
            <img src="./images/account.png" className='pic-menu'/>
            </div>
            <h2>ادارة الحسابات </h2>
            </Link>
        </div>
        

    </div>
    <FooterAdmin/>
    </>
  )
}

export default AdminMain