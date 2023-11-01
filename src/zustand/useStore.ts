import {
  ILinkCreateResponse,
  IUser,
  BankInfo,
  IListTransactionsResponse
} from '@/interfaces/services'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface IStoreState {
  user: IUser | null
  bankLink: ILinkCreateResponse | null
  selectedBank: BankInfo | null
  listTransactions: IListTransactionsResponse['results'] | null
}

interface IStoreActions {
  setUser: (user: IUser | null) => void
  setBankLink: (link: ILinkCreateResponse | null) => void
  setSelectedBank: (bank: BankInfo | null) => void
  setListTransactions: (
    transactions: IListTransactionsResponse['results'] | null
  ) => void
}

const initialState: IStoreState = {
  user: null,
  bankLink: null,
  selectedBank: null,
  listTransactions: null
}

export const useLocalStore = create<IStoreState & IStoreActions>()(
  devtools(
    persist(
      (set) => ({
        user: initialState.user,
        bankLink: initialState.bankLink,
        selectedBank: initialState.selectedBank,
        listTransactions: initialState.listTransactions,
        setUser: (v: IUser | null) =>
          set((state) => ({
            user: v
          })),
        setBankLink: (v: ILinkCreateResponse | null) =>
          set((state) => ({
            bankLink: v
          })),
        setSelectedBank: (v: BankInfo | null) =>
          set((state) => ({
            selectedBank: v
          })),
        setListTransactions: (v: IListTransactionsResponse['results'] | null) =>
          set((state) => ({
            listTransactions: v
          }))
      }),
      {
        name: 'store'
      }
    )
  )
)
