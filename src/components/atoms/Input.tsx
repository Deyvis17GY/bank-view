import { InputProps } from '@/interfaces/components/atoms'

import styles from '@/styles/components/atoms/input.module.scss'

export const Input = ({
  type = 'text',
  placeholder,
  name,
  validation,
  register,
  error,
  iconName
}: InputProps) => {
  return (
    <div className={styles['a-input']}>
      {iconName && <i className={`pi ${iconName}`}></i>}
      <input
        type={type}
        placeholder={placeholder}
        className={styles['a-input__body']}
        {...register(name, validation)}
      />
      {error && !!Object.keys(error).length && (
        <>
          <span className={styles['a-input__errorMessage']}>
            {error.message as string}
          </span>
        </>
      )}
    </div>
  )
}
