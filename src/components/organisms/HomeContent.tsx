'use client'
import { optimizedClasses } from '@/utils/generateClasses'
import { useCallback, useEffect, useState } from 'react'
import {
  getListBankAccounts,
  getListTransactions,
  postCreateBankLink
} from '@/services/bank/bank'
import { useLocalStore } from '@/zustand/useStore'
import { shallow } from 'zustand/shallow'
import { useRouter } from 'next/navigation'
import { BankInfo } from '@/interfaces/services'
import { Card } from '@/components/molecules/Card'
import { Spinner } from '@/components/atoms/Spinner'

import styles from '@/styles/components/organisms/home.module.scss'

export const HomeContent = () => {
  const [listBanks, setListBanks] = useState<BankInfo[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const router = useRouter()
  const { user, setBankLink, setSelectedBank } = useLocalStore(
    (state) => state,
    shallow
  )

  const classes = optimizedClasses(styles)

  const onGetListBanks = useCallback(async () => {
    setIsLoading(true)
    try {
      const res = await getListBankAccounts()
      setListBanks(res.results)

      return res
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const onCreateBankLink = useCallback(
    async (data: BankInfo) => {
      try {
        const res = await postCreateBankLink({
          bank: data.name,
          username: user?.firstName ?? 'Deyvis'
        })

        setBankLink(res)
        setSelectedBank(data)
        router.push(`bank/${res.id}`)
      } catch (error) {
        console.error(error)
      }
    },
    [router, setBankLink, setSelectedBank, user?.firstName]
  )

  useEffect(() => {
    onGetListBanks()
  }, [])

  return (
    <div className={classes('o-home')}>
      {isLoading ? (
        <Spinner />
      ) : (
        listBanks.map((bank) => (
          <Card
            key={bank.id}
            bank={bank}
            onClick={() => onCreateBankLink(bank)}
          />
        ))
      )}
    </div>
  )
}
