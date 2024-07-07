import axios from 'axios'

import { BoardState } from '@/store/boardState'
import { AddDdayRequestBody, LoginRequestBody, SignUpRequestBody } from '@/types'

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
  const res = await instance.post('/users/login', body)
  return res.data
}

export const signUp = async (body: SignUpRequestBody) => {
  console.log('요청', body)
  const res = await instance.post('/users/register', body)
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

export const editBoard = async (body: BoardState, boardId: number) => {
  const res = await instance.post(`/api/board/${boardId}`, body, {
    headers: {
      Authorization: `${localStorage.getItem('accessToken')}`,
    },
  })
  return res.data
}

export const getDdayList = async () => {
  const res = await instance.get(`/api/dday`, {
    headers: {
      Authorization: `${localStorage.getItem('accessToken')}`,
    },
  })
  return res.data
}

// 디데이 추가
export const addDday = async (body: AddDdayRequestBody) => {
  const res = await instance.post(`/dday`, body, {
    headers: {
      Authorization: `${localStorage.getItem('accessToken')}`,
    },
  })
  return res.data
}
