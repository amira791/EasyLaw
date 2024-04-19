import React, { useState } from 'react';
import './SearchResult.css';
import Logo from '../../LOGO/Logo';
import Gpt from '../GPT/Gpt';
import Footer from '../../Footer/Footer';

function SearchResult() {
  const searchResults = [
    {
      id: 1,
      title: 'مرسوم رقم 74-264 ممضي في 31 ديسمبر 1974 ',
      Ministère:"وزارة الداخلية",
      journal:"الجريدة الرسمية عدد 1 مؤرخة في 03 يناير 1975، الصفحة 4",
      description:'يتضمن تعديل المرسوم رقم 68-414 المؤرخ في 16 ربيع الأول عام 1388 الموافق 12 يونيو سنة 1968 والمرسوم                  رقم 74-264 المؤرخ في 17 ذي الحجة عام 1394 الموافق 13 ديسمبر سنة 1974 والمتضمن تحديد سعر البيع   لمنتجات البترول.',
    },
    {
      id: 2,
      title: 'مرسوم رقم 74-264 ممضي في 31 ديسمبر 1974',
      Ministère:"وزارة الصناعة والطاقة",
      journal:"الجريدة الرسمية عدد 1 مؤرخة في 03 يناير 1975، الصفحة 4",
      description:'يتضمن تعديل المرسوم رقم 68-414 المؤرخ في 16 ربيع الأول عام 1388 الموافق 12 يونيو سنة 1968 والمرسوم                  رقم 74-264 المؤرخ في 17 ذي الحجة عام 1394 الموافق 13 ديسمبر سنة 1974 والمتضمن تحديد سعر البيع   لمنتجات البترول.',
    },
    {
      id: 3,
      title: 'مرسوم رقم 74-264 ممضي في 31 ديسمبر 1974',
      Ministère:"وزارة الصناعة والطاقة",
      journal:"الجريدة الرسمية عدد 1 مؤرخة في 03 يناير 1975، الصفحة 4",
      description:'يتضمن تعديل المرسوم رقم 68-414 المؤرخ في 16 ربيع الأول عام 1388 الموافق 12 يونيو سنة 1968 والمرسوم                  رقم 74-264 المؤرخ في 17 ذي الحجة عام 1394 الموافق 13 ديسمبر سنة 1974 والمتضمن تحديد سعر البيع   لمنتجات البترول.',
    },
  ];

  // États pour les filtres de recherche
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [source, setSource] = useState('');
  const [date, setDate] = useState('');
  const [fileType, setFileType] = useState('');

  // Fonction de soumission du formulaire de recherche
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Effectuer la recherche ici avec les valeurs des états
    console.log('Recherche soumise avec la requête :', searchQuery);
    // Mettre en place la logique de recherche et d'affichage des résultats
  };

  // Fonctions de gestion des changements dans les champs de recherche
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSourceChange = (e) => {
    setSource(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleFileTypeChange = (e) => {
    setFileType(e.target.value);
  };

  return (
    <>
      <Logo />
      <Gpt
        handleSubmit={handleSearchSubmit}
        searchQuery={searchQuery}
        category={category}
        source={source}
        date={date}
        fileType={fileType}
        handleInputChange={handleInputChange}
        handleCategoryChange={handleCategoryChange}
        handleSourceChange={handleSourceChange}
        handleDateChange={handleDateChange}
        handleFileTypeChange={handleFileTypeChange}
      />
      <div className='searchResult'>
        <h1>نتائج  البحث   </h1>
        <div className="searchResult-container">
          {searchResults.map(result => (
            <div key={result.id} className="searchResult-item">
              <h2>{result.title}</h2>
              <p>{result.Ministère}</p>
              <p>{result.journal}</p>
              <p>{result.description}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SearchResult;
