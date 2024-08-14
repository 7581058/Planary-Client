import { Layout } from 'react-grid-layout'
import { atom, selector } from 'recoil'

import { getBoard } from '@/api'

export interface BoardItem extends Layout {
  component?: string
  widgetId: number
}
export interface BoardState {
  lg: BoardItem[]
}

export interface BoardListItem {
  id: number
  theme: string
  title: string
}

export interface BoardListState {
  boardList: BoardListItem[]
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

export const boardListState = atom({
  key: 'boardListState',
  default: [],
})

export const currentBoardQuery = selector({
  key: 'currentBoardQuery',
  get: async ({ get }) => {
    const boardId = get(currentBoardId)

    if (boardId === null) {
      return { lg: [] }
    }

    try {
      const res = await getBoard(boardId)
      return res || { lg: [] }
    } catch (error) {
      console.error('Failed to fetch dashboard:', error)
      throw error
    }
  },
})
