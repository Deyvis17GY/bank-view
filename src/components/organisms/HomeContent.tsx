'use client'
import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { optimizedClasses } from '@/utils/generateClasses'
import { getListBankAccounts, postCreateBankLink } from '@/services/bank/bank'
import { useLocalStore } from '@/zustand/useStore'
import { shallow } from 'zustand/shallow'
import { BankInfo } from '@/interfaces/services'
import { ProtectedRoute } from '@/components/templates/ProtectedRoutes'
import { Card } from '@/components/molecules/Card'
import { Spinner } from '@/components/atoms/Spinner'
import { Title } from '@/components/atoms/Title'

import styles from '@/styles/components/organisms/home.module.scss'

export const HomeContent = () => {
  const [listBanks, setListBanks] = useState<BankInfo[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isLoadingLink, setIsLoadingLink] = useState<boolean>(false)

  const router = useRouter()
  const { user, selectedBank, setBankLink, setSelectedBank } = useLocalStore(
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
        setIsLoadingLink(true)
        setSelectedBank(data)
        const res = await postCreateBankLink({
          bank: data.name,
          username: user?.firstName?.split(' ')?.[0] ?? 'Deyvis'
        })
        if (!res) return
        setBankLink(res)
        router.push(`bank/${res.id}`)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoadingLink(false)
      }
    },
    [router, setBankLink, setSelectedBank, user?.firstName]
  )

  useEffect(() => {
    if (!user?.token) return
    onGetListBanks()
  }, [])

  return (
    <ProtectedRoute>
      <div className={classes('o-home')}>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            {!isLoading && listBanks.length !== 0 && (
              <Title
                text='Selecciona un banco:'
                className={classes('o-home__title')}
              />
            )}
            <div className={classes('o-home__container')}>
              {listBanks.map((bank) => (
                <Card
                  key={bank.id}
                  bank={bank}
                  onClick={() => onCreateBankLink(bank)}
                  isLoading={
                    bank.id === selectedBank?.id ? isLoadingLink : false
                  }
                />
              ))}
            </div>
          </>
        )}
      </div>
    </ProtectedRoute>
  )
}
