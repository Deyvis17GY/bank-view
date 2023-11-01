export interface ILoginUser {
  email: string
  password: string
}

export interface IRegisterUser extends ILoginUser {
  firstName: string
  lastName: string
}

export interface IParametersLink {
  bank: string
  username: string
}
