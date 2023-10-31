export const BASE_URL = 'http://localhost:3000'

const BASE_USERS = `${BASE_URL}`

export const endpoints = {
  user: {
    POST_LOGIN: `${BASE_USERS}/login`,
    POST_REGISTER: `${BASE_USERS}/register`
  }
}
