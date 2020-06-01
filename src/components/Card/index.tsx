import React from 'react'

import { StateElement, ElementType } from '../../utils/types'
import './styles.css'

export const Card = (element: StateElement) => {

  let cardClass = "card--success"
  let returnedCard;

  if(element.type === ElementType.Error) { 
    cardClass = "card--error"
    returnedCard =  (
      <div className={`card ${cardClass}`}>
        <h3>{element.type}</h3>
        <p>{element.value}</p>
      </div>
    )
  }else if(element.type === ElementType.ApiError) {
    cardClass = "card--error" 
    returnedCard =  (
      <div className={`card ${cardClass}`}>
        <h3>{element.type}</h3>
        <p>The value {element.value} returned from API {element.data.statusText}</p>
      </div>
    )
  }else {

    const time = new Date(element.data.dt! * 1000)

    returnedCard =  (
      <div className={`card ${cardClass}`}>
        <h3>{element.data.name}</h3>
        <p>The weather is mainly {element.data.weather![0].main}</p>
        <p>More about weather: {element.data.weather![0].description}</p>
        <p>And current time is: {time.toLocaleTimeString()}</p>
      </div>
    )

  }
  
  return (
    <div>{returnedCard}</div>
  )
}