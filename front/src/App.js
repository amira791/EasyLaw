
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

import { loadStripe } from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'
import Jaraid from './Components/jaraid/Jaraid';
import ProfileModerateur from './Components/Admin/Moderateur/ProfileModerateur';
import Tarification from './Components/Admin/Tarification/Tarification';

import Terms from './Components/Terms/Terms';

import AboutUs from './Components/AboutUs/AboutUs';
import HelpPage from './Components/HelpPage/HelpPage';
import ScrapingUpdate from './Components/Admin/Scraping/ScrapingUpdate';


function App() {

  const stripe = loadStripe("pk_test_51OygXvLDzFR9kcMzeb7UST3IEa8SXi7CD3pXxIcTSQFunxMWcnaKqIJiCHZWO7fLFvnpgauFm9XArtMtZ9xjBJGl00FHM5TiPB");

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
        <Route path="/subscrib" element={ <Subscrib /> } />
        <Route path="/validation" element={<SucessPayment/>} />
        <Route path="/payment/:id" element={
          <Elements stripe = {stripe}>
            <Payment/>
          </Elements>
        } />
        <Route path="/law" element={<Law/>} />
        <Route path="/LawDetails/:id" element={<LawDetails/>} />
        <Route path="/gptpage" element={<GptPage/>} />
        <Route path="/ressource" element={<Ressource/>} />
        <Route path="/searchresult" element={<SearchResult/>} />
        <Route path="/help" element={<HelpPage/>} />
        <Route path="/aboutus" element={<AboutUs/>} />
        <Route path="/terms" element={<Terms/>} />


        <Route path="/accountmanagment" element={<AccountManag/>} />
        <Route path="/adminauth" element={<AuthAdmin />} />
        <Route path="/moderateur" element={<AuthModerateur />} />
        <Route path="/createAccMod" element={<CreateAccModerateur />} />
        <Route path="/scraping" element={<Scraping/>} />
        <Route path="/scrapingresult" element={<ScrapingResult/>} />
        <Route path="/mainmoderateur" element={<Main/>} />
        <Route path="/admin" element={<AdminMain/>} />
        <Route path="/profileadmin" element={<ProfileAdmin/>} />
        <Route path="/jaraid" element={<Jaraid/>} />
        <Route path="/profilemoderateur" element={<ProfileModerateur/>} />
        <Route path="/tarification" element={<Tarification/>} />
        <Route path="/scrapingupdate/:id_text" element={<ScrapingUpdate/>} />
        

        
        
        
      </Routes>
      </LogoProvider>
      
    </div>
  );

}

export default App;
