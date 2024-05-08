import React from 'react';
import "./Logo.css";
import HelpIcon from '@mui/icons-material/Help';
import LoginIcon from '@mui/icons-material/Login';
import LanguageIcon from '@mui/icons-material/Language';
import { Link } from 'react-router-dom';

function LogoModerateur(props) {
  return (
    <div className='logo_section'>
      <div className='titre_section' style={{ textAlign: 'center' }}> {/* Applied inline style for centering */}
        <h2>{props.title}</h2>
      </div>
      <div className='easylaw_section'>
        <div className='lign_dv'></div>
        <div className='easylaw_logo'>
          <Link to="/">
            <img src="./images/logo.png" alt="Logo" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LogoModerateur;
