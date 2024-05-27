import { Theme } from '@emotion/react'
import { css } from '@emotion/react'
import { useEffect, useState } from 'react'
import { Layout, Layouts, Responsive, WidthProvider } from 'react-grid-layout'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import Panel from '../board/Panel'

import { BOARD_EDIT_RESIZING_ERROR } from '@/constants/alert'
import { WidgetProps } from '@/constants/widget'
import { useAlert } from '@/hooks/useAlert'
import { boardDirtyFlag, BoardItem, BoardState, boardState, currentBoardQuery } from '@/store/boardState'
interface CustomDragEvent extends Event {
  dataTransfer: DataTransfer
}

interface ItemSizeProps {
  [key: string]: WidgetProps
}

const ResponsiveGridLayout = WidthProvider(Responsive)

const BoardPreview = () => {
  const [boards, setBoards] = useRecoilState<BoardState>(boardState)
  const boardData = useRecoilValue(currentBoardQuery)
  const setIsDirty = useSetRecoilState<boolean>(boardDirtyFlag)
  const [itemSize, setItemSize] = useState<ItemSizeProps>({})
  let invalidResizing = false
  const { openAlert } = useAlert()

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

  const isInvalidResizingSize = (component: string | undefined, w: number, h: number) => {
    if (component !== 'calendar') return false
    const invalidSizes = [
      { w: 1, h: 3 },
      { w: 2, h: 3 },
      { w: 4, h: 2 },
    ]
    return invalidSizes.some((size) => size.w === w && size.h === h)
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
            if (isInvalidResizingSize(foundItem.component, newItem.w, newItem.h)) {
              invalidResizing = true
              return {
                ...newItem,
                component: foundItem.component,
                x: newItem.x,
                y: newItem.y,
                w: 2,
                h: 1,
                minW: foundItem.minW,
                maxW: foundItem.maxW,
                minH: foundItem.minH,
                maxH: foundItem.maxH,
              }
            }
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

    if (invalidResizing) {
      openAlert(BOARD_EDIT_RESIZING_ERROR)
    }
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
   * !FIX: 위젯 추가 시 기존 패널위 드래그 할때(drag over안나타날때) 오류 발생 수정필요
   * !FIX: 위젯 추가 시 아래위로 이동 몇번 후 드롭하면 여러개 가끔 생길때 있음, 아이디 워닝 발생
   */
  const onDrop = (_layout: Layout[], layoutItem: Layout, e: CustomDragEvent) => {
    const widgetDataString = e.dataTransfer.getData('widgetData')
    const widgetData = JSON.parse(widgetDataString)

    setBoards((prevBoards) => {
      const updatedLayouts = prevBoards.lg.map((item) => {
        if (item.i === layoutItem.i) {
          return {
            x: layoutItem.x,
            y: layoutItem.y - layoutItem.h,
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

  const onResize = (_layout: Layout[], _oldItem: Layout, newItem: Layout) => {
    setItemSize((prevSize) => ({
      ...prevSize,
      [newItem.i]: { w: newItem.w, h: newItem.h },
    }))
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
        onResize={onResize}
      >
        {boardData &&
          boards.lg.map((item: BoardItem) => (
            <div key={item.i}>
              <Panel
                key={item.i}
                isPreview={true}
                component={item.component}
                onDelete={() => handleClickDelete(item.i)}
                w={itemSize[item.i]?.w || item.w}
                h={itemSize[item.i]?.h || item.h}
              />
            </div>
          ))}
      </ResponsiveGridLayout>
    </div>
  )
}

export default BoardPreview

const container = (theme: Theme) => css`
  overflow: auto;

  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 40px;

  background-color: ${theme.previewBackground};

  &&::-webkit-scrollbar {
    display: none;
  }
`
