import { Theme } from '@emotion/react'
import { css } from '@emotion/react'
import { useEffect } from 'react'
import { Layout, Layouts, Responsive, WidthProvider } from 'react-grid-layout'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import Panel from '../board/Panel'

import { boardDirtyFlag, BoardItem, BoardState, boardState, currentBoardQuery } from '@/store/boardState'

const ResponsiveGridLayout = WidthProvider(Responsive)

const BoardPreview = () => {
  const [boards, setBoards] = useRecoilState<BoardState>(boardState)
  const boardData = useRecoilValue(currentBoardQuery)
  const setIsDirty = useSetRecoilState<boolean>(boardDirtyFlag)

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

  const onLayoutChange = (currentLayout: Layout[] | BoardState) => {
    const prevLayoutString = JSON.stringify(convertBoardStateToLayouts(boards).lg)
    const newLayoutString = JSON.stringify(convertBoardStateToLayouts(currentLayout).lg)

    if (prevLayoutString !== newLayoutString) {
      setIsDirty(true)
    }

    setBoards((prevBoards) => {
      if ('lg' in currentLayout && Array.isArray(currentLayout.lg)) {
        const updatedLayouts = currentLayout.lg.map((newItem) => {
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
      } else {
        return prevBoards
      }
    })
  }

  const convertBoardStateToLayouts = (boardState: BoardState | Layout[]): Layouts => {
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
