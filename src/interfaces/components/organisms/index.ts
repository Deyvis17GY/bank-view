import { IListTransactionsResponse } from '@/interfaces/services'

export interface ITransactionsProps {
  params: {
    id: string
  }
}

export interface ITransactionsContent {
  transactions: IListTransactionsResponse['results'] | []
}
