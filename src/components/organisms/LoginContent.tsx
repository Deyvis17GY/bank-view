'use client'
import { shallow } from 'zustand/shallow'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { setCookie } from 'cookies-next'
import Link from 'next/link'
import { userLogin } from '@/services/user/user'
import { ILoginUser } from '@/interfaces'
import { useLocalStore } from '@/zustand/useStore'
import { optimizedClasses } from '@/utils/generateClasses'
import { Title } from '@/components/atoms/Title'
import { Button } from '@/components/atoms/Button'
import { Input } from '@/components/atoms/Input'

import stylesLogin from '@/styles/components/organisms/login.module.scss'

export const LoginContent = () => {
  const router = useRouter()
  const { setUser } = useLocalStore((state) => state, shallow)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ILoginUser>()

  const onSubmitRegister = async (data: ILoginUser) => {
    try {
      const res = await userLogin({
        user: data
      })

      if (res.statusCode !== 200) {
        return
      }

      setUser(res.body.data)
      setCookie('token', res.body.data.token)
      router.push('/')
    } catch (error) {
      console.error(error)
    }
  }

  const classes = optimizedClasses(stylesLogin)

  return (
    <section className={classes('o-login')}>
      <article className={classes('o-login__content')}>
        <form
          className={classes('o-login__form')}
          onSubmit={handleSubmit(onSubmitRegister)}
        >
          <Title
            text='Hola'
            style={{
              fontWeight: 600,
              fontSize: '1.25rem',
              color: '#020202'
            }}
          />
          <p className={classes('o-login__subtitle')}>Ingresa tus datos</p>
          <div className={classes('o-login__control')}>
            <Input
              placeholder='Correo'
              register={register}
              name='email'
              error={errors.email}
              iconName='pi-user'
              validation={{
                required: 'El correo es requerido',
                pattern: {
                  value:
                    /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)*(\.[a-zA-Z]{2,})$/,
                  message: 'debe ser un correo'
                }
              }}
            />
          </div>
          <div className={classes('o-login__control')}>
            <Input
              type='password'
              placeholder='Contraseña'
              register={register}
              name='password'
              error={errors.password}
              iconName='pi-key'
              validation={{
                required: 'La contraseña es requerida',
                minLength: {
                  value: 6,
                  message: 'debe ser mayor a 6 caracteres'
                }
              }}
            />
          </div>
          <div className={classes('o-login__control')}>
            <Button text='Ingresar' type='submit' bg='secondary' />
          </div>
          <div className={classes('o-login__control')}>
            <p className={classes('o-login__control__text')}>
              ¿No tienes una cuenta?{' '}
              <Link
                className={classes('o-login__control__link')}
                href='/register'
              >
                Regístrate
              </Link>
            </p>
          </div>
        </form>
      </article>
    </section>
  )
}
