import React , { useState }from 'react'
import './Gpt.css'
import SearchIcon from '@mui/icons-material/Search';

function Gpt() {
    const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [source, setSource] = useState('');
  const [date, setDate] = useState('');
  const [fileType, setFileType] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Recherche soumise avec la requête :', searchQuery);
  };

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
   <div className='gpt_dv'> 
   <div className='gpt_logo'>
    <img  className ="icon_gpt" src="./images/gpt.png"/>
   </div>
   <div className='gpt_search'>
    <form className="search-form" onSubmit={handleSearchSubmit} >
        <button type="submit" className="btn btn-primary"> البحث</button>
        <input type="text" 
        className="form-control"
         placeholder="ابحث عن النص القانوني . . . "
        value={searchQuery}
        onChange={handleInputChange}/>
        <SearchIcon className="search-icon"  />
     </form>
     <div className='search_filter'>
     <div className='filter_item'>
        <select id="file-type" 
              name="file-type" 
              className='select_item'
              value={fileType}
              onChange={handleFileTypeChange}>
          <option value=""> نوع الملف</option>
          <option value="طالب">طالب</option>
        </select>
      </div>
      
      <div className='filter_item'>
      <input 
    type="date" 
    id="date" 
    name="date" 
    className='select_item'
    placeholder='التاريخ'
    value={date}
    onChange={handleDateChange}
  />
      </div>
      <div className='filter_item'>
        <select id="source" 
              name="source" 
              className='select_item'
              value={source}
              onChange={handleSourceChange}>
          <option value=""> المصدر</option>
          <option value="طالب">طالب</option>
        </select>
      </div>
      
      <div className='filter_item'>
        <select id="category" 
              name="category" 
              className='select_item'
              value={category}
              onChange={handleCategoryChange}>
          <option value=""> التصنيف</option>
          <option value="طالب">طالب</option>
        </select>
      </div>

     </div>

   </div>
  
    

   </div>
   
   </>
  )
}

export default Gpt