import { css } from '@emotion/react'
import update from 'immutability-helper'
import { useCallback, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Clock from '../widget/Clock'

import Panel from '@/components/board/Panel'

export interface Item {
  id: number
  title: string
  row: number
  col: number
  component: JSX.Element
}

export interface ContainerState {
  panels: Item[]
}

const BoardGrid = () => {
  const [panels, setPanels] = useState([
    {
      id: 0,
      title: 'profile',
      row: 1,
      col: 3,
      component: <div>profile</div>,
    },
    {
      id: 1,
      title: 'player',
      row: 1,
      col: 2,
      component: <div>player</div>,
    },
    {
      id: 2,
      title: 'dday',
      row: 1,
      col: 2,
      component: <div>dday</div>,
    },
    {
      id: 3,
      title: 'minicalendar',
      row: 2,
      col: 3,
      component: <div>minicalendar</div>,
    },
    {
      id: 4,
      title: 'clock',
      row: 1,
      col: 2,
      component: <Clock />,
    },
    {
      id: 5,
      title: 'timer',
      row: 2,
      col: 2,
      component: <div>timer</div>,
    },
    {
      id: 6,
      title: 'todo',
      row: 1,
      col: 2,
      component: <div>todo</div>,
    },
  ])

  const movePanel = useCallback((dragIndex: number, hoverIndex: number) => {
    setPanels((prevPanels: Item[]) =>
      update(prevPanels, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevPanels[dragIndex] as Item],
        ],
      }),
    )
  }, [])

  const renderPanel = useCallback(
    (panel: { id: number; title: string; row: number; col: number; component: JSX.Element }, index: number) => {
      return (
        <Panel
          key={panel.id}
          index={index}
          id={panel.id}
          title={panel.title}
          row={panel.row}
          col={panel.col}
          movePanel={movePanel}
          component={panel.component}
        />
      )
    },
    [movePanel],
  )

  return (
    <DndProvider backend={HTML5Backend}>
      <div css={boardWrap}>{panels.map((item, index) => renderPanel(item, index))}</div>
    </DndProvider>
  )
}

export default BoardGrid

const boardWrap = css`
  overflow: hidden;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 15px;

  box-sizing: border-box;
  width: 100%;
  height: 100%;
`
