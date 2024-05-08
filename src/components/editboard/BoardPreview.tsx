import { Theme } from '@emotion/react'
import { css } from '@emotion/react'
import { useEffect } from 'react'
import { Layout, Layouts, Responsive, WidthProvider } from 'react-grid-layout'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import Panel from '../board/Panel'

import { boardDirtyFlag, BoardItem, BoardState, boardState, currentBoardQuery } from '@/store/boardState'
interface CustomDragEvent extends Event {
  dataTransfer: DataTransfer
}

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

  const onLayoutChange = (currentLayout: Layout[]) => {
    const prevLayoutString = JSON.stringify(convertBoardStateToLayouts(boards).lg)
    const newLayoutString = JSON.stringify(convertBoardStateToLayouts(currentLayout).lg)

    if (prevLayoutString !== newLayoutString) {
      setIsDirty(true)
    }

    setBoards((prevBoards) => {
      if (currentLayout) {
        const updatedLayouts = currentLayout.map((newItem) => {
          const foundItem: BoardItem | undefined = prevBoards.lg.find((prevItem: BoardItem) => prevItem.i === newItem.i)
          if (foundItem) {
            return {
              ...newItem,
              component: foundItem.component,
              x: newItem.x,
              y: newItem.y,
              w: newItem.w,
              h: newItem.h,
              minW: foundItem.minW,
              maxW: foundItem.maxW,
              minH: foundItem.minH,
              maxH: foundItem.maxH,
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

  const generateUniqueId = () => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }

  /**
   * !FIX: 드롭 추가 시 지정위치보다 +1 돼서 놓여짐 수정필요
   * !FIX: 위젯 추가 시 기존 패널위 드래그 할때 오류 발생 수정필요
   * !FIX: 위젯 추가 시 아래위로 이동 몇번 후 드롭하면 여러개 가끔 생길때 있음, 아이디 워닝 발생
   */
  const onDrop = (_layout: Layout[], layoutItem: Layout, e: CustomDragEvent) => {
    const widgetDataString = e.dataTransfer.getData('widgetData')
    const widgetData = JSON.parse(widgetDataString)
    setBoards((prevBoards) => {
      const updatedLayouts = prevBoards.lg.map((item) => {
        if (item.i === layoutItem.i) {
          return {
            x: item.x,
            y: item.y,
            i: generateUniqueId(),
            ...widgetData,
          }
        }
        return item
      })

      return { ...prevBoards, lg: updatedLayouts }
    })
  }

  const onDropDragOver = () => {
    return { w: 2, h: 1 }
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
        onDrop={onDrop}
        isDroppable={true}
        onDropDragOver={onDropDragOver}
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
