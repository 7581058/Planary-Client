import { css } from '@emotion/react'
import { useEffect, useState } from 'react'
import { Layout, Responsive, WidthProvider } from 'react-grid-layout'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import Panel from '../board/Panel'
import BoardTitle from './BoardTitle'

import { BOARD_EDIT_RESIZING_ERROR } from '@/constants/alert'
import { useAlert } from '@/hooks/useAlert'
import {
  boardDataSelector,
  boardDirtyFlag,
  BoardItem,
  BoardState,
  currentBoardIdAtom,
  editableBoardDataAtom,
} from '@/store/boardState'
import { convertBoardStateToLayouts } from '@/utils/convertBoardStateToLayouts'
interface CustomDragEvent extends Event {
  dataTransfer: DataTransfer
}

const ResponsiveGridLayout = WidthProvider(Responsive)

const BoardPreview = () => {
  const [editableBoard, setEditableBoard] = useRecoilState(editableBoardDataAtom)
  const boardId = useRecoilValue(currentBoardIdAtom)
  const boardData = useRecoilValue(boardDataSelector(boardId))
  const setIsDirty = useSetRecoilState<boolean>(boardDirtyFlag)
  const { openAlert } = useAlert()
  const [resizeUpdates, setResizeUpdates] = useState<BoardState>({ lg: [] })

  useEffect(() => {
    if (boardData) {
      setEditableBoard({ lg: boardData.lg })
      setResizeUpdates({ lg: boardData.lg })
    }
  }, [boardData, setEditableBoard])

  const handleClickDelete = (itemId: string) => {
    setEditableBoard((prevBoards) => {
      const updatedBoards = {
        ...prevBoards,
        lg: prevBoards.lg.filter((item: BoardItem) => item.i !== itemId),
      }
      setResizeUpdates((prevUpdates) => ({
        ...prevUpdates,
        lg: updatedBoards.lg,
      }))

      return updatedBoards
    })
  }

  const isInvalidResizingSize = (component: string | undefined, w: number, h: number) => {
    if (component !== 'calendar') return false
    const invalidSizes = [
      { w: 1, h: 3 },
      { w: 1, h: 2 },
      { w: 2, h: 3 },
      { w: 4, h: 2 },
    ]
    return invalidSizes.some((size) => size.w === w && size.h === h)
  }

  const onLayoutChange = (currentLayout: Layout[]) => {
    const prevLayoutString = JSON.stringify(convertBoardStateToLayouts(editableBoard).lg)
    const newLayoutString = JSON.stringify(convertBoardStateToLayouts(currentLayout).lg)

    if (prevLayoutString !== newLayoutString) {
      setIsDirty(true)
    }

    setEditableBoard((prevBoards: BoardState) => {
      if (currentLayout) {
        const updatedLayouts = currentLayout.map((newItem) => {
          const foundItem: BoardItem | undefined = prevBoards.lg.find((prevItem: BoardItem) => prevItem.i === newItem.i)
          if (foundItem) {
            return {
              ...newItem,
              w: newItem.w,
              h: newItem.h,
              component: foundItem.component,
              i: foundItem.i,
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

  const generateUniqueId = () => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }

  const onDrop = (_layout: Layout[], layoutItem: Layout, e: CustomDragEvent) => {
    const widgetDataString = e.dataTransfer.getData('widgetData')
    const widgetData = JSON.parse(widgetDataString)

    setResizeUpdates((prevBoards) => {
      const newItem = {
        x: layoutItem.x,
        y: layoutItem.y - layoutItem.h,
        i: generateUniqueId(),
        ...widgetData,
      }

      const updatedLayouts = [...prevBoards.lg, newItem]

      return { ...prevBoards, lg: updatedLayouts }
    })
  }

  const onDropDragOver = () => {
    return { w: 2, h: 1 }
  }

  useEffect(() => {
    if (resizeUpdates) {
      setEditableBoard({ lg: resizeUpdates.lg })
    }
  }, [resizeUpdates, setEditableBoard])

  const onResizeStop = (_layout: Layout[], _oldItem: Layout, newItem: Layout) => {
    const foundItem = editableBoard.lg.find((item) => item.i === newItem.i)

    if (foundItem) {
      const isInvalidSize = isInvalidResizingSize(foundItem.component, newItem.w, newItem.h)

      const updatedWidth = isInvalidSize ? foundItem.w : newItem.w
      const updatedHeight = isInvalidSize ? foundItem.h : newItem.h

      //?HACK: 배치 이후 리사이징할때 리사이징 이전 배치로 돌아가지 않게하기위해 직접 변경, 현재는 문제가 없으나
      //?HACK: prev 를 사용하는게 일반적, 이후 문제 발생 가능성 높아 임시로 정상동작 위해 구현, 수정필요
      setResizeUpdates(() => {
        const updatedLayouts = editableBoard.lg.map((item) => {
          if (item.i === newItem.i) {
            return {
              ...item,
              w: updatedWidth,
              h: updatedHeight,
              component: item.component,
              i: item.i,
              minW: item.minW,
              maxW: item.maxW,
              minH: item.minH,
              maxH: item.maxH,
            }
          }
          return item
        })
        return { lg: updatedLayouts }
      })

      if (isInvalidSize) {
        openAlert(BOARD_EDIT_RESIZING_ERROR)
      }
    }
  }

  return (
    <div css={container}>
      <BoardTitle />
      <ResponsiveGridLayout
        layouts={convertBoardStateToLayouts(editableBoard.lg)}
        breakpoints={{ lg: 1000 }}
        cols={{ lg: 7 }}
        isResizable={true}
        rowHeight={130}
        useCSSTransforms={false}
        onLayoutChange={onLayoutChange}
        onDrop={onDrop}
        isDroppable={true}
        onDropDragOver={onDropDragOver}
        onResizeStop={onResizeStop}
      >
        {editableBoard.lg.length > 0 ? (
          editableBoard.lg.map((item: BoardItem) => (
            <div key={item.i}>
              <Panel
                widgetId={Number(item.i)}
                key={item.i}
                isPreview={false}
                isCovered={true}
                component={item.component}
                onDelete={() => handleClickDelete(item.i)}
                w={item.w}
                h={item.h}
              />
            </div>
          ))
        ) : (
          <div>배치된 위젯이 없습니다</div>
        )}
      </ResponsiveGridLayout>
    </div>
  )
}

export default BoardPreview

const container = css`
  overflow: auto;

  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 10px;

  &&::-webkit-scrollbar {
    display: none;
  }
`
