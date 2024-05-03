import React, { useState } from 'react';
import Logo from '../LOGO/Logo';
import Footer from '../Footer/Footer';
import './Validation.css';
import DoneIcon from '@mui/icons-material/Done';

function Validation() {
  const [checkedItems, setCheckedItems] = useState({
    قانون_الأسرة: false,
    قانون_العمل: false,
    القانون_المدني: false,
    القانون_الجنائي: false,
    القانون_الإداري: false,
    القانون_التجاري: false,
    قانون_العقوبات: false
  });

  const [editingMode, setEditingMode] = useState(true);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    if (editingMode) {
      setCheckedItems({
        ...checkedItems,
        [name]: checked
      });
    }
  };

  const handleSubmit = () => {
    if (editingMode) {
      setEditingMode(false);
      console.log("Choix sélectionnés :", checkedItems);
    }
  };

  const handleChangeSubscription = () => {
    setEditingMode(true);
  };

  return (
    <>
      <Logo  />
      <div className='validation_container'>
        <h3>تمت عملية التسجيل بنجاح <DoneIcon sx={{ width: '30px', height: '30px',marginLeft:'5px' }}/></h3>
       
        : اختر المواضيع التي تهتم بها للحصول على كافة المستجدات
        <div className='law_choice'>
          <ul>
            {Object.entries(checkedItems).map(([key, value]) => (
              <li key={key}>
                <label htmlFor={key}>{key}</label>
                <input
                  type='checkbox'
                  id={key}
                  name={key}
                  checked={value}
                  onChange={handleCheckboxChange}
                />
              </li>
            ))}
          </ul>
        </div>
        <button onClick={handleSubmit}>انهاء</button>
      </div>
      <Footer />
    </>
  );
}

export default Validation;
