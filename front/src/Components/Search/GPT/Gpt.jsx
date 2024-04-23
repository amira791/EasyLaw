import React, { useContext, useState ,useEffect} from 'react';
import './Gpt.css';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../../Context/LogoProvider';

import usePayment from '../../../Hooks/usePayment';


function Gpt() {
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
  };*/


  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [source, setSource] = useState('');
  const [publication_date, setDate] = useState('');
  const [fileType, setFileType] = useState('');
  const navigate = useNavigate();
  const { hasSubscription, setHasSubscription } = useContext(AuthContext);
  const { getUserInvoices } = usePayment();
  useEffect(() => {
    const checkSubscription = async () => {
      const { hasInvoices } = await getUserInvoices();
     
      // Mettez à jour hasSubscription en fonction du résultat de getUserInvoices
      setHasSubscription(hasInvoices);
      console.log(hasSubscription);
    };
    checkSubscription();
  }, []);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    const queryParams = {
      q: searchQuery,
      sort_by: 'relevence', // Assuming you always want to sort by relevance
    };

   /* if (category) {
      queryParams.category = category;
    }

    if (source) {
      queryParams.source = source;
    }

    if (fileType) {
      queryParams.file_type = fileType; // Use a more descriptive param name
    }*/
 if (true) {
    console.log('Utilisateur a un abonnement. Effectuer la recherche...');
    try {
      console.log(queryParams)
      const response = await axios.get(
        `http://localhost:8000/data_collection/index_page`,
        { params: queryParams } // Pass query params as an object
      );
      console.log('Recherche soumise avec la requête :', searchQuery);
      console.log('Résultats de la recherche:', response.data);
      navigate('/searchresult', { state: { results: response.data } });
    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
    }}else{
      navigate('/subscrib');
    }
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
          <button type="submit" className="btn btn-primary"> البحث</button>
          <input
            type="text"
            className="form-control"
            placeholder="ابحث عن النص القانوني . . . "
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <SearchIcon className="search-icon" />
        </form>
        <div className='search_filter'>
          <select
            id="file-type"
            name="file-type"
            className='select_item'
            value={fileType}
            onChange={(e) => setFileType(e.target.value)}
          >
            <option value=""> نوع الملف</option>
            <option value="طالب">طالب</option>
          </select>
          <input
            type="date"
            id="date"
            name="publication_date"
            className='select_item'
            placeholder='التاريخ'
            value={publication_date}
            onChange={(e) => setDate(e.target.value)}
          />
          <select
            id="source"
            name="source"
            className='select_item'
            value={source}
            onChange={(e) => setSource(e.target.value)}
          >
            <option value=""> المصدر</option>
            <option value="طالب">طالب</option>
          </select>
          <select
            id="category"
            name="category"
            className='select_item'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value=""> التصنيف</option>
            <option value="طالب">طالب</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default Gpt;
