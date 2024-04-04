import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Profile.css";

function Compte({ formData = {}, onSubmit }) {
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
      const access_token = localStorage.getItem('access_token');
      await axios.put('http://localhost:8000/user/edit_user_info', editedFormData, {
        headers: {
          Authorization: `Token ${access_token}`
        }
      });
      alert('Les informations ont été mises à jour avec succès !');
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
          Enregistrer
        </button>
      </form>
      <button onClick={() => setEditMode(!editMode)}>
        {editMode ? 'Annuler' : 'Modifier'}
      </button>
    </>
  );
}

export default Compte;
