import { css } from '@emotion/react'
import { useRecoilValue } from 'recoil'

import Panel from '@/components/board/Panel'
import { currentBoardQuery } from '@/store/boardState'
export interface Item {
  row: number
  col: number
  component: string
}

export interface ContainerState {
  panels: Item[]
}

const BoardGrid = () => {
  const { boards } = useRecoilValue(currentBoardQuery)

  return (
    <div css={boardWrap}>
      {boards &&
        boards.grid.map((item: Item, index: number) => (
          <Panel key={index} row={item.row} col={item.col} component={item.component}></Panel>
        ))}
    </div>
  )
}

export default BoardGrid

const boardWrap = css`
  overflow: hidden;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(6, 1fr);
  gap: 15px;

  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 0 40px 40px;
`
