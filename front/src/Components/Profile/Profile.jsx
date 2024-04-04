
import Logo from '../LOGO/Logo'
import "./Profile.css"
import Footer from '../Footer/Footer'

import Compte from './Compte';
import ChangePwd from './ChangePwd';
import Services from './Services';
import Interest from './Interest'
import NavBarProfile from './NavBarProfile';
import React, { useState, useEffect , useContext} from 'react';
import axios from 'axios';
import { AuthContext } from '../LogoProvider';


function Profile() {
  
      const [activeList, setNavList] = useState('profile');
      const { updateFormData } = useContext(AuthContext);
      const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        dateNaiss: '',
        occupation: '',
        univer_Entrep: '',
        email:''
      });
      //const [isAuth, setIsAuth] = useState(false);
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // Reset form 
        setFormData({
          nom: '',
          prenom: '',
          dateNaiss: '',
          occupation: '',
          univer_Entrep: '',
          email:''
        });
      };
      useEffect(() => {
        const fetchUserData = async () => {
            try {
                const access_token = localStorage.getItem('access_token');
               
               console.log(access_token)
                if (!access_token) {
                    throw new Error('Token not found in localStorage');
                }
                
                const response = await axios.get('http://localhost:8000/user/get_user_info', {
                    headers: {
                        Authorization: `token ${access_token}`
                    }
                });
                console.log(true)
                const userData = response.data;
                console.log(userData);
                setFormData({
                    dateNaiss: userData.dateNaiss || '',
                    email: userData.email || '',
                    nom: userData.nom || '',
                    occupation: userData.occupation || '',
                    prenom: userData.prenom || '',
                    univer_Entrep: userData.univer_Entrep || '',
                });
              //  setIsAuth(true);
              updateFormData({ nom: userData.nom });
            } catch (error) {
                console.error('Une erreur s\'est produite lors de la récupération des informations de profil :', error);
               // setIsAuth(false); 
            }
        };
        console.log(formData)
        fetchUserData();
    }, []);
   

  return (
    <>
    <Logo formData={formData}  />
<div className='profile_container'>
    <div className='profile_name'>
        <img alt='photo profile'/>
        <h3>{formData.nom}</h3>
    </div>
    <div className='profile_content'>
      <Compte formData={formData} onSubmit={handleSubmit}/>
    <NavBarProfile formData={formData}/>
  </div>
</div>
    <Footer/>
    </>
  )
}

export default Profile