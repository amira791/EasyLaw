// Remove the import statement for Navigate
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Logo from '../LOGO/Logo';
import "./Profile.css";
import Footer from '../Footer/Footer';
import Compte from './Compte';
import ChangePwd from './ChangePwd';
import Services from './Services';
import Interest from './Interest';
import NavBarProfile from './NavBarProfile';
import useUser from '../../Hooks/useUser';
import { AuthContext } from '../../Context/LogoProvider';
import StarIcon from '@mui/icons-material/Star'; // Importing star icon from Material-UI

function Profile() {
  const [activeList, setNavList] = useState('profile');
  const { updateFormData } = useContext(AuthContext);
  const [initials, setInitials] = useState('');
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    dateNaiss: '',
    occupation: '',
    univer_Entrep: '',
    email: '',
    role: '' 
  });

  const { getUserInfo } = useUser(); // Utilisation de la fonction getUserInfo du hook useUser

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setFormData({
      nom: '',
      prenom: '',
      dateNaiss: '',
      occupation: '',
      univer_Entrep: '',
      email: '',
      role: '' 
    });
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserInfo();
        console.log(userData);

        setFormData({
          dateNaiss: userData.dateNaiss || '',
          email: userData.email || '',
          nom: userData.nom || '',
          occupation: userData.occupation || '',
          prenom: userData.prenom || '',
          univer_Entrep: userData.univer_Entrep || '',
          role: userData.role || '' 
        });

        updateFormData({ nom: userData.nom });

      } catch (error) {
        console.error('Une erreur s\'est produite lors de la récupération des informations de profil :', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const nameInitials = formData.nom ? formData.nom.slice(0, 2).toUpperCase() : '';
    setInitials(nameInitials);
  }, [formData.nom]);

  return (
    <>
      <Logo />
      <div className='profile_container'>
        <div className='profile_name'>
          <div className="user-initials-circle">{initials}</div>
          <h3>
  {formData.nom} {formData.role === 'moderateur' ? <><StarIcon style={{ fontSize: 16 }} /> <div><span>مشرف</span></div></> : null}
</h3>

        </div>
        <div className='profile_content'>
          <Compte formData={formData} onSubmit={handleSubmit} />
          <NavBarProfile interest="اهتماماتي" services="خدماتي" formData={formData} role={formData.role} /> {/* Pass the role as a prop */}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Profile;
