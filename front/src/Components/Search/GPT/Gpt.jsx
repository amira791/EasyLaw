import React, { useContext, useState ,useEffect} from 'react';
import './Gpt.css';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../../Context/LogoProvider';

import usePayment from '../../../Hooks/usePayment';


function Gpt({ currentPage, resultsPerPage }) {
    const [interestDomains, setInterestDomains] = useState([]);
    const [interestDomain, setInterestDomain] = useState('');
    const [types, setTypes] = useState([]); // Declare types and setTypes
    const [sources, setSources] = useState([]); // Declare sources and setSources
    const [type, setType] = useState('');
    const [source, setSource] = useState('');
    const [year, setYear] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState();
    const [years, setYears] = useState([]); 
    const navigate = useNavigate();
    useEffect(() => {
      const fetchOptions = async () => {
          try {
              const response = await axios.get('http://localhost:8000/data_collection/types_sources');
              setTypes(response.data.types);
              setSources(response.data.sources);
          } catch (error) {
              console.error('Error fetching options:', error);
          }
      };

      fetchOptions();

   // Fetch distinct years
   const fetchDistinctYears = async () => {
    try {
      const response = await axios.get('http://localhost:8000/data_collection/distinct_years');
      setYears(response.data.years);
    } catch (error) {
      console.error('Error fetching distinct years:', error);
    }
  };

  fetchDistinctYears();
  const fetchInterestDomains = async () => {
    try {
        const response = await axios.get('http://localhost:8000/data_collection/domaine');
        setInterestDomains(response.data.interest_domains); // Correction ici
    } catch (error) {
        console.error('Error fetching distinct domaines:', error);
    }
};

fetchInterestDomains();
     }, []);
    const handleSearchSubmit = async (e) => {
     e.preventDefault();
     const formattedDate = year ? `${year}` : '';
      const queryParams = {
        q: searchQuery,
        sort_by: sortBy,
        source:source,
        type:type,
        interestDomain: interestDomain,
        year:formattedDate,
        page: currentPage, 
       
      };
  
      try {
        console.log(queryParams)
        const response = await axios.get(
          `http://localhost:8000/data_collection/index_page`,
          {
            headers: { 'Authorization': `Token ${localStorage.getItem('access_token')}` },
            params: queryParams
          }
        );
        console.log('Recherche soumise avec la requête :', searchQuery);
        console.log('Résultats de la recherche:', response.data);
        navigate('/searchresult', { state: { results: response.data.results, len: response.data.len } });
      } catch (error) {
        if (error.response?.status === 403) {
          console.error('You are not allowed to search.');
          navigate("/subscrib")
        }
        console.error('Erreur lors de la recherche:', error);
      }
    };
  
    const handleSortBy = async (sortByValue) => {
      setSortBy(sortByValue);
      // Rechercher automatiquement lorsqu'un mode de tri est sélectionné
      
    };
  
   
  return (
    <div className='gpt_dv'>
      <div className='gpt_logo'>
        
          <img className="icon_gpt" src="./images/gpt.png" alt="Logo GPT" />
       
      </div>
      <div className='gpt_search'>
       
        <form className="search-form" onSubmit={handleSearchSubmit}>
          <div className='display_form'>
          <input
            type="text"
            className="form-control"
            placeholder="ابحث عن النص القانوني . . . "
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <SearchIcon className="search-icon" />
           <button type="submit" className="btn btn-primary"> البحث</button>
          
          </div>
          <div className="radio-buttons">
            <label>
            بالصلة
              <input
                type="radio"
                name="sortBy"
                value="relevance"
                checked={sortBy === 'relevance'}
                onChange={() => handleSortBy('relevance')}
              />
              
            </label>
            <label>
            بتاريخ النشر
              <input
                type="radio"
                name="sortBy"
                value="publication_date"
                checked={sortBy === 'publication_date'}
                onChange={() => handleSortBy('publication_date')}
              />
              
            </label>
          </div>
        </form>
        
        <div className='search_filter'>
          
         
        <select
            id="year"
            name="year"
            className='select_item'
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            <option value="">السنة</option>
            {years.map((yearOption) => (
              <option key={yearOption} value={yearOption}>{yearOption}</option>
            ))}
        </select>
         <select
              id="source"
              name="source"
              className='select_item'
              value={source}
              onChange={(e) => setSource(e.target.value)}
          >
              <option value="">المصدر</option>
              {sources.map((sourceOption) => (
                  <option key={sourceOption} value={sourceOption}>{sourceOption}</option>
              ))}
          </select>
          <select
                  id="category"
                  name="category"
                  className='select_item'
                  value={type}
                  onChange={(e) => setType(e.target.value)}
              >
                  <option value="">نوع</option>
                  {types.map((typeOption) => (
                      <option key={typeOption} value={typeOption}>{typeOption}</option>
                  ))}
            </select>
            <select
                    id="interestDomains"
                    name="interestDomains"
                    className='select_item'
                    value={interestDomain} // Changez ici
                    onChange={(e) => setInterestDomain(e.target.value)} // Et ici
                    >
                    <option value="">المجال</option>
                    {interestDomains.map((domainOption) => (
                        <option key={domainOption} value={domainOption}>{domainOption}</option>
                    ))}
                    </select>
        </div>
      </div>
    </div>
  );
}

export default Gpt;
