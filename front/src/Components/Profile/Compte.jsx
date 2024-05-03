import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Profile.css";
import  useUser  from '../../Hooks/useUser';

function Compte({ formData = {}, onSubmit }) {
  const { editUserInfo } = useUser();// Utilisez la fonction editUserInfo du hook useUser
  const [editMode, setEditMode] = useState(false);
  const [editedFormData, setEditedFormData] = useState(formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedFormData({
      ...editedFormData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await editUserInfo(editedFormData); // Utilisez la fonction editUserInfo pour mettre à jour les informations de l'utilisateur
      setEditMode(false);
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la mise à jour des informations de profil :', error);
    }
  };

  useEffect(() => {
    setEditedFormData(formData);
  }, [formData]);

  return (
    <>
    <div className='compte_user'>
      <form className='profile_form' onSubmit={handleSubmit}>
        <div className='lign_dv'>
          <div className='lign_dv_info'>
            <label htmlFor="nom">اللقب</label>
            <input
              className='inpt_lign'
              type="text"
              id="nom"
              name="nom"
              value={editedFormData.nom || ''}
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
              value={editedFormData.prenom || ''}
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
              value={editedFormData.email}
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
              value={editedFormData.dateNaiss}
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
              value={editedFormData.univer_Entrep || ''}
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
              value={editedFormData.occupation || ''}
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
      <button className='edit_button' onClick={() => setEditMode(!editMode)}>
        {editMode ? 'الغاء' : '  تغيير المعلومات    '}
      </button>
      </div>
    </>
  );
}

export default Compte;
