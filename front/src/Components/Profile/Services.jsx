import React from 'react'
import './Profile.css'
import DeleteIcon from '@mui/icons-material/Delete';
import CampaignIcon from '@mui/icons-material/Campaign';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
function Services() {
  return (
   <>
   <div className='services-container'>
    <h2>اهتماماتي </h2>
    <div className='services-display'>
    <div className='service-item'>
            <h4> العرض الأول في خدمة الجرائد القانونية  </h4>
            <p>: ميزات العرض</p>
            <ul>
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
    <button>الاشتراك في خدمات أخرى</button>
   </div>
   </>
  )
}

export default Services