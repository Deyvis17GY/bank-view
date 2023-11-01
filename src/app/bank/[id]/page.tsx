import { endpoints } from '@/services/endpoints'
import { ITransactionsProps } from '@/interfaces/components/organisms'
import { IListTransactionsResponse } from '@/interfaces/services'

import { TransactionsContent } from '@/components/organisms/TransactionsContent'

const Transactions = async ({ params: { id } }: ITransactionsProps) => {
  return <TransactionsContent />
}

export default Transactions
