import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './Components/Auth/SignUp';
import SignIn from './Components/Auth/SignIn';
import Footer from './Components/Footer/Footer';

function App() {
  return (
    <div className="App">
     
      <Routes>
        <Route path="/" element={<SignUp/>} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/footer" element={<Footer/>} />
        
      </Routes>
    </div>
  );

}

export default App;
