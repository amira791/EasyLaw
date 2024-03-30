import React from 'react'
import Logo from '../LOGO/Logo'
import Footer from '../Footer/Footer'
import "./Subscrib.css"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import TitleBar from '../TitleBar/TitleBar';
import { Link } from 'react-router-dom';

function Subscrib() {
  const offers = [
    {
      id: 1,
      title: 'العرض الثالث',
      price: '1000دج/شهر',
      features: [
        'الاطلاع على كل النصوص القانونية',
        'الحصول على كل المستجدات',
        'تلقي تنبيهات متعلقة بالمستجدات'
      ]
    },
    {
      id: 2,
      title: 'العرض الثاني',
      price: '1000دج/شهر',
      features: [
        'الاطلاع على كل النصوص القانونية',
        'الحصول على كل المستجدات',
        'تلقي تنبيهات متعلقة بالمستجدات'
      ]
    },
    {
      id: 3,
      title: 'العرض الأول',
      price: '1000دج/شهر',
      features: [
        'الاطلاع على كل النصوص القانونية',
        'الحصول على كل المستجدات',
        'تلقي تنبيهات متعلقة بالمستجدات'
      ]
    }
  ];


  return (
   <>
    <Logo/>
    <TitleBar title="  عروض الاشتراك  " />
    <div className='sub_container'>
        <p className='offre_title'>إختاروا العرض الذي يناسبكم</p>
        <div className='sub_offers'>
            {offers.map((offer, index) => (
              <div className='offre' key={index}>
                <p className='offre_title'>{offer.title}</p>
                <h3>{offer.price}</h3>
                <img className="offer_icon" src="./images/echelledejusticeB.png"/>
                <div>
                    <p className='list_offers'>: ميزات العرض</p>
                    <ul>
                      {offer.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                </div>
                <Link to={`/payment/${offer.id}`} className='btn_sub'>
                    اشتراك<ShoppingCartIcon sx={{ width: '20px', height: '20px',marginLeft:'5px' }}/>
                </Link>
              </div>
            ))}
        </div>
    </div>
    <Footer/>
    </>
    
  )
}

export default Subscrib