import { endpoints } from '@/services/endpoints'
import { ITransactionsProps } from '@/interfaces/components/organisms'
import { IListTransactionsResponse } from '@/interfaces/services'

import { TransactionsContent } from '@/components/organisms/TransactionsContent'

const Transactions = async ({ params: { id } }: ITransactionsProps) => {
  const response = await fetch(
    `${endpoints.bank.GET_LIST_TRANSACTIONS}?&page=1&page_size=20&link=${id}`,
    {
      cache: 'no-store',
      headers: {
        Authorization: `Basic ${process.env.NEXT_PUBLIC_SECRET_KEY}`
      }
    }
  )
  const listTransactions: IListTransactionsResponse = await response.json()

  return <TransactionsContent transactions={listTransactions?.results} />
}

export default Transactions
