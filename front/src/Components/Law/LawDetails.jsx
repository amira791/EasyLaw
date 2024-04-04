import React from 'react'
import Logo from '../LOGO/Logo'
import Footer from '../Footer/Footer'
import { useParams } from 'react-router-dom';

function LawDetails() {
    const { id } = useParams();
  return (
    <>
    <Logo />
    <div>
      <h2>Détails de la loi ID: {id}</h2>
     
    </div>
    <Footer/>
    </>
  )
}

export default LawDetails