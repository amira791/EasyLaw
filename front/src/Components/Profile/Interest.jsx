import React, { useState,useContext,useEffect } from 'react'
import './Profile.css'
import DeleteIcon from '@mui/icons-material/Delete';
import CampaignIcon from '@mui/icons-material/Campaign';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import NavBarProfile from './NavBarProfile';
import Logo from '../LOGO/Logo';
import Footer from '../Footer/Footer';
import { AuthContext } from '../../Context/LogoProvider';
import axios from 'axios';

function Interest() {
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
    <div className='interest-container'>
     <h2>اهتماماتي </h2>
     <div className='interest-display'>
     <div className='interest-item'>
             <h3>الجرائد القضائية </h3>
             <div className=' interest-item-content'>
                 <div className='icon-interest'>
                 <DeleteIcon sx={{marginRight:'5px' }}/>
                 <p>الغاء</p>
                 </div>
                 <div className='icon-interest'>
                 <CampaignIcon sx={{marginRight:'5px' }}/>
                 <p>الجديد</p>
                 </div>
                 
             </div>
         </div>
         <div className='interest-item'>
             <h3>الجرائد القضائية </h3>
             <div className=' interest-item-content'>
                 <div className='icon-interest'>
                 <DeleteIcon sx={{marginRight:'5px' }}/>
                 <p>الغاء</p>
                 </div>
                 <div className='icon-interest'>
                 <CampaignIcon sx={{marginRight:'5px' }}/>
                 <p>الجديد</p>
                 </div>
                 
             </div>
         </div>
         <div className='interest-item'>
             <h3>الجرائد القضائية </h3>
             <div className=' interest-item-content'>
                 <div className='icon-interest'>
                 <DeleteIcon sx={{marginRight:'5px' }}/>
                 <p>الغاء</p>
                 </div>
                 <div className='icon-interest'>
                 <CampaignIcon sx={{marginRight:'5px' }}/>
                 <p>الجديد</p>
                 </div>
                 
             </div>
         </div>
         <div className='interest-item add-content'>
             <AddCircleRoundedIcon sx={{width:'50px',height:'50px' }}/>
             <h2>اضافة اهتمام جديد</h2>
         </div>
         
     </div>
    </div>
    <NavBarProfile  interest="اهتماماتي"  services="خدماتي" />
  </div>
</div>
    <Footer/>
    
    </>
  )
}

export default Interest