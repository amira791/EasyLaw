import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Law.css';
import Logo from '../LOGO/Logo';
import NavBar from '../MainPage/NavBar/NavBar';
import Gpt from '../Search/GPT/Gpt';
import Footer from '../Footer/Footer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Link } from 'react-router-dom';

function Law() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const lawData = [
    { id: 1, name: 'قانون العقوبات' },
    { id: 2, name: 'قانون الجمارك' },
    { id: 3, name: 'قانون البحري' },
    { id: 4, name: 'قانون العدل الوزاري' },
    { id: 5, name: 'قانون الصفقات العمومية'},
    { id: 6, name: 'قانون الجنايات' },
    { id: 8, name: 'قانون التجارة' }, 
  ];
 

  // Calculer l'indice de début et de fin de la page actuelle
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = lawData.slice(indexOfFirstItem, indexOfLastItem);

  // Changer de page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Fonction pour changer de page lorsque vous cliquez sur l'icône gauche
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  // Fonction pour changer de page lorsque vous cliquez sur l'icône droite
  const goToNextPage = () => {
    if (currentPage < Math.ceil(lawData.length / itemsPerPage)) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };


  const [types, setTypes] = useState([]);
  const [sources, setSources] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState();
  const [searching_way, setSearching_way] = useState("multi_match");
  const [years, setYears] = useState([]);
  const [year, setYear] = useState('');
  const [domain, setDomain] = useState(''); // Added domain state for future filtering
  const [type, setType] = useState(''); // Added type state for future filtering
  const [source, setSource] = useState(''); // Added source state for future filtering
  const [errorMessage, setErrorMessage] = useState(''); // Added error message state
  const navigate = useNavigate();

  const handleSearchSubmit = async (keyWord) => {
   // e.preventDefault();
    const formattedDate = year ? `${year}` : '';
    const queryParams = {
      q: keyWord,
      sort_by: "publication_date",
      source,
      type,
      domain, // Added domain for future filtering
      year: formattedDate,
      searching_way:searching_way
    };

    console.log(queryParams);
    try {
      const response = await axios.get(
        `http://localhost:8000/data_collection/index_page`,
        {
          headers: { 'Authorization': `Token ${localStorage.getItem('access_token')}` },
          params: queryParams,
        }
      );
      console.log('Recherche soumise avec la requête :', searchQuery);
      console.log('Résultats de la recherche:', response.data);
      navigate('/searchresult', { state: { results: response.data.results, len: response.data.len } });
    } catch (error) {
      if (error.response?.status === 403) {
        console.error('You are not allowed to search.');
        navigate("/subscrib");
      } else {
        console.error('Erreur lors de la recherche:', error);
        setErrorMessage('An error occurred while performing the search'); // Set user-friendly error message
      }
    }
  };
  const handleClick =(param)=>{
    setSearchQuery(param);
    console.log(searchQuery);
  }


  return (
    <>
      <Logo />
      <NavBar />
      <Gpt />
      <div className='law-display'>
      <div className='Law-container'>
          {currentItems.map((law) => (
            <div className='law-item' onClick={()=>{handleSearchSubmit(law.name);}} >{law.name}</div>
            
          ))}
        </div>

        
        <div className='pagination'>
        <ChevronLeftIcon onClick={goToPreviousPage} sx={{color:'#045253',width:"40px",height:'40px'}} />
        {Array.from({ length: Math.ceil(lawData.length / itemsPerPage) }, (_, i) => (
          <button key={i} onClick={() => paginate(i + 1)} className={currentPage === i + 1 ? 'active' : ''}>
            {i + 1}
          </button>
        ))}
        <ChevronRightIcon onClick={goToNextPage} sx={{color:'#045253',width:"40px",height:'40px'}} />
      </div>
      </div>
     
      <Footer />
    </>
  );
}

export default Law;
