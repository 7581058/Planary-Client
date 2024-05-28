import { Layout, Layouts } from 'react-grid-layout'

import { BoardState } from '@/store/boardState'
export const convertBoardStateToLayouts = (boardState: BoardState | Layout[]): Layouts => {
  const layouts: Layouts = {}

  if (!boardState) {
    return layouts
  }

  if ('lg' in boardState && Array.isArray(boardState.lg)) {
    layouts.lg = boardState.lg.map((item) => ({
      i: item.i,
      x: item.x,
      y: item.y,
      w: item.w,
      h: item.h,
      minW: item.minW,
      maxW: item.maxW,
      minH: item.minH,
      maxH: item.maxH,
    }))
  } else if (Array.isArray(boardState)) {
    layouts.lg = boardState.map((item) => ({
      i: item.i,
      x: item.x,
      y: item.y,
      w: item.w,
      h: item.h,
      minW: item.minW,
      maxW: item.maxW,
      minH: item.minH,
      maxH: item.maxH,
    }))
  }

  return layouts
}
