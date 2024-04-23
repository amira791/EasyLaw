import React, { useState ,useEffect} from 'react';
import './SearchResult.css';
import Logo from '../../LOGO/Logo';
import Gpt from '../GPT/Gpt';
import Footer from '../../Footer/Footer';
import { useLocation } from 'react-router-dom';

function SearchResult() {
  const location = useLocation();
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 5;
  useEffect(() => {
    if (location.state && location.state.results) {
      setResults(location.state.results);
    }
  }, [location.state]);

 
 
  // États pour les filtres de recherche
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [source, setSource] = useState('');
  const [date, setDate] = useState('');
  const [fileType, setFileType] = useState('');

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = results.slice(indexOfFirstResult, indexOfLastResult);

  // Changement de page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
  function convertirDateEnArabe(dateString) {
    // Convertir la chaîne de date en objet Date
    const date = new Date(dateString);

    // Récupérer les parties de la date
    const jour = date.getDate();
    const mois = date.getMonth() + 1;
    const annee = date.getFullYear();

    // Créer une chaîne de date en arabe
    const moisEnArabe = [
        'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
        'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
    ];
    const moisArabe = moisEnArabe[mois - 1];

    return `${jour} ${moisArabe} ${annee}`;
}



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
  {currentResults.map(result => (
    <div key={result.id_text} className="searchResult-item">
     <h2>
    {result.type_text} {result.jt_number}  ممضي في {convertirDateEnArabe(result.signature_date)}
</h2>
      <p> {result.source}</p>
      <p> الجريدة الرسمية في {convertirDateEnArabe(result.publication_date)}</p>
      <p> {result.description}</p>
      <div>
        {result.adjustments.map(adjustment => (
          <div key={adjustment.adjusting_text.id_text} className="adjustment-item">
            {adjustment.adjusting_text.adjusted_texts.length > 0 && (
     <div>
     <p style={{fontWeight:'bold'}}>{adjustment.adjusting_text.adjusted_texts[0].adjustment_type}</p>
     <div className="adjustment-item1">
     <h5 style={{fontWeight:'bold',color:'#1D8B8C'}}>{adjustment.adjusting_text.type_text} {adjustment.adjusting_text.jt_number} ممضي في {convertirDateEnArabe(adjustment.adjusting_text.signature_date)}</h5>
     
     <p> {adjustment.adjusting_text.source}</p>
      <p> الجريدة الرسمية في {convertirDateEnArabe(adjustment.adjusting_text.publication_date)}</p>
      <p> {adjustment.adjusting_text.description}</p>
      </div>
   </div>
    )}  
          </div>
        ))}
      </div>
    </div>
  ))}
</div>

<div className="pagination">
          <button onClick={() => paginate(1)}>1</button>
          <button onClick={() => paginate(2)}>2</button>
          
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SearchResult;
