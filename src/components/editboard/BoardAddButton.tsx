import { css } from '@emotion/react'
import { Theme } from '@emotion/react'
import DashboardAdd from '../modal/DashboardAdd'

import { useModal } from '@/hooks/useModal'
import { Common } from '@/styles/common'

const BoardAddButton = () => {
  const { openModal } = useModal()

  const handleClickAdd = () => {
    openModal(<DashboardAdd />, true)
  }

  return (
    <button css={addButton} onClick={handleClickAdd}>
      +
    </button>
  )
}

export default BoardAddButton

const addButton = (theme: Theme) => css`
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 20px;
  height: 20px;

  font-size: ${Common.fontSize.fs16};
  color: ${theme.button};

  background-color: transparent;
`
