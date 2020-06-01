import React, { useState } from 'react'


export const Main = () => {
  const [input, setInput] = useState('')
  

  const handleChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setInput(e.target.value)
  }

  const handleClick = () => {
    console.log(input)
  }

  return(
    <main>
      <label htmlFor="input">Input:</label>
      <input type="text" onChange={handleChange} placeholder="Los Angeles, 10045, Rio de Janeiro" value={input}/> <br />
      <button onClick={handleClick}>Get Weathers</button>
    </main>
  )
}

