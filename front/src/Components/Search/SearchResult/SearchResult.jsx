import React, { useState ,useEffect} from 'react';
import './SearchResult.css';
import Logo from '../../LOGO/Logo';
import Gpt from '../GPT/Gpt';
import Footer from '../../Footer/Footer';
import { useLocation } from 'react-router-dom';

function SearchResult() {
  const location = useLocation();
  const [results, setResults] = useState([]);
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
  {results.map(result => (
    <div key={result.id_text} className="searchResult-item">
      <h2>{result.description}</h2>
      <p> {result.type_text}</p>
      <p> {result.signature_date}</p>
      <p> {result.adjustment}</p>
      <div>
        <h3>Ajustements :</h3>
        {result.adjustments.map(adjustment => (
          <div >
            <p> {adjustment.adjustment_type}</p>
            <p> {adjustment.adjustment_type}</p>
          </div>
        ))}
      </div>
    </div>
  ))}
</div>

      
      </div>
      <Footer />
    </>
  );
}

export default SearchResult;
