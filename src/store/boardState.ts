import { Layout } from 'react-grid-layout'
import { atom, selectorFamily } from 'recoil'

import { getBoard } from '@/api'

export interface BoardItem extends Layout {
  component?: string
  widgetId?: number
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

export const boardListAtom = atom({
  key: 'boardListAtom',
  default: [],
})

export const currentBoardIdAtom = atom<number | null>({
  key: 'currentBoardIdAtom',
  default: null,
})

// 수정 가능한 보드 데이터
export const editableBoardDataAtom = atom<BoardState>({
  key: 'editableBoardDataAtom',
  default: {
    lg: []
  },
})

export const boardDataSelector = selectorFamily({
  key: 'boardDataSelector',
  get:
    (boardId: number | null) =>
      async ({ get }) => {
        if (boardId === null) {
          return { lg: [] }
        }
        const currentData = await getBoard(boardId)
        return currentData;
      },
  set:
    (boardId: number | null) =>
      ({ set }, newValue) => {
        set(editableBoardDataAtom, newValue)
        //updateBoardData(boardId, newValue)
      },
})
