import React, { useState } from 'react';
import './ScrapingResult.css';
import FooterAdmin from '../../Footer/FooterAdmin';
import TitleBar from '../../TitleBar/TitleBar';
import LogoAdmin from '../../LOGO/LogoAdmin';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';

import '@react-pdf-viewer/core/lib/styles/index.css';

import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { Link } from 'react-router-dom';

function ScrapingResult() {
  const [showFullText, ] = useState({});
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const [activeButton, setActiveButton] = useState(0); //  le bouton actif

    const handleButtonClick = (index) => {
        setActiveButton(index); // Mettre à jour le bouton actif
    };

    return (
        <>
            <LogoAdmin title="صفحة الاشراف "/>
            <TitleBar title="ادارة المحتوى القانوني"/>
           <div className='display_scrapingRslt'>
            <div className='scraping-result-container'>
                <h2>نتائج  استخراج النصوص القانونية (Scraping)  </h2>
                <div style={{width:'100%',direction:'rtl'}}>
                <select
                   style={{margin:'2%'}}
                   id="year"
                   className='select_item'
                >
                    <option value="">نوع النص</option>
                    <option value="يلغي">يلغي</option>
                     <option value="يلغي">يلغي</option>
                </select>
                </div>
            </div>


            <div >


            <div  className="searchResult-item">
                  <h2>مرسوم ممضي في 25 ديسمبر1975</h2>
                  <p>وزارة الداخلية</p>
                  <p>  الجريدة الرسمية عدد 1 مؤرخة في 02 يناير 1976، الصفحة 3 </p>
                  <p>يتضمن إنهاء مهام مديرين بالمجالس التنفيذية للولايات.</p>
                  <div>
                </div>
                  <Link to="/scrapingupdate" target="_blank" className='detail_Link'>
                      التعديل على النص
                     <EditNoteOutlinedIcon sx={{marginRight:'3%'}}/>
                  </Link>
            </div>

              <div  className="searchResult-item">
                  <h2>مرسوم ممضي في 25 ديسمبر1975</h2>
                  <p>وزارة الداخلية</p>
                  <p>  الجريدة الرسمية عدد 1 مؤرخة في 02 يناير 1976، الصفحة 3 </p>
                  <p>يتضمن إنهاء مهام مديرين بالمجالس التنفيذية للولايات.</p>
                  <div>
                   <div className="adjustment-item">
                    <div>
                      <p style={{ fontWeight: 'bold' }}>hj</p>
                      <div className="adjustment-item1">
                        <h5 style={{ fontWeight: 'bold', color: '#1D8B8C' }}> ممضي في </h5>
                        <p>kj</p>
                        <p>الجريدة الرسمية في </p>
                        <p>jkl</p>
                      </div>
                    </div>
                  </div>
                </div>
                  <Link to="/scrapingupdate" target="_blank" className='detail_Link'>
                      التعديل على النص
                     <EditNoteOutlinedIcon sx={{marginRight:'3%'}}/>
                  </Link>
            </div>


        </div>
        <button  className='notify_user'>اشعار المتابعين</button>
        </div>
            <FooterAdmin/>
        </>
    );
}

export default ScrapingResult;
