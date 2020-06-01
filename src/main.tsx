import React, { useState, FormEvent } from 'react'

import { BASE_URL, API_KEY } from './utils/index'
import { ErrorMessage } from './utils/types'

export const Main = () => {
  const [input, setInput] = useState('')
  const [responses, setResponses] = useState<Array<{}>>([])

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value)
  }

  const makeRequest = (value: string) => {
    fetch(`${BASE_URL}${value}${API_KEY}`)
      .then(res => res.json())
      .then(data => setResponses(state => [...state, data]))
      .catch(error => console.error(error))
  }

  const handleClick = () => {
    input.split(',')
    .map(e => sanitizeInput(e))
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


export const sanitizeInput = (value: string) => {
  const letterRegex = /[A-Za-z]/g,
    digitRegex = /\d/g

  let returnValue = value.trim()
  if(returnValue.length === 0){
    returnValue = "Value can't be empty"
  }else if(digitRegex.test(value) && letterRegex.test(value)){
    const letterAmount = value.match(letterRegex)!.length
    const digitAmount = value.match(digitRegex)!.length
    
    if(letterAmount >= digitAmount) {
      returnValue = "City name shouldn't include numbers"
    }else {
      returnValue = "Postal code should include letters"
    }
  }
  return returnValue
}
