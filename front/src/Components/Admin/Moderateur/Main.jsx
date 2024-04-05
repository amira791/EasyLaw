import React, { useState } from 'react';
import './Main.css'
import LogoAdmin from '../../LOGO/LogoAdmin'
import TitleBar from '../../TitleBar/TitleBar'
import FooterAdmin from '../../Footer/FooterAdmin'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIosNewSharpIcon from '@mui/icons-material/ArrowBackIosNewSharp';

function Main() {
    
    const [selectedCountry, setSelectedCountry] = useState('');
    const countries = [
      { name: 'Country 1', code: 'C1' },
      { name: 'Country 2', code: 'C2' },
      { name: 'Country 3', code: 'C3' }
    ];
    const [searchInfo, setSearchInfo] = useState([
        {id: 1, text: 'تم البحث عن قانون الممارسات العامة', date: '24/03/2024'},
        {id: 2, text: 'تم البحث عن قانون الممارسات العامة', date: '24/03/2024'},
        {id: 3, text: 'تم البحث عن قانون الممارسات العامة', date: '24/03/2024'},
        {id: 4, text: 'تم البحث عن قانون الممارسات العامة', date: '24/03/2024'},
        {id: 5, text: 'تم البحث عن قانون الممارسات العامة', date: '24/03/2024'},
        {id: 6, text: 'تم البحث عن قانون الممارسات العامة', date: '24/03/2024'},
    ]);
     // Fonction de gestion du changement de sélection dans le select
     const handleCountryChange = (e) => {
        setSelectedCountry(e.target.value); // Mettre à jour le pays sélectionné
    };

    // Filtrer les données en fonction du pays sélectionné
    const filteredCountries = selectedCountry ? countries.filter(country => country.code === selectedCountry) : countries;

    return (
    <>
     <LogoAdmin title="صفحة الاشراف "/>
      <TitleBar title="ادارة المحتوى القانوني"/>
      <div className='moderateur-main-container'>
        <div className='moderateurMain-titre'>
          <h3>كشط و تجميع نصوص قانونية جديدة </h3>
        </div>
        <div className='moderateurMain-section1'>
        <select 
        value={selectedCountry} 
         onChange={(e) => setSelectedCountry(e.target.value)} 
          className="select-filter">
            <option value="" > فرز النتائج على حسب ..... </option>
            {countries.map(country => (
            <option key={country.code} value={country.code}>{country.name}</option>
            ))}
            </select>
          <p> ... البحوثات و عمليات الكشط الخاصة بك</p>
        </div>
        <div className='moderateurMain-section2'>
            {searchInfo.map(info => (
                <div className='moderateurMain-info' key={info.id}>
                    <div className='moderateurMain-btn' >
                        <button className='display-result-btn'>
                            <ArrowBackIosNewSharpIcon sx={{width:'15px',height:'15px',marginRight:'3px'}}/>
                            عرض النتائج
                        </button>
                        <button className='pdf-btn'> 
                            <PictureAsPdfIcon sx={{width:'20px',height:'20px',marginRight:'3px'}}/> 
                            PDF تنزيل
                        </button>
                    </div>
                    <div className='moderateurMain-info-titre'>
                        <p>{info.text}</p>
                        <span>{info.date}</span>
                    </div>
                    <DeleteIcon sx={{width:'10%'}}/>
                </div>
            ))}
            
        </div>
      </div>
      <FooterAdmin/>
    </>
  )
}

export default Main