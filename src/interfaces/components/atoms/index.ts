import { ValidationField } from '@/types'
import { ButtonHTMLAttributes, HTMLProps } from 'react'
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'

export interface ITitleProps extends HTMLProps<HTMLHeadingElement> {
  text: string
  type?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'
}

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
  bg?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  variant?: 'solid' | 'outline'
}

export interface InputProps extends HTMLProps<HTMLInputElement> {
  register?: any
  id?: string
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>
  validation?: ValidationField
  iconName?: string
}
