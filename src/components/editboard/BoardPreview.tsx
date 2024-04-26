import { Theme } from '@emotion/react'
import { css } from '@emotion/react'
import { useEffect } from 'react'
import { Responsive, WidthProvider } from 'react-grid-layout'
import { useRecoilState, useRecoilValue } from 'recoil'
import Panel from '../board/Panel'

import { BoardItem, BoardState, boardState, currentBoardQuery } from '@/store/boardState'

interface Layouts {
  [P: string]: Layout[]
}

export interface Layout {
  i: string
  x: number
  y: number
  w: number
  h: number
}

const ResponsiveGridLayout = WidthProvider(Responsive)

const BoardPreview = () => {
  const [boards, setBoards] = useRecoilState<BoardState>(boardState)
  const boardData = useRecoilValue(currentBoardQuery)

  useEffect(() => {
    if (boardData) {
      setBoards(boardData)
    }
  }, [setBoards, boardData])

  const handleClickDelete = (itemId: string) => {
    setBoards((prevBoards) => {
      const updatedBoards = {
        ...prevBoards,
        lg: prevBoards.lg.filter((item: BoardItem) => item.i !== itemId),
      }
      return updatedBoards
    })
  }

  const onLayoutChange = (newLayout: BoardItem[]) => {
    setBoards((prevBoards) => {
      const updatedLayouts = newLayout.map((newItem: BoardItem) => {
        const foundItem: BoardItem | undefined = prevBoards.lg.find((prevItem: BoardItem) => prevItem.i === newItem.i)
        if (foundItem) {
          return {
            ...newItem,
            component: foundItem.component,
          }
        }
        return newItem
      })
      return { ...prevBoards, lg: updatedLayouts }
    })
  }

  const convertBoardStateToLayouts = (boardState: BoardState): Layouts => {
    const origin = boardState.lg.map((item) => ({
      i: item.i,
      x: item.x,
      y: item.y,
      w: item.w,
      h: item.h,
    }))
    return { lg: origin }
  }

  return (
    <div css={container}>
      <ResponsiveGridLayout
        layouts={convertBoardStateToLayouts(boards)}
        breakpoints={{ lg: 1000 }}
        cols={{ lg: 7 }}
        isResizable={true}
        rowHeight={130}
        useCSSTransforms={false}
        onLayoutChange={onLayoutChange}
      >
        {boardData &&
          boards.lg.map((item: BoardItem) => (
            <div key={item.i}>
              <Panel
                key={item.i}
                isPreview={true}
                component={item.component}
                onDelete={() => handleClickDelete(item.i)}
              />
            </div>
          ))}
      </ResponsiveGridLayout>
    </div>
  )
}

export default BoardPreview

const container = (theme: Theme) => css`
  overflow: hidden;

  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 40px;

  background-color: ${theme.previewBackground};
`
