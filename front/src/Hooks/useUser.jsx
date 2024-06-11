import React, { useState, useContext } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

import { AuthContext } from '../Context/LogoProvider';
import  { userApiClient } from '../API';


export default function useUser() {
  const [errorMessage, setErrorMessage] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate(); 
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const { setFormData ,setIsAuth} = useContext(AuthContext);
    // Fonction logout
    const logout = async () => {
      try {
        const response = await userApiClient.post(`/logout/`, null, {
          headers: {
            'Authorization': `Token ${localStorage.getItem('access_token')}`
          }
        });
        console.log(response.data.message);
        localStorage.removeItem('access_token');
        setIsLoggedOut(true);

        setFormData({ nom: '' }); // Réinitialiser formData après la déconnexion
        setIsAuth(false);
        return true
      } catch (error) {
        console.error(error);
      }
    }
 // Fonction pour récupérer les informations de l'utilisateur
 const getUserInfo = async () => {
  try {
    const access_token = localStorage.getItem('access_token');

    if (!access_token) {
      throw new Error('Token not found in localStorage');
    }

    const response = await userApiClient.get(`/get_user_info/`, {
      headers: {
        Authorization: `token ${access_token}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la récupération des informations de l\'utilisateur :', error);
    throw error; // Propager l'erreur pour la gérer dans le composant
  }
 };

 const editUserInfo = async (editedFormData) => {
  try {
    const access_token = localStorage.getItem('access_token');
    await userApiClient.put(`/edit_user_info/`, editedFormData, {
      headers: {
        Authorization: `Token ${access_token}`
      }
    });
    //alert('Les informations ont été mises à jour avec succès !');
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la mise à jour des informations de profil :', error);
  }
 };
 // Fonction pour modifier le mot de passe de l'utilisateur
 const changePassword = async (oldPassword, newPassword) => {
  try {
    const response = await userApiClient.post(`/change_password/`, {
      old_password: oldPassword,
      new_password: newPassword
    }, {
      headers: {
        'Authorization': `Token ${localStorage.getItem('access_token')}`
      }
    });
    console.log(response.data.message);
  } catch (error) {
    console.error(error);
    setErrorMessage('خطأ في تغيير كلمة السر');
  }
 };

 //************** For Sign In ************************** */
 useEffect(() => {
  console.log("kkkkkk",loggedIn); // This will log the updated value of loggedIn whenever it changes
 }, [loggedIn]);
 const loginUser = async (formData) => {
  try {
    const response = await userApiClient.post(`/login`, formData);
    console.log(response.data.token);
    localStorage.clear();
    localStorage.setItem('access_token', response.data.token);
    localStorage.setItem('refresh_token', response.data.refresh);
    localStorage.setItem('role', response.data.role); // Store the role in localStorage
    axios.defaults.headers.common['Authorization'] = `token ${response.data.token}`;
    setLoggedIn(true); // Update the state
    console.log(loggedIn); // This will log the updated state
    return true;
  } catch (error) {
    console.error('An error occurred during authentication:', error);
    return false;
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
      // Remove the 'role' field from formData
      delete formData.role;
      const response = await userApiClient.post(`/signup`, formData);
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
      }, 2000);
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

/***************** Get All Users ************************** */
const getAllUsers = async () => {
  try {
    const access_token = localStorage.getItem('access_token');

    if (!access_token) {
      throw new Error('Token not found in localStorage');
    }

    const response = await userApiClient.get(`/allUsers/`, {
      headers: {
        Authorization: `Token ${access_token}` // Use 'Token' instead of 'token'
      }
    });

    return response.data;
  } catch (error) {
    console.error('An error occurred while retrieving user information:', error);
    throw error; 
  }
};
/******************************* Create Moderateur ***************************************** */
const createModerator = async (formData) => {
  try {
    const access_token = localStorage.getItem('access_token');

    if (!access_token) {
      throw new Error('Token not found in localStorage');
    }

    const response = await userApiClient.post(`/createMod/`, formData, {
      headers: {
        Authorization: `Token ${access_token}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('An error occurred while creating the moderator:', error);
    throw error;
  }
};
/***********************************Activate User ******************************************** */
const activateUser = async (username) => {
  try {
    const access_token = localStorage.getItem('access_token');

    if (!access_token) {
      throw new Error('Token not found in localStorage');
    }

    const response = await userApiClient.post(`/activateUser`, { username }, {
      headers: {
        Authorization: `Token ${access_token}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('An error occurred while activating the user:', error);
  }
};
/************************************ Block User ******************************************* */
const blockUser = async (username) => {
  try {
    const access_token = localStorage.getItem('access_token');

    if (!access_token) {
      throw new Error('Token not found in localStorage');
    }

    const response = await userApiClient.post(`/blockUser`, { username }, {
      headers: {
        Authorization: `Token ${access_token}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('An error occurred while blocking the user:', error);
  }
};
/*************************************************************************************************** */

const warnUser = async (username) => {
  try {
    const access_token = localStorage.getItem('access_token');

    if (!access_token) {
      throw new Error('Token not found in localStorage');
    }

    const response = await userApiClient.post(`/warnUser`, { username }, {
      headers: {
        Authorization: `Token ${access_token}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('An error occurred while warning the user:', error);
  }
};

/*************************************************************************************************** */

const isWarned = async () => {
  try {
    const access_token = localStorage.getItem('access_token');

    if (!access_token) {
      throw new Error('Token not found in localStorage');
    }

    const response = await userApiClient.post(`/isWarned`,{}, {
      headers: {
        Authorization: `Token ${access_token}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('An error occurred while warning the user:', error);
    return {"message": 'An error occurred while warning the user'}
  }
};


  return {
    logout,
    getAllUsers,
    getUserInfo,
    editUserInfo,
    activateUser,
    blockUser,
    changePassword,
    addNewUser,
    loginUser,
    errorMessage,
    setErrorMessage,
    createModerator,
    loggedIn,
    setLoggedIn,
    warnUser,
    isWarned,
  };
}