import { css } from '@emotion/react'

import BoardGrid from '@/components/board/BoardGrid'
import { glassPanel } from '@/styles/common'

const Board = () => {
  return (
    <div css={[boardContainer, glassPanel]}>
      <BoardGrid />
    </div>
  )
}

export default Board

const boardContainer = css`
  overflow: hidden;

  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 50px;
`
