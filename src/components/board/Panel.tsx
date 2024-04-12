import { css, useTheme } from '@emotion/react'
import { Theme } from '@emotion/react'
import type { Identifier } from 'dnd-core'
import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'

export interface PanelProps {
  id: number
  title: string
  index: number
  row: number
  col: number
  movePanel: (dragIndex: number, hoverIndex: number) => void
  component: JSX.Element
}

interface DragItem {
  index: number
  id: string
  type: string
}

const Panel = ({ id, title, index, row, col, movePanel, component }: PanelProps) => {
  const theme = useTheme()
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
    <div ref={ref} css={panelContainer(isDragging, row, col, theme)}>
      <div css={panelWrap}>
        <div css={widget} data-handler-id={handlerId}>
          {component}
        </div>
      </div>
    </div>
  )
}

export default Panel

const panelContainer = (isDragging: boolean, row: number, col: number, theme: Theme) => css`
  position: relative;

  grid-column: span ${col};
  grid-row: span ${row};

  box-sizing: border-box;

  opacity: ${isDragging ? 0 : 1};
  background-color: ${theme.panel};
  border: 5px solid ${theme.border};
  border-radius: 16px;
`

const panelWrap = css`
  width: 100%;
  height: 100%;
`

const widget = css`
  overflow: hidden;

  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 5px;

  border-radius: 16px;
`
