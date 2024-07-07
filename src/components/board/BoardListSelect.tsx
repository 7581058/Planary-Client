import { css } from '@emotion/react'
import { Theme } from '@emotion/react'
import React, { useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { currentBoardId, currentBoardListQuery } from '@/store/boardState'

interface Option {
  id: number
  title: string
  theme: string
}

const BoardListSelect = () => {
  const setId = useSetRecoilState(currentBoardId)
  const { boardList } = useRecoilValue(currentBoardListQuery)

  const handleChangeValue = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value
    setId(Number(value))
  }

  useEffect(() => {
    if (boardList.length > 0) {
      setId(boardList[0].id)
    }
  }, [boardList, setId])

  return (
    <select onChange={handleChangeValue} css={selectContainer}>
      {boardList &&
        boardList.map((option: Option, index: number) => (
          <option key={index} value={option.id}>
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
