import React, { useState } from 'react';
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
    { id: 4, name: 'قانون الجمارك' },
    { id: 5, name: 'قانون الصفقات العمومية'},
    { id: 6, name: 'قانون الجنايات' },
    { id: 7, name: 'قانون العقوبات' },
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

  return (
    <>
      <Logo />
      <NavBar />
      <Gpt />
      <div className='law-display'>
      <div className='Law-container'>
          {currentItems.map((law) => (
            <Link to={`/LawDetails/${law.id}`} key={law.id} className='law-item'>
              <p>{law.name}</p>
            </Link>
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
