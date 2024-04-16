import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const LogoProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [formData, setFormData] = useState({ nom: '' });

  const [hasSubscription, setHasSubscription] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    setIsAuth(accessToken !== null);

    // Récupérer le nom de l'utilisateur depuis localStorage
    const storedName = localStorage.getItem('user_name');
    if (storedName) {
      setFormData({ nom: storedName });
    }

    // Effet de nettoyage
    return () => {
      if (!accessToken) {
        setFormData({ nom: '' });
      }
    };
  }, []);

  const updateFormData = (newFormData) => {
    setFormData(newFormData);
    // Stocker le nouveau nom dans localStorage
    localStorage.setItem('user_name', newFormData.nom);
  };

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth, formData, setFormData, updateFormData,
    hasSubscription, setHasSubscription }}>
      {children}
    </AuthContext.Provider>
  );
};

export default LogoProvider;
