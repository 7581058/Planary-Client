import { css } from '@emotion/react'
import BoardList from './BoardList'
import BoardSaveButton from './BoardSaveButton'
import BoardThemeMenu from './BoardThemeMenu'

const BoardEditMenu = () => {
  return (
    <div css={container}>
      <BoardSaveButton />
      <BoardList />
      <BoardThemeMenu />
    </div>
  )
}

export default BoardEditMenu

const container = css`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  gap: 10px;

  box-sizing: border-box;
  width: 200px;
  height: 100%;
  padding: 20px;
  padding-left: 0;
`
