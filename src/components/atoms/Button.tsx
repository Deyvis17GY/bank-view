import dynamicClasses from 'clsx'
import { IButtonProps } from '@/interfaces/components/atoms'
import { optimizedClasses } from '@/utils/generateClasses'

import stylesButton from '@/styles/components/atoms/button.module.scss'

export const Button = ({ text, bg, ...props }: IButtonProps) => {
  const classes = optimizedClasses(stylesButton)

  const classButton = dynamicClasses(classes('a-button'), {
    [classes(`a-button--${bg}`)]: bg
  })

  return (
    <button className={classButton} {...props}>
      {text}
    </button>
  )
}
