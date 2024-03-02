import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './Components/Auth/SignUp';
import SignIn from './Components/Auth/SignIn';
import Footer from './Components/Footer/Footer';
import LawCategories from './Components/MainPage/LawCategories/LawCategories';
import Gpt from './Components/MainPage/GPT/Gpt';

function App() {
  return (
    <div className="App">
     
      <Routes>
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/footer" element={<Footer/>} />
        <Route path="/" element={<LawCategories/>} />
        <Route path="/gpt" element={<Gpt/>} />
        
      </Routes>
    </div>
  );

}

export default App;
