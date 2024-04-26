import { atom, selector } from 'recoil'
import { currentUserToken } from './userState'

import { instance } from '@/api'
export interface BoardItem {
  i: string
  x: number
  y: number
  w: number
  h: number
  minW: number
  maxW: number
  minH: number
  maxH: number
  component: string
}
export interface BoardState {
  lg: BoardItem[]
}

export const currentBoardId = atom({
  key: 'currentBoardId',
  default: 0,
})

export const boardState = atom<BoardState>({
  key: 'boardState',
  default: {
    lg: [],
  },
})

export const currentBoardListQuery = selector({
  key: 'currentBoardListQuery',
  get: async ({ get }) => {
    const token = get(currentUserToken)
    try {
      const res = await instance.get('/api/boardList', {
        headers: {
          Authorization: token,
        },
      })
      return res.data
    } catch (error) {
      console.error('Failed to fetch user info:', error)
      return {}
    }
  },
})

export const currentBoardQuery = selector({
  key: 'currentBoardQuery',
  get: async ({ get }) => {
    const boardId = get(currentBoardId)
    const token = get(currentUserToken)
    if (!token) {
      return {}
    }
    try {
      const res = await instance.get(`/api/board/${boardId}`, {
        headers: {
          Authorization: token,
        },
      })
      return res.data
    } catch (error) {
      console.error('Failed to fetch user info:', error)
      return {}
    }
  },
})
