import axios from 'axios'

import { BoardState } from '@/store/boardState'
import {
  DdayCarouselSettingsRequestBody,
  DdayOrderUpdateRequestBody,
  DdayRequestBody,
  LoginRequestBody,
  SignUpRequestBody,
} from '@/types'

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
export const addDday = async (body: DdayRequestBody) => {
  const res = await instance.post(`/dday`, body, {
    headers: {
      Authorization: `${localStorage.getItem('accessToken')}`,
    },
  })
  return res.data
}

// 디데이 삭제
export const deleteDday = async (ddayId: number) => {
  const res = await instance.delete(`/dday/${ddayId}`, {
    headers: {
      Authorization: `${localStorage.getItem('accessToken')}`,
    },
  })
  return res.data
}

// 디데이 수정
export const updateDday = async (ddayId: number | null, body: DdayRequestBody) => {
  const res = await instance.put(`/dday/${ddayId}`, body, {
    headers: {
      Authorization: `${localStorage.getItem('accessToken')}`,
    },
  })
  return res.data
}

// 디데이 캐러셀 자동 재생 전환
export const updateDdayCarouselSettings = async (widgetId: number | null, body: DdayCarouselSettingsRequestBody) => {
  const res = await instance.put(`/dday/${widgetId}/auto`, body, {
    headers: {
      Authorization: `${localStorage.getItem('accessToken')}`,
    },
  })
  return res.data
}

// 디데이 순서 변경
export const updateDdayOrder = async (body: DdayOrderUpdateRequestBody[]) => {
  const res = await instance.put(`/dday/order`, body, {
    headers: {
      Authorization: `${localStorage.getItem('accessToken')}`,
    },
  })
  return res.data
}
