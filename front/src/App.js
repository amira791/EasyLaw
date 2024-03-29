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
import Payment from './Components/Payment/Payment';
import AuthAdmin from './Components/Admin/AuthAdmin/AuthAdmin';
import AuthModerateur from './Components/Admin/AuthAdmin/AuthModerateur';
import CreateAccModerateur from './Components/Admin/AuthAdmin/CreateAccModerateur';
import Law from './Components/Law/Law';
import LawDetails from './Components/Law/LawDetails';

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
        <Route path="/payment" element={<Payment/>} />
        <Route path="/law" element={<Law/>} />
        <Route path="/LawDetails/:id" element={<LawDetails/>} />


        <Route path="/accountmanagment" element={<AccountManag/>} />
        <Route path="/admin" element={<AuthAdmin />} />
        <Route path="/moderateur" element={<AuthModerateur />} />
        <Route path="/createAccMod" element={<CreateAccModerateur />} />
        
        
        
      </Routes>
    </div>
  );

}

export default App;
