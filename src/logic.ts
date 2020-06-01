import { StateElement, ElementType } from './utils/types'

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