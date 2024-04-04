import "./Profile.css"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Compte({ formData, onSubmit }) {
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
          Authorization: `token ${access_token}`
        }
      });
      alert('Les informations ont été mises à jour avec succès !');
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la mise à jour des informations de profil :', error);
    }
  };

  return (
    <>
   
      <form  className='profile_form' onSubmit={handleSubmit}>
        <div className='lign_dv'>
           <div className='lign_dv_info'>
               <label htmlFor="nom">اللقب</label>
               <input
               className='inpt_lign'
                type="text"
                id="nom"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                placeholder='اللقب'
                required/>
           </div>
           <div className='lign_dv_info'>
                <label htmlFor="prenom">الاسم</label>
                <input
                className='inpt_lign'
                type="text"
                id="prenom"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                placeholder='الاسم'
                required/>
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
                required/>
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
                required/>
           </div>

        </div>
        <div className='col_dv'>
            <div className='profile_info'>
                <label htmlFor="univer_Entrep">الشركة / الجامعة </label>
                <input
                className='profile_info_input'
                  type="text"
                  id="univer_Entrep"
                  name="univer_Entrep"
                
                  value={formData.univer_Entrep}
                  onChange={handleChange}
                  placeholder=' الشركة / الجامعة'
                  required
                />
            </div>
            <div className='profile_info'>
                <label htmlFor="occupation">المهنة</label>
                <select
                id="occupation"
                name="occupation"
                className='profile_info_input'
                value={formData.occupation}
                onChange={handleChange}
                required
                >
                  <option value="">اختر المهنة</option>
                  <option value="طالب">طالب</option>
                  <option value="موظف">موظف</option>
                  <option value="مهندس">مهندس</option>
                </select>
            </div>
         </div>
         <button className='save_info' type="submit"> حفظ المعلومات</button>
    </form>
    </>
  )
}

export default Compte