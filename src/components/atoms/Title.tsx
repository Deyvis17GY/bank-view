import { ITitleProps } from '@/interfaces/components/atoms'
import stylesTitle from '@/styles/components/atoms/title.module.scss'
import dynamicStyles from 'clsx'

export const Title = ({ text, className, type, ...props }: ITitleProps) => {
  const titleClass = dynamicStyles(stylesTitle, {
    [className ?? '']: className
  })

  const conditionalTypes = () => {
    const renderTypes: Record<string, JSX.Element> = {
      h1: (
        <h1 className={titleClass} {...props}>
          {text}
        </h1>
      ),
      h2: (
        <h2 className={titleClass} {...props}>
          {text}
        </h2>
      ),
      h3: (
        <h3 className={titleClass} {...props}>
          {text}
        </h3>
      ),
      h4: (
        <h4 className={titleClass} {...props}>
          {text}
        </h4>
      ),
      h5: (
        <h5 className={titleClass} {...props}>
          {text}
        </h5>
      ),
      h6: (
        <h6 className={titleClass} {...props}>
          {text}
        </h6>
      ),
      p: (
        <p className={titleClass} {...props}>
          {text}
        </p>
      )
    }

    return renderTypes[type as string] ?? renderTypes.h1
  }

  return <>{conditionalTypes()}</>
}
