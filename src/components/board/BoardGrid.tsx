import { css } from '@emotion/react'
import { useEffect } from 'react'
import { Responsive, WidthProvider } from 'react-grid-layout'
import { useRecoilValue } from 'recoil'
import { useRecoilState } from 'recoil'
import BoardListSelect from './BoardListSelect'

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
      <div css={selectWrap}>
        <BoardListSelect />
      </div>
      <ResponsiveGridLayout
        layouts={convertBoardStateToLayouts(boards)}
        breakpoints={{ lg: 1000 }}
        cols={{ lg: 7 }}
        isResizable={false}
        rowHeight={130}
        useCSSTransforms={false}
        isDraggable={false}
      >
        {boardData &&
          boards.lg.map((item: BoardItem) => (
            <div key={item.i}>
              <Panel
                widgetId={item.widgetId}
                key={item.i}
                isPreview={false}
                component={item.component}
                w={item.w}
                h={item.h}
                isCovered={false}
              />
            </div>
          ))}
      </ResponsiveGridLayout>
    </div>
  )
}

export default BoardGrid

const boardWrap = css`
  position: relative;

  overflow: auto;

  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 40px;

  &&::-webkit-scrollbar {
    display: none;
  }
`

const selectWrap = css`
  position: absolute;
  top: 10px;
  left: 10px;
`
