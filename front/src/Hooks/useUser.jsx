import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function useUser() {
    const [errorMessage, setErrorMessage] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate(); 


//************** For Sign In ************************** */
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

// ******************* For Sign Up *****************************/
const addNewUser = async (formData, confirmPassword, setFormData, setErrorMessage, setPasswordError, setSuccessMessage) => {
    try {
      setErrorMessage('');
      if (formData.password !== confirmPassword) {
        setPasswordError('كلمة السر وتأكيد كلمة السر يجب أن تتطابق');
      } else if (formData.password.length < 8) {
        setPasswordError('كلمة السر يجب أن تتكون من 8 حروف أو أكثر');
      } else {
        const response = await axios.post('http://localhost:8000/user/signup', formData);
        console.log(response.data);
        setSuccessMessage('تم إنشاء الحساب بنجاح! يتم إعادة توجيهك إلى صفحة تسجيل الدخول...');
        setFormData({
          prenom: '',
          nom: '',
          dateNaiss: '',
          univer_Entrep: '',
          occupation: '',
          email: '',
          password: '',
          username: ''
        });
        setPasswordError('');
        setConfirmPassword('');
        setTimeout(() => {
          navigate('/signin'); // Use navigate to redirect to the signin page
        }, 5000);
      }
    } catch (error) {
      if (error.response.data.email) {
        setErrorMessage(error.response.data.email);
      } else if (error.response.data.username) {
        setErrorMessage(error.response.data.username);
      } else {
        setErrorMessage('Une erreur s\'est produite lors de l\'inscription');
      }
    }
  };

  return {
    addNewUser,
    loginUser,
    errorMessage,
    setErrorMessage,
    loggedIn,
    setLoggedIn
  };
}