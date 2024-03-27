import axios from 'axios'

import { SigninRequestBody } from '@/types'

const { VITE_BASE_URL } = import.meta.env

const instance = axios.create({
  baseURL: VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

//TODO: 인증 구현 후 적용
/* const authInstance = axios.create({
  baseURL: VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `${localStorage.getItem('authToken')}`,
  },
}) */

export const login = async (body: SigninRequestBody) => {
  const res = await instance.post('/api/signin', body)
  return res
}
