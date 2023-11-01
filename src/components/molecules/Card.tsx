import Image from 'next/image'
import { ICardProps } from '@/interfaces/components/molecules'
import { optimizedClasses } from '@/utils/generateClasses'
import { Title } from '@/components/atoms/Title'

import styles from '@/styles/components/molecules/card.module.scss'

export const Card = ({ bank, onClick }: ICardProps) => {
  const classes = optimizedClasses(styles)

  return (
    <div
      className={classes('m-card')}
      style={{
        backgroundColor: bank.primary_color
      }}
      key={bank.id}
      onClick={onClick}
    >
      {bank?.icon_logo && (
        <Image
          className={classes('m-card__logo')}
          src={bank.icon_logo}
          alt={bank.display_name}
          width={50}
          height={50}
        />
      )}
      <Title
        text={bank.display_name}
        type='h2'
        className={classes('m-card__name')}
      />
    </div>
  )
}
