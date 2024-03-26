import "./Profile.css"
import React , { useState }from 'react'

function Compte() {

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        DateN: '',
        company: '',
        job: '',
        mail:''
      });

      const [activeList, setNavList] = useState('profile');

      const handleListChange = (newContent) => {
        setNavList( newContent); // Update the active List
      };
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
          ...prevData,
          [name]: value
        }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // Reset form 
        setFormData({
          firstName: '',
          lastName: '',
          DateN: '',
          company: '',
          job: '',
          mail:''
        });
      };
  return (
    <>
    {activeList === 'profile' && (
      <form onSubmit={handleSubmit} className='profile_form'>
        <div className='lign_dv'>
           <div className='lign_dv_info'>
               <label htmlFor="lastName">اللقب</label>
               <input
               className='inpt_lign'
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder='اللقب'
                required/>
           </div>
           <div className='lign_dv_info'>
                <label htmlFor="firstName">الاسم</label>
                <input
                className='inpt_lign'
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder='الاسم'
                required/>
           </div>

        </div>
        <div className='lign_dv'>
           <div className='lign_dv_info'>
               <label htmlFor="lastName">البريد الالكتروني</label>
               <input
               className='inpt_lign'
                type="text"
                id="mail"
                name="mail"
                value={formData.mail}
                onChange={handleChange}
                placeholder='البريد الالكتروني'
                required/>
           </div>
           <div className='lign_dv_info'>
                <label htmlFor="dateN">تاريخ الميلاد</label>
                <input
                className='inpt_lign'
                type="date"
                id="dateN"
                name="DateN"
                value={formData.DateN}
                onChange={handleChange}
                placeholder='تاريخ الميلاد'
                required/>
           </div>

        </div>
        <div className='col_dv'>
            <div className='profile_info'>
                <label htmlFor="company">الشركة / الجامعة </label>
                <input
                className='profile_info_input'
                  type="text"
                  id="company"
                  name="company"
                
                  value={formData.company}
                  onChange={handleChange}
                  placeholder=' الشركة / الجامعة'
                  required
                />
            </div>
            <div className='profile_info'>
                <label htmlFor="job">المهنة</label>
                <select
                id="job"
                name="job"
                className='profile_info_input'
                value={formData.job}
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
    </form>)}
    </>
  )
}

export default Compte