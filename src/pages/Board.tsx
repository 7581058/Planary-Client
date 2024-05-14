import { css } from '@emotion/react'
import React from 'react'

import BoardGrid from '@/components/board/BoardGrid'
import BoardMenu from '@/components/board/BoardMenu'

const Board = () => {
  return (
    <div css={[boardContainer]}>
      <React.Suspense fallback={<></>}>
        <BoardMenu />
        <BoardGrid />
      </React.Suspense>
    </div>
  )
}

export default Board

const boardContainer = css`
  overflow: hidden;
  display: flex;
  flex-direction: column;

  box-sizing: border-box;
  width: 100%;
  height: 100%;
`
