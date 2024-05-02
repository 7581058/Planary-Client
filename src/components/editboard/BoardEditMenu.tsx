import { css, useTheme } from '@emotion/react'
import { Theme } from '@emotion/react'
import { useRecoilState } from 'recoil'
import BoardListSelect from '../board/BoardListSelect'

import { boardDirtyFlag } from '@/store/boardState'

const BoardEditMenu = () => {
  const theme = useTheme()
  const [isDirty, setIsDirty] = useRecoilState(boardDirtyFlag)
  const handleClickSave = () => {
    setIsDirty(false)
  }
  return (
    <div css={container}>
      <BoardListSelect />
      <button css={saveButton(theme, isDirty)} onClick={handleClickSave}>
        저장
      </button>
    </div>
  )
}

export default BoardEditMenu

const container = css`
  display: flex;
  flex-direction: column;
  gap: 10px;

  box-sizing: border-box;
  width: 250px;
  height: 100%;
  padding: 20px;
`

const saveButton = (theme: Theme, isDirty: boolean) => css`
  cursor: pointer;

  width: 100%;
  height: 40px;

  color: ${isDirty ? theme.previewSaveActiveButtonText : theme.previewSaveButtonText};

  background-color: ${isDirty ? theme.previewSaveActiveButtonBackground : theme.previewSaveButtonBackground};
  border-radius: 4px;
`
