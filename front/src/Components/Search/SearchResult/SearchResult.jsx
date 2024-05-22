import React, { useState, useEffect } from 'react';
import './SearchResult.css';
import Logo from '../../LOGO/Logo';
import Gpt from '../GPT/Gpt';
import Footer from '../../Footer/Footer';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import SearchC from '../SearchC/SearchC';

function SearchResult() {
  const location = useLocation();
  const [results, setResults] = useState([]);
  const [results_len, setResults_len] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 5;

  useEffect(() => {
    if (location.state && location.state.results) {
      setResults(location.state.results);
      setResults_len(location.state.len);
    }
  }, [location.state]);

  const totalPages = Math.ceil(results_len / resultsPerPage);

 const paginate = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) {
      return;
    }
    setCurrentPage(pageNumber); // Update the current page state
  };

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = results.slice(indexOfFirstResult, indexOfLastResult);

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisibleButtons = 5; // Nombre maximal de boutons visibles
  
    // Calculer le début et la fin de la plage de boutons en fonction de la page courante
    let startPage = currentPage - Math.floor(maxVisibleButtons / 2);
    startPage = Math.max(startPage, 1); // Assurer que startPage est au moins égal à 1
  
    let endPage = startPage + maxVisibleButtons - 1;
    endPage = Math.min(endPage, totalPages); // Assurer que endPage n'excède pas le nombre total de pages
  
    // Ajouter le bouton "Première page" si la plage ne commence pas à 1
    if (startPage > 1) {
      buttons.push(
        <button key={1} onClick={() => paginate(1)}>
          1
        </button>
      );
      if (startPage > 2) {
        // Ajouter "..." si la plage commence après la première page
        buttons.push(<span key="ellipsis-start">...</span>);
      }
    }
  
    // Ajouter les boutons de la plage visible
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => paginate(i)}
          className={currentPage === i ? 'active' : ''}
        >
          {i}
        </button>
      );
    }
  
    // Ajouter le bouton "Dernière page" si la plage ne se termine pas à la dernière page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        // Ajouter "..." si la plage se termine avant la dernière page
        buttons.push(<span key="ellipsis-end">...</span>);
      }
      buttons.push(
        <button key={totalPages} onClick={() => paginate(totalPages)}>
          {totalPages}
        </button>
      );
    }
  
    return buttons;
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
      <Gpt  currentPage={currentPage} resultsPerPage={resultsPerPage}/>
      <div className='searchResult'>
        <h1>نتائج البحث</h1>
        <div className="searchResult-container">
          <p  className="rslt_text" >{results.length} نتيجة</p>
          {currentResults.map(result => (
            <SearchC key={result.id_text} result={result} />
           
          ))}
        </div>

        <div className="pagination">
          {renderPaginationButtons()}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SearchResult;
