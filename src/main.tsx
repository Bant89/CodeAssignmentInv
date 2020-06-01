import React, { useState, FormEvent } from 'react'

import { BASE_URL, API_KEY, CITY_ENDPOINT, ZIP_ENDPOINT } from './utils/index'
import { StateElement, ElementType } from './utils/types'

export const Main = () => {
  const [input, setInput] = useState('')
  const [errors, setErrors] = useState<Array<StateElement>>([])
  const [responses, setResponses] = useState<Array<StateElement>>([])

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value)
  }

  const makeRequest = (element: StateElement) => {
    let URL = '';
    if(element.type === ElementType.City) URL = `${BASE_URL}${CITY_ENDPOINT}${element.value}${API_KEY}`
    else URL = `${BASE_URL}${ZIP_ENDPOINT}${element.value}${API_KEY}`
    fetch(URL)
      .then(res => {
        if(!res.ok) {
          setErrors(state => [...state, {...element, type: ElementType.ApiError, data: res }])
          throw new Error(res.statusText)
        }
        return res.json()
      })
      .then(data => setResponses(state => [...state, { ...element, data }]))
      .catch(error => {
        console.error(error)
      })
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

const digitCheck = (digitAmount:number, element: StateElement): StateElement => {
    if(digitAmount === 5)
    element = {
      ...element,
      type: ElementType.Zip
    }
  else 
    element = {
      ...element,
      value: `Error ${element.value} zip code should have only 5 digits`,
      type: ElementType.Error
    }
    return element
}

const errorTypeCheck = (letterAmount: number, digitAmount: number, element: StateElement): StateElement => {
  if(letterAmount >= digitAmount) {
    element = {
      ...element,
      value: `Error ${element.value} city name shouldn't include numbers`,
      type: ElementType.Error 
    }
  }else {
    element =  {
      ...element,
      value: `Error ${element.value} zip code shouldn't include letters`,
      type: ElementType.Error 
    }
  }
  return element
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
    }
    
    if(digitRegex.test(value) && letterRegex.test(value)){
      returnValue = errorTypeCheck(letterAmount, digitAmount, returnValue)
    }else if(digitRegex.test(value)) {
      returnValue = digitCheck(digitAmount, returnValue)
    }
  }
  return returnValue
}