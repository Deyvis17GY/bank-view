'use client'
import { FormEvent } from 'react'
import Link from 'next/link'
import { shallow } from 'zustand/shallow'
import { useLocalStore } from '@/zustand/useStore'
import { userRegister } from '@/services/user/user'

import { Button } from '../atoms/Button'

import stylesLogin from '@/styles/components/organisms/login.module.scss'
import { optimizedClasses } from '@/utils/generateClasses'
import { Title } from '../atoms/Title'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { Input } from '../atoms/Input'

export const RegisterContent = () => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IRegisterUser>()

  const onSubmitRegister = async (data: IRegisterUser) => {
    try {
      await userRegister(data)
      router.push('/login')
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
              fontSize: '1.25rem'
            }}
          />
          <p>Registra tus datos</p>
          <div className={classes('o-login__control')}>
            <Input
              name='firstName'
              placeholder='Nombre'
              register={register}
              validation={{
                pattern: {
                  value: /^[a-zA-Z]+$/,
                  message: 'solo letras'
                }
              }}
              error={errors.firstName}
            />
          </div>
          <div className={classes('o-login__control')}>
            <Input
              name='lastName'
              placeholder='Apellido'
              register={register}
              validation={{
                pattern: {
                  value: /^[a-zA-Z]+$/,
                  message: 'solo letras'
                }
              }}
              error={errors.lastName}
            />
          </div>
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
            <Button text='Registrarse' type='submit' bg='primary' />
          </div>
          <div className={classes('o-login__control')}>
            <p>
              ¿Ya tienes una cuenta?{' '}
              <Link className={classes('o-login__control__link')} href='/login'>
                Iniciar Sesión
              </Link>
            </p>
          </div>
        </form>
      </article>
      <article className='bg-blue'></article>
      <article className='bg-orange'></article>
      <article className='bg-green'></article>
    </section>
  )
}
