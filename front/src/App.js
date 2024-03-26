import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './Components/Auth/SignUp';
import SignIn from './Components/Auth/SignIn';
import Footer from './Components/Footer/Footer';
import LawCategories from './Components/MainPage/LawCategories/LawCategories';
import Gpt from './Components/MainPage/GPT/Gpt';
import Profile from './Components/Profile/Profile';
import Subscrib from './Components/Subscrib/Subscrib';
import Validation from './Components/Auth/Validation';
import AccountManag from './Components/Admin/AccountManag/AccountManag';

function App() {
  return (
    <div className="App">
     
      <Routes>
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/footer" element={<Footer/>} />
        <Route path="/" element={<LawCategories/>} />
        <Route path="/gpt" element={<Gpt/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/subscrib" element={<Subscrib/>} />
        <Route path="/validation" element={<Validation/>} />


        <Route path="/accountmanagment" element={<AccountManag/>} />
        
        
      </Routes>
    </div>
  );

}

export default App;
