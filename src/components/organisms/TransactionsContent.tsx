'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ITransactionsContent } from '@/interfaces/components/organisms'
import { useLocalStore } from '@/zustand/useStore'
import { shallow } from 'zustand/shallow'
import { ResultType } from '@/interfaces/services'
import { priceFormatter } from '@/utils/formatter'
import { optimizedClasses } from '@/utils/generateClasses'
import { Card } from '@/components/molecules/Card'
import { Title } from '@/components/atoms/Title'
import { Spinner } from '@/components/atoms/Spinner'

import styles from '@/styles/components/organisms/transaction.module.scss'

export const TransactionsContent = ({ transactions }: ITransactionsContent) => {
  const [balance, setBalance] = useState(0)
  const [currency, setCurrency] = useState('COP')
  const router = useRouter()

  const { selectedBank } = useLocalStore((state) => state, shallow)

  const totalInflows = transactions?.filter((t) => t.type === ResultType.Inflow)
  const totalOutflows = transactions?.filter(
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

  useEffect(() => {
    if (transactions.length === 0) {
      router.refresh()
    }
  }, [router, transactions])

  const classes = optimizedClasses(styles)

  return (
    <div className={classes('o-transaction')}>
      {Array.isArray(transactions) && transactions.length ? (
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
              {transactions.map((transaction) => (
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
            <p className={classes('o-transaction__note')}>
              Nota: son las primeras 20 transacciones
            </p>
          </section>
        </>
      ) : (
        <Spinner />
      )}
    </div>
  )
}
