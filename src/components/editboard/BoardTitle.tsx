import { Theme } from '@emotion/react'
import { css } from '@emotion/react'
import React, { useEffect, useMemo, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { editBoardDetails } from '@/api'
import { DASHBOARD_TITLE_UPDATE_FAIL_ALERT, DASHBOARD_TITLE_UPDATE_SUCCESS_ALERT } from '@/constants/alert'
import { useAlert } from '@/hooks/useAlert'
import { boardListAtom, currentBoardIdAtom } from '@/store/boardState'
import { Common } from '@/styles/common'

const BoardTitle = () => {
  const [title, setTitle] = useState('')
  const [originalTitle, setOriginalTitle] = useState('')
  const [isEdit, setIsEdit] = useState(false)
  const [boardListData, setBoardListData] = useRecoilState(boardListAtom)
  const currentBoardId = useRecoilValue(currentBoardIdAtom)
  const { openAlert } = useAlert()

  const currentBoard = useMemo(
    () => boardListData.find((board) => board.id === currentBoardId),
    [currentBoardId, boardListData],
  )

  useEffect(() => {
    if (currentBoard) {
      setTitle(currentBoard.title)
      setOriginalTitle(currentBoard.title)
    }
  }, [currentBoard])

  const handleClickEdit = async () => {
    setIsEdit(true)
  }

  const handleClickCancel = () => {
    setIsEdit(false)
    setTitle(originalTitle)
  }

  const handleClickSave = async () => {
    try {
      const res = await editBoardDetails({ title: title }, Number(currentBoardId))
      if (res) {
        setBoardListData((prev) =>
          prev.map((board) => (board.id === currentBoardId ? { ...board, title: title } : board)),
        )

        setIsEdit(false)
        setOriginalTitle('')
        openAlert(DASHBOARD_TITLE_UPDATE_SUCCESS_ALERT)
      }
    } catch (error) {
      openAlert(DASHBOARD_TITLE_UPDATE_FAIL_ALERT)
    }
  }

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  return (
    <div css={container}>
      <label>대시보드 이름:</label>
      <input type="text" value={title} disabled={!isEdit} onChange={handleChangeInput} />
      <div css={buttonWrap}>
        {isEdit ? (
          <>
            <button css={editButton} onClick={handleClickCancel}>
              취소
            </button>
            <button css={[editButton, primaryButton]} onClick={handleClickSave}>
              저장
            </button>
          </>
        ) : (
          <button css={[editButton, primaryButton]} onClick={handleClickEdit}>
            수정
          </button>
        )}
      </div>
    </div>
  )
}

export default BoardTitle

const container = (theme: Theme) => css`
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 32px;

  label {
    font-size: ${Common.fontSize.fs10};
    color: ${theme.mainText};
  }

  input {
    width: fit-content;
    font-size: ${Common.fontSize.fs12};
    text-align: center;
  }
`
const buttonWrap = css`
  display: flex;
  gap: 5px;
`
const editButton = (theme: Theme) => css`
  cursor: pointer;

  color: ${theme.borderButtonGrayText};

  background-color: transparent;
  border: 1px solid ${theme.borderButtonGray};
  border-radius: 4px;
`

const primaryButton = (theme: Theme) => css`
  color: ${theme.borderButtonborder};
  background-color: transparent;
  border: 1px solid ${theme.borderButtonText};
`
