import { useState } from 'react';
import axios from 'axios';


export default function useUser() {
  const [errorMessage, setErrorMessage] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);



  const loginUser = async (formData) => {
    try {
      const response = await axios.post('http://localhost:8000/user/login', formData);
      console.log(response.data.token);
      localStorage.clear();
      console.log(localStorage.setItem('access_token', response.data.token));
      localStorage.setItem('refresh_token', response.data.refresh);
      axios.defaults.headers.common['Authorization'] =  `token ${response.data.token}`;
      setLoggedIn(true);
    } catch (error) {
      console.error('Une erreur s\'est produite lors de l\'authentification :', error);
      setErrorMessage('Erreur lors de l\'authentification. Veuillez vérifier vos informations.');
    }
  };

  return {
    loginUser,
    errorMessage,
    setErrorMessage,
    loggedIn,
    setLoggedIn
  };
}
