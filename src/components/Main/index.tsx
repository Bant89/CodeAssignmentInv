import React, { useState, FormEvent } from 'react'

import { Card } from '../Card'
import { BASE_URL, API_KEY, CITY_ENDPOINT, ZIP_ENDPOINT } from '../../utils/index'
import { StateElement, ElementType } from '../../utils/types'
import { sanitizeInput } from '../../logic'
import './styles.css'

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
          setErrors(state => [...state, {...element, type: ElementType.ApiError, data: {
            status: res.status,
            statusText: res.statusText
          } }])
          throw new Error(res.statusText)
        }
        return res.json()
      })
      .then(data => {
        setResponses(state => [...state, { ...element, data: {
          weather: data.weather,
          dt: data.dt,
          name: data.name,
          cod: data.cod
        } }])
      })
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
    <>
      <main>
        <label htmlFor="input">Input:</label>
        <input type="text" onChange={handleChange} placeholder="Los Angeles, 10045" value={input}/> <br />
        <button onClick={handleClick}>Get Weathers</button>
        {errors && errors.map(err => <Card {...err} />)}
        {responses && responses.map(response => <Card {...response} />)}
      </main>
    </>
  )
}
