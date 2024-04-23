import React , { useContext, useState }from 'react'
import './Gpt.css'
import SearchIcon from '@mui/icons-material/Search';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/LogoProvider';
import axios from 'axios';

function Gpt() {
  const [results, setResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [source, setSource] = useState('');
  const [date, setDate] = useState('');
  const [fileType, setFileType] = useState('');
  const navigate = useNavigate(); 


   // État pour indiquer si l'utilisateur a un abonnement
   const { hasSubscription, setHasSubscription } = useContext(AuthContext);
   //const [hasSubscription, setHasSubscription] = useState(false);

  /*const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Recherche soumise avec la requête :', searchQuery);

     // Vérifier si l'utilisateur a un abonnement
     if (hasSubscription) {
      // L'utilisateur a un abonnement, vous pouvez effectuer la recherche normalement
      console.log('Utilisateur a un abonnement. Effectuer la recherche...');
      console.log(hasSubscription)
      navigate('/searchresult');
  } else {
      // L'utilisateur n'a pas d'abonnement, redirigez-le vers la page de paiement
      console.log('Utilisateur n\'a pas d\'abonnement. Redirection vers la page de paiement...');
      navigate('/subscrib') // Redirection vers la page de paiement
      console.log(hasSubscription)
  }
  };*/

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    console.log('Recherche soumise avec la requête :', searchQuery);

    try {
      // Envoyer une requête HTTP GET au backend pour récupérer les résultats de recherche
      const response = await axios.get(`http://localhost:8000/data_collection/index_page?q=${searchQuery}`);
      console.log('Résultats de la recherche:', response.data);
      // Mettre à jour l'état avec les résultats de la recherche
      setResults(response.data);
      console.log(results)
      // Rediriger l'utilisateur vers la page de résultats de recherche
      navigate('/searchresult', { state: { results: response.data } });

    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
    }
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
    <Link to="/gptpage"><img  className ="icon_gpt" src="./images/gpt.png"/></Link>
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
    
        <select id="file-type" 
              name="file-type" 
              className='select_item'
              value={fileType}
              onChange={handleFileTypeChange}>
          <option value=""> نوع الملف</option>
          <option value="طالب">طالب</option>
        </select>
      
      
      
      <input 
    type="date" 
    id="date" 
    name="date" 
    className='select_item'
    placeholder='التاريخ'
    value={date}
    onChange={handleDateChange}
  />
      
     
        <select id="source" 
              name="source" 
              className='select_item'
              value={source}
              onChange={handleSourceChange}>
          <option value=""> المصدر</option>
          <option value="طالب">طالب</option>
        </select>
     
      
     
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
   
   </>
  )
}

export default Gpt