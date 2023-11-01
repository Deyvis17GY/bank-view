export const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL
export const BASE_BANK_URL = process.env.NEXT_PUBLIC_BASE_BANK_URL

const BASE_USERS = `${BASE_API_URL}`
const BASE_BANK = `${BASE_BANK_URL}/api`

export const endpoints = {
  user: {
    POST_LOGIN: `${BASE_USERS}/login`,
    POST_REGISTER: `${BASE_USERS}/register`
  },
  bank: {
    GET_INSTITUTIONS: `${BASE_BANK}/institutions`,
    POST_CREATE_LINK: `${BASE_BANK}/links`,
    GET_LIST_TRANSACTIONS: `${BASE_BANK}/transactions`
  }
}
