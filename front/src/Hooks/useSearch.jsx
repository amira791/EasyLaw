import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function useSearch() {
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
  const [interestDomains, setInterestDomains] = useState([]); // Added interestDomains state
  const [interestDomain, setInterestDomain] = useState(''); // Added interestDomain state

  const navigate = useNavigate();

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await axios.get('http://localhost:8000/data_collection/types_sources');
        setTypes(response.data.types);
        setSources(response.data.sources);
      } catch (error) {
        console.error('Error fetching options:', error);
        setErrorMessage('An error occurred while fetching options'); // Set user-friendly error message
      }
    };

    fetchOptions();

    const fetchDistinctYears = async () => {
      try {
        const response = await axios.get('http://localhost:8000/data_collection/distinct_years');
        setYears(response.data.years);
      } catch (error) {
        console.error('Error fetching distinct years:', error);
        setErrorMessage('An error occurred while fetching distinct years'); // Set user-friendly error message
      }
    };

    fetchDistinctYears();

    const fetchInterestDomains = async () => {
      try {
        const response = await axios.get('http://localhost:8000/data_collection/domaine');
        setInterestDomains(response.data.interest_domains);
      } catch (error) {
        console.error('Error fetching interest domains:', error);
        setErrorMessage('An error occurred while fetching interest domains'); // Set user-friendly error message
      }
    };

    fetchInterestDomains();
  }, []);

  /*const handleSearchSubmit = async (e) => {
    e.preventDefault();
    const formattedDate = year ? `${year}` : '';
    const queryParams = {
      q: searchQuery,
      sort_by: sortBy,
      source,
      type,
      interestDomain, // Added interestDomain for future filtering
      year: formattedDate,
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
        setErrorMessage('حدث خطأ أثناء إجراء البحث'); // Set user-friendly error message
      }
    }
  };*/

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (!searchQuery) {
      setErrorMessage('الرجاء إدخال نص للبحث'); // Set the error message if searchQuery is empty
      return;
    }
    setErrorMessage(''); // Clear any existing error message
  
    const formattedDate = year ? `${year}` : '';
    const queryParams = {
      q: searchQuery,
      sort_by: sortBy,
      source,
      type,
      interestDomain,
      year: formattedDate,
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
      navigate('/searchresult', { state: { results: response.data.results, len: response.data.len, searchQuery } });
    } catch (error) {
      if (error.response?.status === 403) {
        console.error('You are not allowed to search.');
        navigate("/subscrib");
      } else {
        console.error('Erreur lors de la recherche:', error);
        setErrorMessage('حدث خطأ أثناء إجراء البحث');
      }
    }
  };
  
  

  const handleSortBy = async (sortByValue) => {
    setSortBy(sortByValue);
    // Optional: Automatically search when a sort mode is selected
  };

  return {
    types,
    sources,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    years,
    year,
    setYear,
    domain,
    setDomain,
    type,
    setType,
    source,
    setSource,
    interestDomains, // Return interestDomains state
    interestDomain, // Return interestDomain state
    setInterestDomain, // Return setInterestDomain function
    errorMessage,
    setErrorMessage,
    handleSearchSubmit,
    handleSortBy,
  };
}
