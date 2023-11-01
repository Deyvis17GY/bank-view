'use client'

import { IListTransactionsResponse, ResultType } from '@/interfaces/services'
import { useCallback, useEffect, useState } from 'react'
import { Title } from '../atoms/Title'
import { priceFormatter } from '@/utils/formatter'

import styles from '@/styles/components/organisms/transaction.module.scss'
import { optimizedClasses } from '@/utils/generateClasses'
import { Card } from '../molecules/Card'
import { useLocalStore } from '@/zustand/useStore'
import { shallow } from 'zustand/shallow'
import { getListTransactions } from '@/services/bank/bank'
import { useParams } from 'next/navigation'

export const TransactionsContent = () => {
  const [balance, setBalance] = useState(0)
  const [currency, setCurrency] = useState('COP')

  const params = useParams()

  const { selectedBank, listTransactions } = useLocalStore(
    (state) => state,
    shallow
  )

  const totalInflows = listTransactions?.filter(
    (t) => t.type === ResultType.Inflow
  )
  const totalOutflows = listTransactions?.filter(
    (t) => t.type === ResultType.Outflow
  )

  useEffect(() => {
    if (!Array.isArray(totalInflows) || !Array.isArray(totalOutflows)) return
    const totalReduceInflows = totalInflows.reduce(
      (total, inflow) => total + inflow.amount,
      0
    )
    const totalReduceOutflows = totalOutflows.reduce(
      (total, outflow) => total + outflow.amount,
      0
    )

    const totalBalance = totalReduceInflows - totalReduceOutflows

    setBalance(totalBalance)
    setCurrency(totalInflows?.[0]?.currency)
  }, [totalInflows, totalOutflows])

  const classes = optimizedClasses(styles)

  return (
    <div className={classes('o-transaction')}>
      {Array.isArray(listTransactions) && listTransactions.length ? (
        <>
          {selectedBank && <Card bank={selectedBank} />}
          <Title
            className={classes('o-transaction__title')}
            text={`KPI (Balance): ${priceFormatter(
              Math.round(balance),
              currency
            )}`}
            type='h1'
            style={{
              color: selectedBank?.primary_color
            }}
          />
          <section className={classes('o-transaction__section')}>
            <Title
              className={classes('o-transaction__subtitle')}
              text={'Movimientos:'}
              type='h2'
            />
            <ul className={classes('o-transaction__list')}>
              {listTransactions.map((transaction) => (
                <li
                  className={classes('o-transaction__list__item')}
                  key={transaction.id}
                >
                  {transaction.value_date.toString()}

                  <span
                    className={classes(
                      `o-transaction--${
                        transaction.type === ResultType.Outflow
                          ? 'negative'
                          : ''
                      }`
                    )}
                  >
                    {priceFormatter(transaction.amount, transaction.currency)}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </>
      ) : (
        <Title
          className={classes('o-transaction__message')}
          text={'Este Banco no cuenta con movimientos'}
          type='h1'
        />
      )}
    </div>
  )
}
