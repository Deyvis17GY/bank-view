export interface IUser {
  firstName: string
  lastName: string
  email?: string
  password?: string
  userId?: number
  token?: string
}

export interface ILoginResponse {
  data: IUser
}

export interface ITokenData {
  token: string
}
