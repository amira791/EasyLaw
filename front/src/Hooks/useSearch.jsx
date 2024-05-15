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
  }, []);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    const formattedDate = year ? `${year}` : '';
    const queryParams = {
      q: searchQuery,
      sort_by: sortBy,
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
        setErrorMessage('حدث خطأ أثناء إجراء البحث'); // Set user-friendly error message
      }
    }
  };

  const handleSortBy = async (sortByValue) => {
    setSortBy(sortByValue);
    // Rechercher automatiquement lorsqu'un mode de tri est sélectionné (optional implementation)
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
    errorMessage,
    setErrorMessage,
    handleSearchSubmit,
    handleSortBy,
  };
}
