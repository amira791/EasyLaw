import React, { useEffect, useState } from 'react'
import Logo from '../LOGO/Logo'
import Footer from '../Footer/Footer'
import "./Subscrib.css"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import TitleBar from '../TitleBar/TitleBar';
import { Link } from 'react-router-dom';
import axios from 'axios';


function Subscrib() {

  axios.defaults.headers.common['Authorization'] = "token "+  localStorage.getItem('access_token');

  const [offers,setOffers] = useState([])
  const [current, setCurrent] = useState(null)

  useEffect(() => {
    const fetchData = async () =>{
      try {
      const response = await axios.get('http://localhost:8000/payment/service');
      const data = response.data.all.map(offer=> ({
      
            id: offer.id,
            priceId : offer.priceId,
            title: offer.nom,
            price:  `${offer.tarif}دج/شهر`,
            features: offer.accesses.map(access=>({
                nom:access.nom
            }))
          }))
      setOffers(data)
      setCurrent(response.data.current)
        

      } catch (error) {
        console.error('Une erreur s\'est produite lors de la recuperation des offres :', error);
      
      }
    }
    fetchData()

  },[])

  console.log(current);
  

  /*const offers = [
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
  ];*/

  return (
   <>
    <Logo />
    <TitleBar title="  عروض الاشتراك  " />
    <div className='sub_container'>
        <p className='offre_title'>إختاروا العرض الذي يناسبكم</p>
        <div className='sub_offers'>
            {offers.map((offer, index) => (
              <div className= {'offre' + (offer.id === current ? ' actif' : '')} key={index}>
                <p className='offre_title'>{offer.title}</p>
                <h3>{offer.price}</h3>
                <img className="offer_icon" src="./images/echelledejusticeB.png"/>
                <div className="payment-bottom">
                  <div>
                      <p className='list_offers'>: ميزات العرض</p>
                      <ul>
                        {offer.features.map((feature, index) => (
                          <li key={index}>{feature.nom}</li>
                        ))}
                      </ul>
                  </div>
                  {
                    (offer.id === current)?
                      <h2 style= {{color: "var(--primary-color)"}}   >الاشتراك الحالي</h2>
                    :
                      <Link to={`/payment/${offer.priceId}?name=${offer.title}&price=${offer.price}`} className='btn_sub'>
                           {current?  "تطوير" : "اشتراك" } <ShoppingCartIcon sx={{ width: '20px', height: '20px',marginLeft:'5px' }}/>
                      </Link>
                  }
                </div>
                
              </div>
            ))}
        </div>
    </div>
    <Footer/>
    </>
    
  )
}

export default Subscrib