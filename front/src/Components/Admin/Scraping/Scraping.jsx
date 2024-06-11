import React, { useState } from 'react';
import "./Scraping.css";
import LogoAdmin from '../../LOGO/LogoAdmin';
import TitleBar from '../../TitleBar/TitleBar';
import FooterAdmin from '../../Footer/FooterAdmin';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useScrapping from '../../../Hooks/useScrapping';
import { useNavigate } from 'react-router-dom';
function Scraping() {
  const  {  results , errorMessage , loading , startScrapping , recentScrapping } = useScrapping() 
  const [selectedOption, setSelectedOption] = useState("periodically"); //stocker l'option sélectionnée
  const [frequency, setFrequency] = useState(""); // la fréquence sélectionnée
  const [customDate, setCustomDate] = useState("");// la date personnalisée
  const [selectedUrls, setSelectedUrls] = useState([]);// stocker les URLs sélectionnées
  const [showOptions, setShowOptions] = useState(false);// l'affichage des options
  const [showOptions2, setShowOptions2] = useState(false);// l'affichage des options
  const [legalText, setLegalText] = useState([]);
  const navigate = useNavigate();

const handleLegalTextChange = (event) => {
    const value = event.target.value;
    if (event.target.checked) {
      setLegalText([...legalText, value]);
    } else {
      setLegalText(legalText.filter(url => url !== value));
    }
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
    if( legalText.length > 0 && selectedUrls.length >0  ) {

      startScrapping() 


    }
    console.log(scrapingData);

   
  };
 const handleDisplayOptions = () => {
    setShowOptions(!showOptions);
  };
  const handleDisplayOptions2 = () => {
    setShowOptions2(!showOptions2);
  };
  const urlOptions = [
    { name: "url1", url: "joradp.dz/HAR/Index.htm" }
  ];
  const urlOptions2 = [
    { name: "نصوص قانونية ", url: "joradp.dz/HAR/Index.htm" }   
  ];

  const frequencyOptions = [
    { label: "يوميا", value: "daily" },
    { label: "أسبوعيا", value: "weekly" },
    { label: "شهريا", value: "monthly" }
  ];

  const handleShowResults = () => {
    navigate('/scrapingresult', { state: { results: results }});
  }

  return (
    <>
      <LogoAdmin title="صفحة الاشراف "/>
      <TitleBar title="ادارة المحتوى القانوني"/>
      <div className='scraping-container'>
          <h2>(Scraping) تجميع النصوص القانونية </h2>
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
                      {frequencyOptions.map((option, index) => (
                        <li key={index}>
                          <label>
                            {option.label}
                           <input 
                             type='radio'
                             name='frequency'
                             value={option.value}
                             checked={frequency === option.value}
                             onChange={handleFrequencyChange}
                             disabled={selectedOption !== "periodically"}
                           />
                         </label>
                       </li>
                     ))}
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
                        
                        <div className="display-options" >
                        <div className='titre-url'>
                          <p> النص القانوني .... </p> 
                        </div>
                          <ExpandMoreIcon  onClick={handleDisplayOptions2} />
                          <i className="fa fa-chevron-down"></i>
                        </div>
                        <div className="checkbox-options" style={{ display: showOptions2 ? 'block' : 'none' }}>
                            {urlOptions2.map((legalText, index) => (
                              <div key={index}>
                                <input
                              type="checkbox"
                              name={legalText.name}
                              value={legalText.name}
                              onChange={handleLegalTextChange}
                            />
                            {legalText.name}
                          </div>
                        ))}
                        </div>
                        
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
                            {urlOptions.map((option, index) => (
                              <div key={index}>
                                <input
                              type="checkbox"
                              name={option.name}
                              value={option.url}
                              onChange={handleUrlChange}
                            />
                            {option.url}
                          </div>
                        ))}
                        </div>
                        
                      </div>
                    </form>
                  </div>
              </div>
          </div>
          {Object.keys(recentScrapping).length > 0 && (
            <div className="scrapping-container">
                <div className={`scrapping-item ${recentScrapping.state === 'loading'? 'loading-gif':recentScrapping.state}`}>
                    <p>Date: {recentScrapping.date}</p>
                    <p>Status: {recentScrapping.state}</p>
                </div>
            </div>
          )}
          <div className='scraping-btn-container'>
            <button className='btn-scraping' onClick={handleStartScraping}>بدأ عملية البحث </button>
            {recentScrapping.state === 'success' && (
              <button
                className='btn-scraping'
                onClick={handleShowResults}
              >
                عرض النتائج
              </button>
            )}

          </div>
      </div>
      <FooterAdmin/>
    </>
  );
}

export default Scraping;
