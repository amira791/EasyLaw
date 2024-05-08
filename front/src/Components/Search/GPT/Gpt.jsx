import React, { useContext, useState ,useEffect} from 'react';
import './Gpt.css';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../../Context/LogoProvider';

import usePayment from '../../../Hooks/usePayment';


function Gpt({ currentPage, resultsPerPage }) {
 /* const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [source, setSource] = useState('');
  const [date, setDate] = useState('');
  const [fileType, setFileType] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    console.log('Recherche soumise avec la requête :', searchQuery);

    try {
      // Envoyer une requête HTTP GET au backend pour récupérer les résultats de recherche
      const response = await axios.get(`http://localhost:8000/data_collection/index_page?q=${searchQuery}&sort_by=relevence&year=${date}`);
      console.log('Résultats de la recherche:', response.data);
      // Rediriger l'utilisateur vers la page de résultats de recherche avec les données récupérées
      navigate('/searchresult', { state: { results: response.data } });
    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
    }
  }


  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [source, setSource] = useState('');
  const [year, setDate] = useState('');
  const [fileType, setFileType] = useState('');
  const navigate = useNavigate();

  const [sortBy, setSortBy] = useState();
  const [results, setResults] = useState([]);

  const { hasSubscription, setHasSubscription } = useContext(AuthContext);
  const { getUserInvoices } = usePayment();
  

  const handleSearchSubmit = async (e) => {
    //e.preventDefault();

    const queryParams = {
      q: searchQuery,
      sort_by: sortBy, 
      
    };

    try {
      console.log(queryParams)
      const response = await axios.get(
        `http://localhost:8000/data_collection/index_page`,
          { headers: {'Authorization': `Token ${localStorage.getItem('access_token')}`}
            ,params: queryParams  } // Pass query params as an object
          );
      console.log('Utilisateur a un abonnement. Effectuer la recherche...');
      console.log('Recherche soumise avec la requête :', searchQuery);
      console.log('Résultats de la recherche:', response.data);
      navigate('/searchresult', { state: { results: response.data } });
      } catch (error) {
        if (error.response?.status === 403) {
          console.error('You are not allowed to search.');
          navigate("/subscrib")
        }
        console.error('Erreur lors de la recherche:', error);
      }
  };
  useEffect(() => {

    handleSearchSubmit();
  }, [sortBy]);*/
    const [types, setTypes] = useState([]); // Declare types and setTypes
    const [sources, setSources] = useState([]); // Declare sources and setSources
    const [type, setType] = useState('');
    const [source, setSource] = useState('');
    const [year, setYear] = useState('');
    const [domain, setDomain] = useState('');
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
     }, []);
    const handleSearchSubmit = async (e) => {
     e.preventDefault();
     const formattedDate = year ? `${year}` : '';
      const queryParams = {
        q: searchQuery,
        sort_by: sortBy,
        source:source,
        type:type,
        domain:domain,
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
        navigate('/searchresult', { state: { results: response.data } });
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
        <Link to="/gptpage">
          <img className="icon_gpt" src="./images/gpt.png" alt="Logo GPT" />
        </Link>
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
        </div>
      </div>
    </div>
  );
}

export default Gpt;
