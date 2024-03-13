import React from 'react'
import Logo from '../LOGO/Logo'
import Footer from '../Footer/Footer'
import "./Subscrib.css"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function Subscrib() {
    const offers = [
        {
          title: 'العرض الثالث',
          price: '1000دج/شهر',
          features: [
            'الاطلاع على كل النصوص القانونية',
            'الحصول على كل المستجدات',
            'تلقي تنبيهات متعلقة بالمستجدات'
          ]
        },
        {
          title: 'العرض الثاني',
          price: '1000دج/شهر',
          features: [
            'الاطلاع على كل النصوص القانونية',
            'الحصول على كل المستجدات',
            'تلقي تنبيهات متعلقة بالمستجدات'
          ]
        },
        {
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
    <div className='sub_titre'>
      <h2>  عروض الاشتراك</h2>
    </div>
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
                <button className='btn_sub'>
                    اشتراك<ShoppingCartIcon sx={{ width: '20px', height: '20px',marginLeft:'5px' }}/>
                </button>
              </div>
            ))}
        </div>
    </div>
    <Footer/>
    </>
    
  )
}

export default Subscrib