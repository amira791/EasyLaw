import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import HomeIcon from '@mui/icons-material/Home';
import CampaignIcon from '@mui/icons-material/Campaign';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

function NavBar() {
  const [activeLink, setActiveLink] = useState('');

  const handleSetActiveLink = (link) => {
    setActiveLink(link);
  };
  return (
    <div className='navBar_container'>
      <div className='dv_btn'>
        <Link to="/subscrib" className='navbar_btn'>! اشترك معنا الان</Link>
      </div>
      
        <ul className='NavBar_item'>
          <div className='li_item1'><Link to="/aboutus"><li>حول المنصة </li></Link></div>
          <div className='li_item1'><Link to="/subscrib"><li><LocalFireDepartmentIcon sx={{marginLeft:'3%'}}/>عروضنا</li></Link></div>
          <div className='li_item1'><Link to="/ressource"><li><LibraryBooksIcon sx={{marginLeft:'3%'}}/>المصادر الرسمية</li></Link></div>
          <div className='li_item1'><Link to="/latest-news"><li><CampaignIcon sx={{marginLeft:'3%'}}/>اخر المستجدات</li></Link></div>
          <div className='li_item1'><Link to="/"><li><HomeIcon sx={{marginLeft:'3%'}}/>الرئيسية</li></Link></div>
        </ul>
     
    </div>
  );
}

export default NavBar;
