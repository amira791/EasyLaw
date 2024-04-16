import React, { useState } from 'react';
import './SearchResult.css';
import Logo from '../../LOGO/Logo';
import Gpt from '../GPT/Gpt';
import Footer from '../../Footer/Footer';

function SearchResult() {
  const searchResults = [
    {
      id: 1,
      title: 'Titre du résultat ',
      description: 'Description du résultat 1',
    },
    {
      id: 2,
      title: 'Titre du résultat 2',
      description: 'Description du résultat 2',
    },
    {
      id: 3,
      title: 'Titre du résultat 3',
      description: 'Description du résultat 3',
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
        <h1>Résultats de la recherche</h1>
        <div className="searchResult-container">
          {searchResults.map(result => (
            <div key={result.id} className="searchResult-item">
              <h2>{result.title}</h2>
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
