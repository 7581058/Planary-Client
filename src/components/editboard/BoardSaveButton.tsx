import { css, useTheme } from '@emotion/react'
import { Theme } from '@emotion/react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { editBoard } from '@/api'
import { BOARD_EDIT_SAVE_FAILED, BOARD_EDIT_SAVE_SUCCESS } from '@/constants/alert'
import { useAlert } from '@/hooks/useAlert'
import { boardDirtyFlag, currentBoardIdAtom, editableBoardDataAtom } from '@/store/boardState'

const BoardSaveButton = () => {
  const theme = useTheme()
  const [isDirty, setIsDirty] = useRecoilState(boardDirtyFlag)
  const boards = useRecoilValue(editableBoardDataAtom)
  const { openAlert } = useAlert()
  const boardId = useRecoilValue(currentBoardIdAtom)

  const onSave = async () => {
    try {
      const res = await editBoard(boards, boardId)
      if (res.success) {
        openAlert(BOARD_EDIT_SAVE_SUCCESS)
      }
    } catch (error) {
      openAlert(BOARD_EDIT_SAVE_FAILED)
    }
  }

  const handleClickSave = () => {
    setIsDirty(false)
    onSave()
  }

  return (
    <button css={saveButton(theme, isDirty)} onClick={handleClickSave}>
      저장
    </button>
  )
}

export default BoardSaveButton

const saveButton = (theme: Theme, isDirty: boolean) => css`
  cursor: pointer;

  width: 100%;
  height: 40px;

  color: ${isDirty ? theme.previewSaveActiveButtonText : theme.previewSaveButtonText};

  background-color: ${isDirty ? theme.previewSaveActiveButtonBackground : theme.previewSaveButtonBackground};
  border-radius: 4px;
`
