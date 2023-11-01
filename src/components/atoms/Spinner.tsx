import { optimizedClasses } from '@/utils/generateClasses'

import styles from '@/styles/components/atoms/spinner.module.scss'

export const Spinner = () => {
  const classes = optimizedClasses(styles)

  return (
    <div className={classes('a-spinner')}>
      <div className={classes('a-spinner__loading')}></div>
    </div>
  )
}
