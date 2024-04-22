import React from 'react'
import './TitleBar.css'

function TitleBar(props) {
  return (
    <div className='bar_titre'>
      <h2>{props.title}</h2>
    </div>
  )
}

export default TitleBar