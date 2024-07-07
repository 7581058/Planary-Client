import { Layout } from 'react-grid-layout'
import { atom, selector } from 'recoil'
import { currentUserToken } from './userState'

import { instance } from '@/api'

export interface BoardItem extends Layout {
  component?: string
  widgetId: number
}
export interface BoardState {
  lg: BoardItem[]
}

export const boardDirtyFlag = atom({
  key: 'boardDirtyFlag',
  default: false,
})

export const currentBoardId = atom<number | null>({
  key: 'currentBoardId',
  default: null,
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
      const res = await instance.get('/dashboard/list', {
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
    if (!token || boardId === null) {
      return { lg: [] }
    }
    try {
      const res = await instance.get(`/dashboard/${boardId}`, {
        headers: {
          Authorization: token,
        },
      })
      return res.data || { lg: [] }
    } catch (error) {
      console.error('Failed to fetch user info:', error)
      return { lg: [] }
    }
  },
})
