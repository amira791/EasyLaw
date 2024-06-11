import React, { useEffect } from 'react';
import './Gpt.css';
import SearchIcon from '@mui/icons-material/Search';
import useSearch from '../../../Hooks/useSearch';
import { useLocation } from 'react-router-dom';

function Gpt({ currentPage, resultsPerPage }) {
  const location = useLocation();

  const {
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
    interestDomains,
    interestDomain,
    setInterestDomain,
    errorMessage,
    setErrorMessage,
    handleSearchSubmit,
    handleSortBy,
  } = useSearch();

  useEffect(() => {
    if (location.state && location.state.searchQuery) {
      setSearchQuery(location.state.searchQuery);
    }
  }, [location.state, setSearchQuery]);

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
          {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Display error message */}
          <div className="radio-buttons">
            <label className='radio_label'>
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
              <input
                type="radio"
                name="sortBy"
                value="publication_date"
                checked={sortBy === 'publication_date'}
                onChange={() => handleSortBy('publication_date')}
              />
              بتاريخ النشر
            </label>
          </div>
        </form>
        <div className='search_filter'>
          <select
            id="year"
            name="year"
            className='select_item'
            value={year} // Use the defined year state
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
            value={interestDomain}
            onChange={(e) => setInterestDomain(e.target.value)}
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
