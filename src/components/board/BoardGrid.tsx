import { css } from '@emotion/react'
import { Theme } from '@emotion/react'
import { useEffect } from 'react'
import { Responsive, WidthProvider } from 'react-grid-layout'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { useRecoilState } from 'recoil'
import BoardListSelect from './BoardListSelect'

import Panel from '@/components/board/Panel'
import { DASHBOARD_EDIT_PATH } from '@/constants/paths'
import { currentBoardQuery } from '@/store/boardState'
import { BoardItem, boardState } from '@/store/boardState'
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
  const navigate = useNavigate()
  const [boards, setBoards] = useRecoilState(boardState)
  const boardData = useRecoilValue(currentBoardQuery)

  useEffect(() => {
    if (boardData.lg) {
      setBoards(boardData)
    }
  }, [setBoards, boardData])

  const handleClickAdd = () => {
    navigate(DASHBOARD_EDIT_PATH)
  }

  return (
    <div css={boardWrap}>
      <div css={selectWrap}>
        <BoardListSelect />
      </div>
      {boards.lg ? (
        <ResponsiveGridLayout
          layouts={convertBoardStateToLayouts(boards)}
          breakpoints={{ lg: 1000 }}
          cols={{ lg: 7 }}
          isResizable={false}
          rowHeight={130}
          useCSSTransforms={false}
          isDraggable={false}
        >
          {boards.lg.map((item: BoardItem) => (
            <div key={item.i}>
              <Panel
                widgetId={Number(item.i)}
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
      ) : (
        <div css={emptyContainer}>
          <span>등록된 대시보드가 없습니다.</span>
          <button onClick={handleClickAdd} css={addButton}>
            대시보드 추가 하러 가기
          </button>
        </div>
      )}
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

const addButton = (theme: Theme) => css`
  height: 40px;
  color: ${theme.buttonText};
  background-color: ${theme.button};
  border-radius: 8px;
`
