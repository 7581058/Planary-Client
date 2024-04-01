import { css } from '@emotion/react'
import update from 'immutability-helper'
import { useCallback, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import Panel from '@/components/board/Panel'

export interface Item {
  id: number
  title: string
}

export interface ContainerState {
  panels: Item[]
}

const BoardGrid = () => {
  const [panels, setPanels] = useState([
    {
      id: 0,
      title: 'ad',
    },
    {
      id: 1,
      title: 'player',
    },
    {
      id: 2,
      title: 'dday',
    },
    {
      id: 3,
      title: 'minicalendar',
    },
    {
      id: 4,
      title: 'clock',
    },
    {
      id: 5,
      title: 'todo',
    },
    {
      id: 6,
      title: 'timer',
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
    (panel: { id: number; title: string }, index: number) => {
      return <Panel key={panel.id} index={index} id={panel.id} title={panel.title} movePanel={movePanel} />
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
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  border: 1px solid red;
  box-sizing: border-box;
`
