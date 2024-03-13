import React from 'react'
import Logo from '../LOGO/Logo'
import Footer from '../Footer/Footer'
import "./Subscrib.css"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function Subscrib() {
  return (
    <>
    <Logo/>
    <div className='sub_titre'>
      <h2>  عروض الاشتراك</h2>
    </div>
    <div className='sub_container'>
        <p className='offre_title'>إختاروا العرض الذي يناسبكم</p>
        <div className='sub_offers'>
            <div className='offre'>
            <p className='offre_title'> العرض الثالث</p>
            <h3 >1000دج/شهر</h3>
            <img  className="offer_icon " src="./images/echelledejusticeB.png"/>
            <div >
                <p className='list_offers'>: ميزات العرض</p>
                <ul>
                   <li>الاطلاع على كل النصوص القانونية</li>
                   <li>الحصول على كل المستجدات</li>
                   <li>تلقي تنبيهات متعلقة بالمستجدات</li>
                </ul>
            </div>
            
            <button className='btn_sub'>
                اشتراك<ShoppingCartIcon sx={{ width: '20px', height: '20px',marginLeft:'5px' }}/>
            </button>
            </div>
            <div className='offre'>
            <p className='offre_title'>  العرض الثاني</p>
            <h3 >1000دج/شهر</h3>
            <img className="offer_icon "  src="./images/echelledejusticeB.png"/>
            <div >
                <p className='list_offers'>: ميزات العرض</p>
                <ul>
                   <li>الاطلاع على كل النصوص القانونية</li>
                   <li>الحصول على كل المستجدات</li>
                   <li>تلقي تنبيهات متعلقة بالمستجدات</li>
                </ul>
            </div>
            <button className='btn_sub'>
                اشتراك<ShoppingCartIcon sx={{ width: '20px', height: '20px',marginLeft:'5px' }}/>
            </button>
            </div>
            <div className='offre'>
            <p className='offre_title'>  العرض الأول</p>
            <h3 >1000دج/شهر</h3>
            <img  className="offer_icon "  src="./images/echelledejusticeB.png"/>
            <div >
                <p className='list_offers'>: ميزات العرض</p>
                <ul>
                   <li>الاطلاع على كل النصوص القانونية</li>
                   <li>الحصول على كل المستجدات</li>
                   <li>تلقي تنبيهات متعلقة بالمستجدات</li>
                </ul>
            </div>
            <button className='btn_sub'>
                اشتراك<ShoppingCartIcon sx={{ width: '20px', height: '20px',marginLeft:'5px' }}/>
            </button>
            </div>
        </div>
    </div>
    <Footer/>
    </>
    
  )
}

export default Subscrib