import React, { useState } from 'react';
import "./Scraping.css";
import LogoAdmin from '../../LOGO/LogoAdmin';
import TitleBar from '../../TitleBar/TitleBar';
import FooterAdmin from '../../Footer/FooterAdmin';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function Scraping() {
  
  const [selectedOption, setSelectedOption] = useState("periodically"); //stocker l'option sélectionnée
  const [frequency, setFrequency] = useState(""); // la fréquence sélectionnée
  const [customDate, setCustomDate] = useState("");// la date personnalisée
  const [selectedUrls, setSelectedUrls] = useState([]);// stocker les URLs sélectionnées
  const [showOptions, setShowOptions] = useState(false);// l'affichage des options
  const [legalText, setLegalText] = useState("");

const handleLegalTextChange = (event) => {
    setLegalText(event.target.value);
  };
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setFrequency("");
  setCustomDate("");
 
  };
  const handleFrequencyChange = (event) => {
    setFrequency(event.target.value);
  };
  const handleCustomDateChange = (event) => {
    setCustomDate(event.target.value);
  };
  const handleUrlChange = (event) => {
    const value = event.target.value;
    if (event.target.checked) {
      setSelectedUrls([...selectedUrls, value]);
    } else {
      setSelectedUrls(selectedUrls.filter(url => url !== value));
    }
  };
  const handleSaveInformation = () => {
    console.log("Selected Option:", selectedOption);
    if (selectedOption === "periodically") {
      console.log("Frequency:", frequency);
    } else {
      console.log("Custom Date:", customDate);
    }
  };
  const handleStartScraping = () => {
    const scrapingData = {
        selectedOption: selectedOption,
        frequency: frequency,
        customDate: customDate,
        selectedUrls: selectedUrls,
        legalText:legalText
      };
    // Envoyer les informations au backend
    console.log(scrapingData);
   
  };
 const handleDisplayOptions = () => {
    setShowOptions(!showOptions);
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
                     <button className='btn-date' onClick={handleSaveInformation}>حفظ المعلومات </button>
                   </div>
              </div>
              <div className='scraping-content'>
                  <h4>ملأ المعلومات الأساسية</h4>
                  <div className='scraping form'>
                    <form >
                      <div className='scraping-info'>
                      <input
                          type="text"
                          id="textjuridique"
                          name="textjuridique"
                          placeholder=' النص القانوني ....'
                          className='scraping-info-item'
                          value={legalText}
                          onChange={handleLegalTextChange}
                          required
                        />
                      </div>
                      <div className='scraping-info'>
                        
                        <div className="display-options" >
                        <div className='titre-url'>
                          <p>حدد الروابط </p> 
                        </div>
                          <ExpandMoreIcon  onClick={handleDisplayOptions} />
                          <i className="fa fa-chevron-down"></i>
                        </div>
                        <div className="checkbox-options" style={{ display: showOptions ? 'block' : 'none' }}>
                          <div>
                            <input
                              type="checkbox"
                              name="url1"
                              value="https://www.futura-sciences.com."
                              onChange={handleUrlChange}
                            />
                            https://www.futura-sciences.com.
                          </div>
                          <div>
                            <input
                              type="checkbox"
                              name="url2"
                              value="https://www.futura-sciences.com."
                              onChange={handleUrlChange}
                            />
                            https://www.futura-sciences.com.
                          </div>
                          <div>
                            <input
                              type="checkbox"
                              name="url3"
                              value="https://www.futura-sciences.com."
                              onChange={handleUrlChange}
                            />
                            https://www.futura-sciences.com.
                          </div>
                          <div>
                            <input
                              type="checkbox"
                              name="url4"
                              value="https://www.futura-sciences.com."
                              onChange={handleUrlChange}
                            />
                            https://www.futura-sciences.com.
                          </div>
                          <div>
                            <input
                              type="checkbox"
                              name="url5"
                              value="https://www.futura-sciences.com."
                              onChange={handleUrlChange}
                            />
                            https://www.futura-sciences.com.
                          </div>
                        </div>
                        
                      </div>
                    </form>
                  </div>
              </div>
          </div>
          <button className='btn-scraping' onClick={handleStartScraping}>بدأ عملية الكشط و البحث </button>
      </div>
      <FooterAdmin/>
    </>
  );
}

export default Scraping;
