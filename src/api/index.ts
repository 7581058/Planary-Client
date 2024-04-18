import axios from 'axios'

import { LoginRequestBody } from '@/types'

const { VITE_BASE_URL } = import.meta.env

export const instance = axios.create({
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

export const login = async (body: LoginRequestBody) => {
  const res = await instance.post('/api/login', body)
  return res.data
}

export const getBoardList = async () => {
  const res = await instance.get('/api/boardList', {
    headers: {
      Authorization: `${localStorage.getItem('accessToken')}`,
    },
  })
  return res.data
}

export const getBoard = async (boardId: number) => {
  const res = await instance.get(`/api/board/${boardId}`, {
    headers: {
      Authorization: `${localStorage.getItem('accessToken')}`,
    },
  })
  return res.data
}
