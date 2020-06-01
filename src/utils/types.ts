
export type StateElement = {
  value: string
  data: {} & ApiResponse & ApiErrorResponse
  type: ElementType
}

export type ApiResponse = {
  weather?: Array<WeatherType>
  dt?: number
  name?: string
  cod?: number
}

export type ApiErrorResponse = {
  status?: number
  statusText?: string
}

export type WeatherType = {
  id: number
  main: string
  description: string
  icon: string
}

export enum ElementType {
  Error = 'Error',
  Zip = 'Zip',
  City = 'City',
  ApiError = 'ApiError'
}