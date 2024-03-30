import React, { useState } from 'react';
import "./Scraping.css";
import LogoAdmin from '../../LOGO/LogoAdmin';
import TitleBar from '../../TitleBar/TitleBar';
import FooterAdmin from '../../Footer/FooterAdmin';

function Scraping() {
  // State pour stocker l'option sélectionnée
  const [selectedOption, setSelectedOption] = useState("periodically");

  // State pour stocker la fréquence sélectionnée
  const [frequency, setFrequency] = useState("");

  // State pour stocker la date personnalisée
  const [customDate, setCustomDate] = useState("");

  // Gestionnaire d'événements pour le changement d'option
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // Gestionnaire d'événements pour la sélection de la fréquence
  const handleFrequencyChange = (event) => {
    setFrequency(event.target.value);
  };

  // Gestionnaire d'événements pour le changement de la date personnalisée
  const handleCustomDateChange = (event) => {
    setCustomDate(event.target.value);
  };

  // Gestionnaire d'événements pour le bouton "Submit"
  const handleSubmit = () => {
    // Envoyer les informations au backend ou effectuer d'autres actions
    console.log("Selected Option:", selectedOption);
    if (selectedOption === "periodically") {
      console.log("Frequency:", frequency);
    } else {
      console.log("Custom Date:", customDate);
    }
  };

  return (
    <>
      <LogoAdmin title="صفحة الاشراف "/>
      <TitleBar title="ادارة المحتوى القانوني"/>
      <div className='scraping-container'>
          <h2>(Scraping) كشط النصوص القانونية </h2>
          <div className='scraping-plan'>
              <div className='scraping-time'>
                  <h4>التخطيط الزمني </h4>
                  <div className='scraping-option'>
                      <label>
                        تنفيذ العملية دوريا
                        <input 
                          type='radio'
                          name='operationType'
                          value='periodically'
                          checked={selectedOption === "periodically"}
                          onChange={handleOptionChange}
                        />
                      </label>
                     
                   </div>
                   <div className='scraping-frequency'>
                     <ul>
                        <li>
                            <label>
                              يوميا
                              <input 
                                type='radio'
                                name='frequency'
                                value='daily'
                                checked={frequency === "daily"}
                                onChange={handleFrequencyChange}
                                disabled={selectedOption !== "periodically"}
                              />
                            </label>
                        </li>
                        <li>
                            <label>
                              أسبوعيا
                              <input 
                                type='radio'
                                name='frequency'
                                value='weekly'
                                checked={frequency === "weekly"}
                                onChange={handleFrequencyChange}
                                disabled={selectedOption !== "periodically"}
                              />
                            </label>
                        </li>
                        <li>
                            <label>
                              شهريا
                              <input 
                                type='radio'
                                name='frequency'
                                value='monthly'
                                checked={frequency === "monthly"}
                                onChange={handleFrequencyChange}
                                disabled={selectedOption !== "periodically"}
                              />
                            </label>
                        </li>
                     </ul>
                   </div>
                   <div className='date-choice'>
                   <label>
                        تحديد تاريخ للعملية
                        <input 
                          type='radio'
                          name='operationType'
                          value='custom'
                          checked={selectedOption === "custom"}
                          onChange={handleOptionChange}
                        />
                      </label>
                     <input
                       className='date_choice_input'
                       type="date"
                       id="date"
                       name="date"
                       value={customDate}
                       onChange={handleCustomDateChange}
                       disabled={selectedOption !== "custom"}
                       required
                     />
                   </div>
                   <div className='btn-dv-scraping'>
                     <button className='btn-date' onClick={handleSubmit}>حفظ المعلومات </button>
                   </div>
              </div>
              <div className='scraping-content'>
                  <h4>ملأ المعلومات الأساسية</h4>
                  <div>
                    
                  </div>
              </div>
          </div>
          <button className='btn-scraping'>بدأ عملية الكشط و البحث </button>
      </div>
      <FooterAdmin/>
    </>
  );
}

export default Scraping;
