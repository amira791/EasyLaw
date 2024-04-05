import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const LogoProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [formData, setFormData] = useState({ nom: '' });

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    setIsAuth(accessToken !== null);

    // Effet de nettoyage
    return () => {
      if (!accessToken) {
        setFormData({ nom: '' });
        
      }
    };
  }, []);

  const updateFormData = (newFormData) => {
    setFormData(newFormData);
  };

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth, formData, setFormData, updateFormData }}>
      {children}
    </AuthContext.Provider>
  );
};

export default LogoProvider;