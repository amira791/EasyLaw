
import LogoAdmin from '../../LOGO/LogoAdmin'
import FooterAdmin from '../../Footer/FooterAdmin'
import Compte from '../../Profile/Compte'
import NavBarProfile from '../../Profile/NavBarProfile'
import React, { useState, useEffect , useContext} from 'react';
import axios from 'axios';
import { AuthContext } from '../../../Context/LogoProvider';


function ProfileAdmin() {
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
        <img alt='photo profile'/>
        <h3>hhh</h3>
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