import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
  return (
    <div className='navBar_container'>
      <div className='dv_btn'>
        <Link to="/subscrib" className='navbar_btn'>! اشترك معنا الان</Link>
      </div>
      
        <ul className='NavBar_item'>
          <div className='li_item1'><Link to="/about-us"><li>حول المنصة </li></Link></div>
          <div className='li_item1'><Link to="/subscrib"><li>عروضنا</li></Link></div>
          <div className='li_item1'><Link to="/official-resources"><li>المصادر الرسمية</li></Link></div>
          <div className='li_item1'><Link to="/latest-news"><li>اخر المستجدات</li></Link></div>
          <div className='li_item1'><Link to="/home"><li>الرئيسية</li></Link></div>
        </ul>
     
    </div>
  );
}

export default NavBar;
