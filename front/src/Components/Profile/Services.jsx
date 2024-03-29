import React from 'react'
import './Profile.css'
import DeleteIcon from '@mui/icons-material/Delete';
import CampaignIcon from '@mui/icons-material/Campaign';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import Footer from '../Footer/Footer';
import Logo from '../LOGO/Logo';
import NavBarProfile from './NavBarProfile';
function Services() {
  return (
   <>
<Logo/>
<div className='profile_container'>
    <div className='profile_name'>
        <img alt='photo profile'/>
        <h3>Sanaa_791</h3>
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
    <NavBarProfile/>
  </div>
</div>
    <Footer/>
   
   </>
  )
}

export default Services