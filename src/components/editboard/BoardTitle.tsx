import { Theme } from '@emotion/react'
import { css } from '@emotion/react'
import React, { useState } from 'react'

import { Common } from '@/styles/common'

const BoardTitle = () => {
  const [isEdit, setIsEdit] = useState(false)

  const handleClickEdit = () => {
    setIsEdit(true)
  }

  const handleClickCancel = () => {
    setIsEdit(false)
  }

  const handleClickSave = () => {
    setIsEdit(false)
  }

  return (
    <div css={container}>
      <label>대시보드 이름:</label>
      <input type="text" value={'title'} disabled={!isEdit} />
      <div css={buttonWrap}>
        {isEdit ? (
          <>
            <button css={editButton} onClick={handleClickCancel}>
              취소
            </button>
            <button css={editButton} onClick={handleClickSave}>
              저장
            </button>
          </>
        ) : (
          <button css={editButton} onClick={handleClickEdit}>
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
  align-items: baseline;
  justify-content: center;

  width: 100%;
  height: 32px;

  label {
    font-size: ${Common.fontSize.fs10};
    color: ${theme.mainText};
  }

  input {
    width: fit-content;
    font-size: ${Common.fontSize.fs16};
    text-align: center;
  }
`
const buttonWrap = css`
  display: flex;
`
const editButton = (theme: Theme) => css`
  color: ${theme.boderButtonText};
  background-color: transparent;
  border: 1px solid ${theme.boderButtonborder};
  border-radius: 4px;
`
