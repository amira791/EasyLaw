import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './Components/Auth/SignUp';

function App() {
  return (
    <div className="App">
     
      <Routes>
        <Route path="/" element={<SignUp/>} />
        
      </Routes>
    </div>
  );

}

export default App;
