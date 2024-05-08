
import LogoAdmin from '../../LOGO/LogoAdmin'
import FooterAdmin from '../../Footer/FooterAdmin'
import Compte from '../../Profile/Compte'
import NavBarProfile from '../../Profile/NavBarProfile'
import React, { useState, useEffect , useContext} from 'react';
import axios from 'axios';
import { AuthContext } from '../../../Context/LogoProvider';
import useUser from '../../../Hooks/useUser';


function ProfileAdmin() {
  const [activeList, setNavList] = useState('profile');
  const { updateFormData } = useContext(AuthContext);
  const [initials, setInitials] = useState('');
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    dateNaiss: '',
    occupation: '',
    univer_Entrep: '',
    email: ''
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
      email: ''
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
    const [editMode, setEditMode] = useState(false);
    const [editedFormData, setEditedFormData] = useState();
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setEditedFormData({
        ...editedFormData,
        [name]: value
      });
    };
  
    

  return (
    <>
    <LogoAdmin/>
    <div className='profile_container'>
    <div className='profile_name'>
    <div className="user-initials-circle"> {initials}</div>
        <h3>{formData.nom}</h3>
    </div>
    <div className='profile_content'>
    <form className='profile_form' onSubmit={handleSubmit}>
        <div className='lign_dv'>
          <div className='lign_dv_info'>
            <label htmlFor="nom">اللقب</label>
            <input
              className='inpt_lign'
              type="text"
              id="nom"
              name="nom"
              value={formData.nom }
              onChange={handleChange}
              placeholder='اللقب'
              required
              disabled={!editMode}
            />
          </div>
          
          <div className='lign_dv_info'>
            <label htmlFor="prenom">الاسم</label>
            <input
              className='inpt_lign'
              type="text"
              id="prenom"
              name="prenom"
              value={formData.prenom || ''}
              onChange={handleChange}
              placeholder='الاسم'
              required
              disabled={!editMode}
            />
          </div>
        </div>
        <div className='lign_dv'>
          <div className='lign_dv_info'>
            <label htmlFor="email">البريد الالكتروني</label>
            <input
              className='inpt_lign'
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder='البريد الالكتروني'
              required
              disabled={!editMode}
            />
          </div>
          <div className='lign_dv_info'>
            <label htmlFor="dateNaiss">تاريخ الميلاد</label>
            <input
              className='inpt_lign'
              type="date"
              id="dateNaiss"
              name="dateNaiss"
              value={formData.dateNaiss}
              onChange={handleChange}
              placeholder='تاريخ الميلاد'
              required
              disabled={!editMode}
            />
          </div>
        </div>
        
        <div className='col_dv'>
          <div className='profile_info'>
            <label htmlFor="univer_Entrep">الشركة / الجامعة</label>
            <input
              className='profile_info_input'
              type="text"
              id="univer_Entrep"
              name="univer_Entrep"
              value={formData.univer_Entrep || ''}
              onChange={handleChange}
              placeholder='الشركة / الجامعة'
              required
              disabled={!editMode}
            />
          </div>
          <div className='profile_info'>
            <label htmlFor="occupation">المهنة</label>
            <select
              id="occupation"
              name="occupation"
              className='profile_info_input'
              value={formData.occupation || ''}
              onChange={handleChange}
              required
              disabled={!editMode}
            >
              <option value="">اختر المهنة</option>
              <option value="طالب">طالب</option>
              <option value="موظف">موظف</option>
              <option value="مهندس">مهندس</option>
            </select>
          </div>
        </div>
        <button className='save_info' type="submit" disabled={!editMode}>
        حفظ المعلومات
        </button>
      </form>
      <button onClick={() => setEditMode(!editMode)}>
        {editMode ? 'Annuler' : 'Modifier'}
      </button>
    <NavBarProfile/>
  </div>
    <FooterAdmin/>
    </div>
    </>
    
  )
}

export default ProfileAdmin