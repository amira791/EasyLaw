import React, { useState } from 'react'
import "./SignUp.css"
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Logo from '../LOGO/Logo';


function SignUp() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    DateN: '',
    company: '',
    job: ''
  });

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
      job: ''
    });
  };
  return (
    <>
    <Logo/>
<div className='signup_titre'>
      <h2> إنشاء حساب</h2>
    </div>
    <div className="signup-form">
      <form onSubmit={handleSubmit}>
        <div className='username_dv'>
        <div className='input-group'>
      <label htmlFor="lastName">اللقب</label>
      <input
        type="text"
        id="lastName"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        placeholder='اللقب'
        required
      />
    </div>
    <div className='input-group'>
      <label htmlFor="firstName">الاسم</label>
      <input
        type="text"
        id="firstName"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        placeholder='الاسم'
        required
      />
    </div>

        </div>
        <div className='username_dv1'>
        <div className='input-group'>
        <label htmlFor="dateN">تاريخ الميلاد</label>
        <input
          type="date"
          id="dateN"
          name="DateN"
          className='user_info SELECT-dv'
          value={formData.DateN}
          onChange={handleChange}
          placeholder='تاريخ الميلاد'
          required
        />
        </div>
        <div className='input-group'>
        <label htmlFor="company">الشركة / الجامعة </label>
        <input
          type="text"
          id="company"
          name="company"
          className='user_info SELECT-dv'
          value={formData.company}
          onChange={handleChange}
          placeholder=' الشركة / الجامعة'
          required
        />
        </div>
        <div className='input-group'>
        <label htmlFor="job">المهنة</label>
        <select
        id="job"
        name="job"
        className='user_info '
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
        <button type="submit">انشاء حساب</button>
        <a className='connection_link'><Link style={{ color: '#484646'}}  to ="/signin">تسجيل الدخول</Link></a>
      </form>
    </div>
    <Footer/>

    </>
  )
}

export default SignUp