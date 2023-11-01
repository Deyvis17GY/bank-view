import { BankInfo } from '@/interfaces/services'

export interface ICardProps {
  bank: BankInfo
  onClick?: () => void
  bgColor?: string
}
