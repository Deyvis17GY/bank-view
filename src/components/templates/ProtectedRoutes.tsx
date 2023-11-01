'use client'
import { shallow } from 'zustand/shallow'
import { useLocalStore } from '@/zustand/useStore'
import { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const router = useRouter()

  const { user } = useLocalStore((state) => state, shallow)

  useEffect(() => {
    if (!user?.token) {
      router.push('/login')
    }
  }, [router, user?.token])

  if (!user?.token) {
    return <></>
  }

  return <>{children}</>
}
