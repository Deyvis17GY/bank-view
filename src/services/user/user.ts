import { TResponse } from '@/types'
import axiosInstance from '../axiosInstance'
import { endpoints } from '../endpoints'
import { ILoginResponse } from '@/interfaces/services'
import { ILoginUser, IRegisterUser } from '@/interfaces'

export const userLogin = async ({
  user
}: {
  user: ILoginUser
}): Promise<TResponse<ILoginResponse>> => {
  const response: TResponse<ILoginResponse> = await axiosInstance({
    url: endpoints.user.POST_LOGIN,
    method: 'POST',
    data: user
  })

  return response
}

export const userRegister = async (user: IRegisterUser): Promise<TResponse> => {
  const response: TResponse = await axiosInstance({
    url: endpoints.user.POST_REGISTER,
    method: 'POST',
    data: user
  })

  return response
}
