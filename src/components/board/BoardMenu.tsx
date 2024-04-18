import { css } from '@emotion/react'
import { Theme } from '@emotion/react'
import { FaRegEdit } from 'react-icons/fa'
import BoardListSelect from './BoardListSelect'

import { Common } from '@/styles/common'

const BoardMenu = () => {
  return (
    <div css={menuContainer}>
      <BoardListSelect />
      <button css={editButton}>
        <FaRegEdit />
      </button>
    </div>
  )
}

export default BoardMenu

const menuContainer = css`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: end;

  width: 100%;
  height: 32px;
  padding-right: 32px;
`

const editButton = (theme: Theme) => css`
  cursor: pointer;

  width: 32px;
  height: 100%;

  font-size: ${Common.fontSize.fs14};
  color: ${theme.button};
`
