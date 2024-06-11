import React, { useEffect, useState } from 'react';
import './Main.css'
import LogoModerateur from '../../LOGO/LogoModerateur'
import TitleBar from '../../TitleBar/TitleBar'
import FooterAdmin from '../../Footer/FooterAdmin'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIosNewSharpIcon from '@mui/icons-material/ArrowBackIosNewSharp';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Main() {
    
    const navigate = useNavigate();
    const [selectedCountry, setSelectedCountry] = useState('');
    const countries = [
      { name: 'Country 1', code: 'C1' },
      { name: 'Country 2', code: 'C2' },
      { name: 'Country 3', code: 'C3' }
    ];
    const [searchInfo, setSearchInfo] = useState([]);
     // Fonction de gestion du changement de sélection dans le select
     const handleCountryChange = (e) => {
        setSelectedCountry(e.target.value); // Mettre à jour le pays sélectionné
    };

    // Filtrer les données en fonction du pays sélectionné
    const filteredCountries = selectedCountry ? countries.filter(country => country.code === selectedCountry) : countries;

    useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await axios.get(`http://localhost:8000/data_collection/scrappings/`, 
              {
                headers: { 'Authorization': `Token ${localStorage.getItem('access_token')}` },
              }
              );
              setSearchInfo(response.data);
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      };

      fetchData();
  }, []); // Empty dependency array to ensure fetching data only once on component mount

  const handleShowResults = (scraping) => {
    navigate('/scrapingresult', { state: { results: scraping }});
  }



    return (
    <>
     <LogoModerateur title="صفحة الاشراف "/>
      <TitleBar title="ادارة المحتوى القانوني"/>
      <div className='moderateur-main-container'>
        <div className='moderateurMain-titre'>
          <h3> تجميع نصوص قانونية جديدة </h3>
        </div>
        <div className='moderateurMain-section1'>
          <div className='scraping-nav-button' onClick={() => navigate("/scraping")} >
          <ArrowBackIosNewSharpIcon sx={{width:'15px',height:'15px',marginRight:'3px'}}/>
            الانتقال الى صفحة تجميع النصوص
          </div>
          <p> ... البحوثات و عمليات الاستخرا الخاصة بك</p>
        </div>
        <div className='moderateurMain-section2'>
        {searchInfo.map(info => (
    <div className='moderateurMain-info' key={info.id}>
        <div className='moderateurMain-btn' >
            {info.state === 'success' ? ( // Condition pour activer le bouton uniquement si le statut est 'success'
                <button 
                    onClick={() => {
                        handleShowResults(info)
                    }} className='display-result-btn'>
                    <ArrowBackIosNewSharpIcon sx={{width:'15px',height:'15px',marginRight:'3px'}}/>
                    عرض النتائج
                </button>
            ) : (
                <button disabled className='display-result-btn'>
                    <ArrowBackIosNewSharpIcon sx={{width:'15px',height:'15px',marginRight:'3px'}}/>
                    عرض النتائج
                </button>
            )}
        </div>
        <div className='moderateurMain-info-titre'>
            <p>{info.state}</p>
            <span>{info.date}</span>
        </div>
        <DeleteIcon sx={{width:'10%'}}/>
    </div>
))}
            {
              (searchInfo.length === 0) && <p>لا يوجد بيانات</p>
            }
            
        </div>
      </div>
      <FooterAdmin/>
    </>
  )
}

export default Main