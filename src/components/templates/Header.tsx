'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { shallow } from 'zustand/shallow'
import dynamicClasses from 'clsx'
import { deleteCookie } from 'cookies-next'
import { useLocalStore } from '@/zustand/useStore'
import { optimizedClasses } from '@/utils/generateClasses'

import stylesHeader from '@/styles/components/header.module.scss'

export const Header = () => {
  const router = useRouter()
  const { setUser, user } = useLocalStore((state) => state, shallow)
  const pathName = usePathname()

  const onLogout = () => {
    deleteCookie('token')
    setUser(null)
    router.push('/login')
  }

  const classes = optimizedClasses(stylesHeader)

  const stylesLink = (path: string) =>
    dynamicClasses(classes('t-header__link'), {
      [classes('t-header__link--active')]: pathName === path
    })

  return (
    <header className={classes('t-header')}>
      <nav className={classes('t-header__nav')}>
        <ul className={classes('t-header__nav__list')}>
          <li>
            <Link href='/'>{`${
              user?.firstName ? `Hola ${user?.firstName}` : ''
            }`}</Link>
          </li>

          <li>
            <Link href='/' className={stylesLink('/')}>
              Inicio
            </Link>
          </li>
          {user?.email ? (
            <li>
              <Link
                onClick={onLogout}
                href={''}
                className={stylesLink('/logout')}
              >
                Cerrar sesión
              </Link>
            </li>
          ) : (
            <li>
              <Link href='/login' className={stylesLink('/login')}>
                Iniciar sesión
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  )
}
