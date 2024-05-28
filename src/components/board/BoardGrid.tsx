import { css } from '@emotion/react'
import { useEffect } from 'react'
import { Responsive, WidthProvider } from 'react-grid-layout'
import { useRecoilValue } from 'recoil'
import { useRecoilState } from 'recoil'

import Panel from '@/components/board/Panel'
import { currentBoardQuery } from '@/store/boardState'
import { BoardItem, BoardState, boardState } from '@/store/boardState'
import { convertBoardStateToLayouts } from '@/utils/convertBoardStateToLayouts'

export interface Item {
  row: number
  col: number
  component: string
}

export interface ContainerState {
  panels: Item[]
}
const ResponsiveGridLayout = WidthProvider(Responsive)

const BoardGrid = () => {
  const [boards, setBoards] = useRecoilState<BoardState>(boardState)
  const boardData = useRecoilValue(currentBoardQuery)

  useEffect(() => {
    if (boardData) {
      setBoards(boardData)
    }
  }, [setBoards, boardData])

  return (
    <div css={boardWrap}>
      <div css={gridWrap}>
        <ResponsiveGridLayout
          layouts={convertBoardStateToLayouts(boards)}
          breakpoints={{ lg: 1000 }}
          cols={{ lg: 7 }}
          isResizable={false}
          rowHeight={130}
          useCSSTransforms={false}
          isDraggable={false}
          margin={[16, 16]}
          containerPadding={[0, 0]}
        >
          {boardData &&
            boards.lg.map((item: BoardItem) => (
              <div key={item.i}>
                <Panel key={item.i} isPreview={false} component={item.component} w={item.w} h={item.h} />
              </div>
            ))}
        </ResponsiveGridLayout>
      </div>
    </div>
  )
}

export default BoardGrid

const boardWrap = css`
  overflow: auto;
  display: flex;

  box-sizing: border-box;
  width: 100%;
  height: 100%;

  &&::-webkit-scrollbar {
    display: none;
  }
`

const gridWrap = css`
  width: 100%;
  padding: 0 40px;
`
