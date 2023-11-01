import {
  ILinkCreateResponse,
  IListBankResponse,
  IListTransactionsResponse
} from '@/interfaces/services'
import axiosInstance from '../axiosInstance'
import { endpoints } from '../endpoints'
import { IParametersLink } from '@/interfaces'

export const getListBankAccounts = async (): Promise<IListBankResponse> => {
  const response: IListBankResponse = await axiosInstance({
    url: endpoints.bank.GET_INSTITUTIONS,
    method: 'GET'
  })

  return response
}

export const postCreateBankLink = async (
  data: IParametersLink
): Promise<ILinkCreateResponse> => {
  const response: ILinkCreateResponse = await axiosInstance({
    url: endpoints.bank.POST_CREATE_LINK,
    method: 'POST',
    data: {
      institution: data.bank,
      username: data.username
    }
  })

  return response
}

export const getListTransactions = async (
  id: string
): Promise<IListTransactionsResponse> => {
  const response: IListTransactionsResponse = await axiosInstance({
    url: `${endpoints.bank.GET_LIST_TRANSACTIONS}?page_size=20&link=${id}`,
    method: 'GET'
  })

  return response
}
