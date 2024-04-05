import React from 'react'
import './Profile.css'
import DeleteIcon from '@mui/icons-material/Delete';
import CampaignIcon from '@mui/icons-material/Campaign';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';

function Interest() {
  return (
    <>
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
    </>
  )
}

export default Interest