import axios from 'axios'

import { BoardState } from '@/store/boardState'
import {
  DdayCarouselSettingsRequestBody,
  DdayOrderUpdateRequestBody,
  DdayPostRequestBody,
  DdayRequestBody,
  LoginRequestBody,
  SignUpRequestBody,
} from '@/types'

const { VITE_BASE_URL } = import.meta.env

const baseConfig = {
  baseURL: VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
}

export const instance = axios.create(baseConfig)

export const authInstance = axios.create({
  ...baseConfig,
  headers: {
    ...baseConfig.headers,
    Authorization: `${localStorage.getItem('accessToken')}`,
  },
})

//로그인
export const login = async (body: LoginRequestBody) => {
  const res = await instance.post('/users/login', body)
  return res.data
}

//회원가입
export const signUp = async (body: SignUpRequestBody) => {
  const res = await instance.post('/users/register', body)
  return res.data
}

//대시보드 목록 조회
export const getBoardList = async () => {
  const res = await authInstance.get('/dashboard/list')
  return res.data
}

//대시보드 아이디로 대시보드 조회(해당 대시보드 전체 위젯 정보)
export const getBoard = async (boardId: number | null) => {
  const res = await authInstance.get(`/dashboard/${boardId}`)
  return res.data
}

//대시보드 수정
export const editBoard = async (body: BoardState, boardId: number) => {
  const res = await authInstance.post(`/api/board/${boardId}`, body)
  return res.data
}

//디데이 목록 조회
export const getDdayList = async (widgetId: number | null) => {
  const res = await authInstance.get(`/dday/${widgetId}`)
  return res.data
}

// 디데이 추가
export const addDday = async (body: DdayRequestBody) => {
  const res = await authInstance.post(`/dday`, body)
  return res.data
}

// 디데이 삭제
export const deleteDday = async (ddayId: number) => {
  const res = await authInstance.delete(`/dday/${ddayId}`)
  return res.data
}

// 디데이 수정
export const updateDday = async (ddayId: number | null, body: DdayPostRequestBody) => {
  const res = await authInstance.put(`/dday/${ddayId}`, body)
  return res.data
}

// 디데이 캐러셀 자동 재생 전환
export const updateDdayCarouselSettings = async (widgetId: number | null, body: DdayCarouselSettingsRequestBody) => {
  const res = await authInstance.put(`/dday/${widgetId}/auto`, body)
  return res.data
}

// 디데이 순서 변경
export const updateDdayOrder = async (body: DdayOrderUpdateRequestBody[]) => {
  const res = await authInstance.put(`/dday/order`, body)
  return res.data
}
