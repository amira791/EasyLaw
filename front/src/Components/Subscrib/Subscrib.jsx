import React, { useEffect, useState } from 'react'
import Logo from '../LOGO/Logo'
import Footer from '../Footer/Footer'
import "./Subscrib.css"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import TitleBar from '../TitleBar/TitleBar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import usePayment from '../../Hooks/usePayment';


function Subscrib() {

  

  const [offers,setOffers] = useState([])
  const [current, setCurrent] = useState(null)

  const {getSubscriptions} = usePayment()

  var valid = true
              

  useEffect(() => {

    const fetchData = async () => {
      const subs = await getSubscriptions()
      setOffers(subs?.offers|| [])
      setCurrent(subs?.curent)
    }

    fetchData()

  },[])

  

 

  return (
   <>
    <Logo />
    <TitleBar title="  عروض الاشتراك  " />
    <div className='sub_container'>
        <p className='offre_title'>إختاروا العرض الذي يناسبكم</p>
        <p className='terms'>يرجى التأكد من قراءة <a href="terms" target='_' style={{"color": "blue"}}>شروط الخدمة الخاصة بنا</a> بعناية قبل الاشتراك</p>
        <div className='sub_offers'>
            { offers.map((offer, index) => {
              if(offer.id === current) valid = false

              return(
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
                    : valid &&
                      <Link to={`/payment/${offer.priceId}?name=${offer.title}&price=${offer.price}`} className='btn_sub'>
                           {current?  "تطوير" : "اشتراك" } <ShoppingCartIcon sx={{ width: '20px', height: '20px',marginLeft:'5px' }}/>
                      </Link>
                  }
                </div>
                
              </div>)})}
        </div>
    </div>
    <Footer/>
    </>
    
  )
}

export default Subscrib