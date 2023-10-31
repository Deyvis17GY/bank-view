interface ILoginUser {
  email: string
  password: string
}

interface IRegisterUser extends ILoginUser {
  firstName: string
  lastName: string
}
