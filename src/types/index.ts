export type TResponse<T = unknown> = {
  body: T
  statusCode: number
}

export type ValidationField = {
  required?: string
  pattern?: {
    value: RegExp
    message: string
  }
  minLength?: {
    value: number
    message: string
  }
  validate?: (value: string) => string | true
  min?: number
  step?: number | string
}
