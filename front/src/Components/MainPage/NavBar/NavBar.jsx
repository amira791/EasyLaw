import React from 'react'
import './NavBar.css'

function NavBar() {

  return (
    <>
    <div className='navBar_container'>
        <div className='dv_btn'>
            <button className='navbar_btn'>! اشترك معنا الان</button>
        </div>
        <div >
            <ul className='NavBar_item'>
                <div className='li_item1'><li>حول المنصة </li></div>
                <div className='li_item1'><li>عروضنا</li></div>
                <div className='li_item1'><li>المصادر الرسمية</li></div>
                <div className='li_item1'><li>اخر المستجدات</li></div>
                <div className='li_item1'><li>الرئيسية</li></div>
            </ul>
            
        </div>
    </div>
    </>
   
  )
}

export default NavBar