import React, { createContext, useState } from 'react';

// Create context
export const AuthContext = createContext();

// Create provider
const LogoProvider = ({ children }) => {
  // State for authentication
  const [isAuth, setIsAuth] = useState(false);
  // Sample formData
  const [formData, setFormData] = useState({ nom: '' }); 

  const updateFormData = (newFormData) => {
    setFormData(newFormData);
  };

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth, formData, updateFormData }}>
      {children}
    </AuthContext.Provider>
  );
};

export default LogoProvider;
