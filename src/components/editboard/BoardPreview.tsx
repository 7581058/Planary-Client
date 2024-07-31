import { Theme } from '@emotion/react'
import { css } from '@emotion/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Layout, Responsive, WidthProvider } from 'react-grid-layout'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import Panel from '../board/Panel'

import { BOARD_EDIT_RESIZING_ERROR } from '@/constants/alert'
import { WidgetProps } from '@/constants/widget'
import { useAlert } from '@/hooks/useAlert'
import { boardDirtyFlag, BoardItem, boardState, currentBoardQuery } from '@/store/boardState'
import { convertBoardStateToLayouts } from '@/utils/convertBoardStateToLayouts'
interface CustomDragEvent extends Event {
  dataTransfer: DataTransfer
}

interface ItemSizeProps {
  [key: string]: WidgetProps
}

const ResponsiveGridLayout = WidthProvider(Responsive)

const BoardPreview = () => {
  const [boards, setBoards] = useRecoilState(boardState)
  const boardData = useRecoilValue(currentBoardQuery)
  const setIsDirty = useSetRecoilState<boolean>(boardDirtyFlag)
  const [itemSize, setItemSize] = useState<ItemSizeProps>({})
  const [prevSizes, setPrevSizes] = useState<{ [key: string]: { w: number; h: number } }>({})
  const [invalidResizing, setInvalidResizing] = useState(false)
  const { openAlert } = useAlert()

  useEffect(() => {
    if (boardData.lg) {
      setBoards(boardData)
    }
  }, [setBoards, boardData])

  /* useEffect(() => {
    if (invalidResizing) {
      openAlert(BOARD_EDIT_RESIZING_ERROR)
      setInvalidResizing(false)
    }
  }, [invalidResizing, openAlert]) */

  const handleClickDelete = (itemId: string) => {
    setBoards((prevBoards) => {
      const updatedBoards = {
        ...prevBoards,
        lg: prevBoards.lg.filter((item: BoardItem) => item.i !== itemId),
      }
      return updatedBoards
    })
  }

  // !FIX: 초기 -> 변경불가사이즈 -> 지정크기 -> 변경불가사이즈 적용시 사이즈 조정안되고 변경불가 사이즈로 지정됨
  // !FIX: 변경불가 -> 지정크기 -> 그외다른크기 -> 변경불가 시 에는 정상작동함
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

  const updateLayout = (newItem: Layout, foundItem: BoardItem) => {
    if (isInvalidResizingSize(foundItem.component, newItem.w, newItem.h)) {
      setInvalidResizing(true)
      return {
        ...newItem,
        ...foundItem,
        w: prevSizes[newItem.i]?.w || foundItem.w,
        h: prevSizes[newItem.i]?.h || foundItem.h,
      }
    }
    // 여기서 prevSizes 업데이트 하지 말고, onResize에서만 하자
    return { ...newItem, ...foundItem }
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
          const foundItem = prevBoards.lg.find((prevItem) => prevItem.i === newItem.i)
          return foundItem ? updateLayout(newItem, foundItem) : newItem
        })
        return { ...prevBoards, lg: updatedLayouts }
      }
      return prevBoards
    })
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
  const gridRef = useRef<ReactGridLayout>(null)

  const onResizeStop = (
    layout: Layout[],
    oldItem: Layout,
    newItem: Layout,
    _placeholder: Layout,
    _e: MouseEvent,
    _element: HTMLElement,
  ) => {
    // boards에서 현재 아이템 찾기
    const currentItem = boards.lg.find((item) => item.i === newItem.i)

    if (currentItem) {
      // isInvalidResizingSize 체크
      if (isInvalidResizingSize(currentItem.component, newItem.w, newItem.h)) {
        // 유효하지 않은 크기면 이전 크기 반환 (이게 중요!)
        setInvalidResizing(true)
        alert('안됨' + oldItem.h + oldItem.w)
        // 여기서 강제로 이전 크기로 설정
        setTimeout(() => {
          if (gridRef.current) {
            console.log('oldItem:', oldItem)
            const updatedLayouts = {
              lg: layout.map((item) => (item.i === newItem.i ? { ...item, w: oldItem.w, h: oldItem.h } : item)),
            }
            gridRef.current.setState({ layouts: updatedLayouts })
          }
        }, 0)

        return oldItem
      } else {
        // 유효한 크기면 새 크기 적용
        setBoards((prevBoards) => ({
          ...prevBoards,
          lg: prevBoards.lg.map((item) => (item.i === newItem.i ? { ...item, w: newItem.w, h: newItem.h } : item)),
        }))
        return newItem
      }
    }
    return newItem
  }
  //!fix : 리사이즈막기 구현
  return (
    <div css={container}>
      {boards.lg ? (
        <ResponsiveGridLayout
          ref={gridRef}
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
          onResizeStop={onResizeStop}
        >
          {boards.lg.map((item: BoardItem) => (
            <div key={item.i}>
              <Panel
                widgetId={Number(item.i)}
                key={item.i}
                isPreview={false}
                isCovered={true}
                component={item.component}
                onDelete={() => handleClickDelete(item.i)}
                w={itemSize[item.i]?.w || item.w}
                h={itemSize[item.i]?.h || item.h}
              />
            </div>
          ))}
        </ResponsiveGridLayout>
      ) : (
        <div css={emptyContainer}>
          <span>등록된 대시보드가 없습니다.</span>
        </div>
      )}
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

const emptyContainer = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  span {
    color: ${theme.subText};
  }
`
