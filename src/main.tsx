import React, { useState, FormEvent } from 'react'

import { BASE_URL, API_KEY } from './utils/index'
import { StateElement, ElementType } from './utils/types'

export const Main = () => {
  const [input, setInput] = useState('')
  const [errors, setErrors] = useState<Array<StateElement>>([])
  const [responses, setResponses] = useState<Array<StateElement>>([])

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value)
  }

  const makeRequest = (element: StateElement) => {
    fetch(`${BASE_URL}${element.value}${API_KEY}`)
      .then(res => res.json())
      .then(data => setResponses(state => [...state, { ...element, data }]))
      .catch(error => console.error(error))
  }

  const handleClick = () => {
    setResponses([])
    setErrors([])
    input.split(',')
    .map(e => sanitizeInput(e))
    .filter(e => {
      if(e.type === ElementType.Error) {
        setErrors(state => [...state, e])
        return false
      }else {
        return true
      }
    })
    .forEach(e => makeRequest(e))
  }

  return(
    <main>
      <label htmlFor="input">Input:</label>
      <input type="text" onChange={handleChange} placeholder="Los Angeles, 10045, Rio de Janeiro" value={input}/> <br />
      <button onClick={handleClick}>Get Weathers</button>
    </main>
  )
}


export const sanitizeInput = (value: string): StateElement => {
  const letterRegex = /[A-Za-z]/g,
    digitRegex = /\d/g

  let returnValue: StateElement = { value: value.trim(), data: {}, type: ElementType.City }

  if(returnValue.value.length === 0){
    returnValue = {
      ...returnValue,
      value: "Error value can't be empty",
      type: ElementType.Error 
    }
  }else {
    let letterAmount = 0, digitAmount = 0

    if(value.match(letterRegex)) {
      letterAmount = value.match(letterRegex)!.length
      returnValue = {
        ...returnValue,
        type: ElementType.City
      }
    }

    if(value.match(digitRegex)) {
      digitAmount = value.match(digitRegex)!.length
      if(digitAmount < 6)
        returnValue = {
          ...returnValue,
          type: ElementType.Zip
        }
      else 
        returnValue = {
          ...returnValue,
          value: `Error ${returnValue.value} zip code can't be longer than 5 digits`,
          type: ElementType.Error
        }

    }
      if(digitRegex.test(value) && letterRegex.test(value)){
        
        if(letterAmount >= digitAmount) {
          returnValue = {
            ...returnValue,
            value: `Error ${returnValue.value} city name shouldn't include numbers`,
            type: ElementType.Error 
          }
        }else {
          returnValue =  {
            ...returnValue,
            value: `Error ${returnValue.value} zip code shouldn't include letters`,
            type: ElementType.Error 
          }
        }
      }
  }
  return returnValue
}