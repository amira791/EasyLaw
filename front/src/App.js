
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './Components/Auth/SignUp';
import SignIn from './Components/Auth/SignIn';

import LawCategories from './Components/MainPage/LawCategories/LawCategories';

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
import ChangePwd from './Components/Profile/ChangePwd';
import Compte from './Components/Profile/Compte';
import Interest from './Components/Profile/Interest';
import Services from './Components/Profile/Services';
import Scraping from './Components/Admin/Scraping/Scraping';
import ScrapingResult from './Components/Admin/Scraping/ScrapingResult';
import Main from './Components/Admin/Moderateur/Main';
import AdminMain from './Components/Admin/AdminMain/AdminMain';
import LogoProvider from './Context/LogoProvider';
import ProtectedRoute from './Context/ProtectedRoute';
import ProfileAdmin from './Components/Admin/ProfileAdmin/ProfileAdmin';
import GptPage from './Components/GptPage/GptPage';
import Ressource from './Components/Ressource/Ressource';
import SearchResult from './Components/Search/SearchResult/SearchResult';
import SucessPayment from './Components/Payment/SucessPayment';
import Facture from './Components/Profile/Facture';


function App() {
  return (
    <div className="App">
    <LogoProvider>
      <Routes>
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/" element={<LawCategories />} />
        <Route path="/profile" element={<Profile />}/>
        
        <Route path="/Changepwd" element={<ChangePwd/>} />
        <Route path="/compte" element={<Compte/>} />
        <Route path="/interest" element={<Interest/>} />
        <Route path="/services" element={<Services/>} />
        <Route path="/facture" element={<Facture/>} />
        <Route path="/subscrib" element={<Subscrib/>} />
        <Route path="/validation" element={<Validation/>} />
        <Route path="/payment/:id" element={<Payment/>} />
        <Route path="/sucesspayment" element={<SucessPayment/>} />
        <Route path="/law" element={<Law/>} />
        <Route path="/LawDetails/:id" element={<LawDetails/>} />
        <Route path="/gptpage" element={<GptPage/>} />
        <Route path="/ressource" element={<Ressource/>} />
        <Route path="/searchresult" element={<SearchResult/>} />


        <Route path="/accountmanagment" element={<AccountManag/>} />
        <Route path="/adminauth" element={<AuthAdmin />} />
        <Route path="/moderateur" element={<AuthModerateur />} />
        <Route path="/createAccMod" element={<CreateAccModerateur />} />
        <Route path="/scraping" element={<Scraping/>} />
        <Route path="/scrapingresult" element={<ScrapingResult/>} />
        <Route path="/mainmoderateur" element={<Main/>} />
        <Route path="/admin" element={<AdminMain/>} />
        <Route path="/profileadmin" element={<ProfileAdmin/>} />
        
        
        
      </Routes>
      </LogoProvider>
      
    </div>
  );

}

export default App;
