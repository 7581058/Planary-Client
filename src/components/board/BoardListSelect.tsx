import { css } from '@emotion/react'
import { Theme } from '@emotion/react'
import React from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { currentBoardId, currentBoardListQuery } from '@/store/boardState'

interface Option {
  index: number
  title: string
}

const BoardListSelect = () => {
  const setId = useSetRecoilState(currentBoardId)
  const { boards } = useRecoilValue(currentBoardListQuery)

  const handleChangeValue = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value
    setId(Number(value))
  }

  return (
    <select onChange={handleChangeValue} css={selectContainer}>
      {boards &&
        boards.map((option: Option, index: number) => (
          <option key={index} value={option.index}>
            {option.title}
          </option>
        ))}
    </select>
  )
}

export default BoardListSelect

const selectContainer = (theme: Theme) => css`
  color: ${theme.selectText};
  background-color: ${theme.selectBackground};
  border: 2px solid ${theme.selectBorder};
  border-radius: 4px;

  &:active,
  &:focus {
    outline: none;
  }

  option {
    background-color: ${theme.selectOptionBackground};
  }
`
