import React, { useState,useContext,useEffect } from 'react'
import './Profile.css'
import DeleteIcon from '@mui/icons-material/Delete';
import CampaignIcon from '@mui/icons-material/Campaign';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import Footer from '../Footer/Footer';
import Logo from '../LOGO/Logo';
import NavBarProfile from './NavBarProfile';
import { AuthContext } from '../../Context/LogoProvider';
import axios from 'axios';
function Services() {
    const [initials, setInitials] = useState('');
    const {  formData} = useContext(AuthContext);
    useEffect(() => {
        const nameInitials = formData.nom ? formData.nom.slice(0, 2).toUpperCase() : '';
        setInitials(nameInitials);
      }, [formData.nom]);
    
  return (
   <>
<Logo/>
<div className='profile_container'>
<div className='profile_name'>
    <div className="user-initials-circle"> {initials}</div>
        <h3>{formData.nom}</h3>
    </div>
    <div className='profile_content'>
    <div className='services-container'>
    <h2>خدماتي </h2>
    <div className='services-display'>
    <div className='service-item'>
            <h4> <span className='serv-span'>العرض الأول</span>  في خدمة الجرائد القانونية  </h4>
            <p>: ميزات العرض</p>
            <ul >
                <li>الاطلاع على كل النصوص القانونية</li>
                <li>الحصول على كل المستجدات</li>
                <li>تلقي تنبيهات متعلقة بالمستجدات</li>
            </ul>
            <p>ينتهي العرض في :    10/10/2025  </p>
            <div className=' service-item-content'>
                <div className='icon-service'>
                <p>تجديد العرض</p>
                </div>
                <div className='icon-service ofr'>
               
                <p>3 أيام على انتهاء العرض</p>
                </div>
                
            </div>
        </div>

        <div className='service-item'>
            <h4> <span className='serv-span'>العرض الأول</span>  في خدمة الجرائد القانونية  </h4>
            <p>: ميزات العرض</p>
            <ul >
                <li>الاطلاع على كل النصوص القانونية</li>
                <li>الحصول على كل المستجدات</li>
                <li>تلقي تنبيهات متعلقة بالمستجدات</li>
            </ul>
            <p>ينتهي العرض في :    10/10/2025  </p>
            <div className=' service-item-content'>
                <div className='icon-service'>
                <p>تجديد العرض</p>
                </div>
                <div className='icon-service ofr'>
               
                <p>3 أيام على انتهاء العرض</p>
                </div>
                
            </div>
        </div>

        <div className='service-item'>
            <h4> <span className='serv-span'>العرض الأول</span>  في خدمة الجرائد القانونية  </h4>
            <p>: ميزات العرض</p>
            <ul >
                <li>الاطلاع على كل النصوص القانونية</li>
                <li>الحصول على كل المستجدات</li>
                <li>تلقي تنبيهات متعلقة بالمستجدات</li>
            </ul>
            <p>ينتهي العرض في :    10/10/2025  </p>
            <div className=' service-item-content'>
                <div className='icon-service'>
                <p>تجديد العرض</p>
                </div>
                <div className='icon-service ofr'>
               
                <p>3 أيام على انتهاء العرض</p>
                </div>
                
            </div>
        </div>
       
        
    </div>
    <button className='btn_sub'>الاشتراك في خدمات أخرى</button>
   </div>
   <NavBarProfile  interest="اهتماماتي"  services="خدماتي" />
  </div>
</div>
    <Footer/>
   
   </>
  )
}

export default Services