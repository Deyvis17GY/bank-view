import { ITokenData, IUser } from '@/interfaces/services'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface IStoreState {
  user: IUser | null
}

interface IStoreActions {
  setUser: (user: IUser | null) => void
}

const initialState: IStoreState = {
  user: null
}

export const useLocalStore = create<IStoreState & IStoreActions>()(
  devtools(
    persist(
      (set) => ({
        user: initialState.user,

        setUser: (v: IUser | null) =>
          set((state) => ({
            user: v
          }))
      }),
      {
        name: 'store'
      }
    )
  )
)
