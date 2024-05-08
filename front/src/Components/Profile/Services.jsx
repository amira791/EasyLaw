import React, { useState,useContext,useEffect } from 'react'
import './Profile.css'
import DeleteIcon from '@mui/icons-material/Delete';
import CampaignIcon from '@mui/icons-material/Campaign';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import Footer from '../Footer/Footer';
import Logo from '../LOGO/Logo';
import NavBarProfile from './NavBarProfile';
import { AuthContext } from '../../Context/LogoProvider';
import usePayment from '../../Hooks/usePayment';
import { Link } from 'react-router-dom';



function Services() {
    const [initials, setInitials] = useState('');
    
    const {  formData} = useContext(AuthContext);

    const [sub, setSub] = useState(null)
    const remaining = Math.ceil((new Date(sub?.dateFin) - new Date())/ (1000 * 60 * 60 * 24))
    const {getCurrentSubscription} = usePayment()

    useEffect(() => {
        const nameInitials = formData.nom ? formData.nom.slice(0, 2).toUpperCase() : '';
        setInitials(nameInitials);

    const fetchCurrentSubscription = async () => {
        const current = await getCurrentSubscription(); 
        if (current)
            setSub(current[0]);
    };

    fetchCurrentSubscription()
    }, []);
    console.log(sub);

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
    {sub?
    <>
    <div className='services'>
            <h4> : الخدمات المتاحة لك  </h4>
            <ul className='services'>
                {
                    sub?.service.accesses.map(access=> <li key={access.id} > {access.nom} </li>)
                }
            </ul>
    </div>

    <div className='service-item'>
            <h4> أنت مشترك في <span className='serv-span'>{sub?.service.nom}</span>   </h4>
            <p> {sub?.service.tarif} : السعر </p>
            <p>تاريخ الاشتراك : {sub?.dateDebut}     </p>
            <p>تاريخ الانتهاء :    {sub?.dateFin}  </p>
            <div className=' service-item-content'>
                {/* <div className='icon-service'>
                <p>تجديد العرض</p>
                </div> */}
                <div className='icon-service ofr'>
               
                <p  className={remaining > 7 && "safe"} > {remaining} : الأيام المتبقية للإنتهاء </p>
                </div>
                
            </div>
    </div></>

    :
            <h1>أنت غير مشترك في أي عرض</h1>
    }
       
        
    </div>
        { sub?.service.nom === "الاشتراك الشامل" ?  <h2>لقد اشتركت في أفضل عرض لدينا</h2>  : <Link to='/subscrib' className='btn_sub'>تطوير الاشتراك</Link> }
   </div>
   <NavBarProfile  interest="اهتماماتي"  services="خدماتي" />
  </div>
</div>
    <Footer/>
   
   </>
  )
}

export default Services