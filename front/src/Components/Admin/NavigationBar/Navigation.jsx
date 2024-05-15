import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Navigation.css"

import HomeIcon from '@mui/icons-material/Home';
import CampaignIcon from '@mui/icons-material/Campaign';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

function Navigation() {
    const [activeLink, setActiveLink] = useState('');

    const handleSetActiveLink = (link) => {
        setActiveLink(link);
    };
   
    return (
        <div className="navBar_container_admin">
            <ul className='NavBar_itemA'>
                <div className={`li_itemA ${activeLink === '/accountmanagment' ? 'active' : ''}`}>
                    <Link to="/accountmanagment" onClick={() => handleSetActiveLink('/accountmanagment')}>
                        <li> ادارة الحسابات </li>
                    </Link>
                </div>
                <div className={`li_itemA ${activeLink === '/tarificationk' ? 'active' : ''}`}>
                    <Link to="/tarificationk" onClick={() => handleSetActiveLink('/tarificationk')}>
                        <li>ادارة النصوص القانونية</li>
                    </Link>
                </div>
                <div className={`li_itemA ${activeLink === '/tarification' ? 'active' : ''}`}>
                    <Link to="/tarification" onClick={() => handleSetActiveLink('/tarification')}>
                        <li> ادارة التسعير</li>
                    </Link>
                </div>
            </ul>
        </div>
    );
}

export default Navigation;
