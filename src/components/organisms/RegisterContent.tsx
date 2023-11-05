'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { userRegister } from '@/services/user/user'
import { IRegisterUser } from '@/interfaces'
import { optimizedClasses } from '@/utils/generateClasses'
import { Title } from '@/components/atoms/Title'
import { Input } from '@/components/atoms/Input'
import { Button } from '@/components/atoms/Button'

import stylesLogin from '@/styles/components/organisms/login.module.scss'

export const RegisterContent = () => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IRegisterUser>()

  const onSubmitRegister = async (data: IRegisterUser) => {
    try {
      const res = await userRegister(data)
      if (res.statusCode !== 200) return
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
              fontSize: '1.25rem',
              color: '#020202'
            }}
          />
          <p className={classes('o-login__subtitle')}>Registra tus datos</p>
          <div className={classes('o-login__control')}>
            <Input
              name='firstName'
              placeholder='Nombre'
              register={register}
              iconName='pi-user'
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
              iconName='pi-user'
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
            <Button text='Registrarse' type='submit' bg='secondary' />
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
    </section>
  )
}
