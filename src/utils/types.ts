
export type StateElement = {
  value: string
  data: object
  type: ElementType
}

export enum ElementType {
  Error = 'Error',
  Zip = 'Zip',
  City = 'City',
  ApiError = 'ApiError'
}