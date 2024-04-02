import { css } from '@emotion/react'
import type { Identifier } from 'dnd-core'
import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { TbArrowsMove } from 'react-icons/tb'

import { Common } from '@/styles/common'

export interface PanelProps {
  id: number
  title: string
  index: number
  row: number
  col: number
  movePanel: (dragIndex: number, hoverIndex: number) => void
}

interface DragItem {
  index: number
  id: string
  type: string
}

const Panel = ({ id, title, index, row, col, movePanel }: PanelProps) => {
  const ref = useRef<HTMLDivElement>(null)

  //드래그
  const [{ isDragging }, drag] = useDrag({
    type: 'panel',
    item: () => {
      return { id, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  //드롭
  const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
    accept: 'panel',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },

    hover(item: DragItem) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) {
        return
      }

      movePanel(dragIndex, hoverIndex)

      item.index = hoverIndex
    },
  })

  drag(drop(ref))
  return (
    <div ref={ref} css={panelContainer(isDragging, row, col)}>
      <div css={panelWrap}>
        <div>
          <TbArrowsMove />
        </div>
        <div data-handler-id={handlerId}>{title}</div>
      </div>
    </div>
  )
}

export default Panel

const panelContainer = (isDragging: boolean, row: number, col: number) => css`
  background-color: ${Common.colors.white};
  border: 1px solid blue;
  opacity: ${isDragging ? 0 : 1};
  position: relative;
  grid-column: span ${col};
  grid-row: span ${row};
`

const panelWrap = css`
  width: 100%;
  height: 100%;
`
