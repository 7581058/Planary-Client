import { css } from '@emotion/react'
import { Theme } from '@emotion/react'
import React, { useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { useBoardListFetch } from '@/hooks/useBoardListFetch'
import { boardListAtom, currentBoardIdAtom } from '@/store/boardState'
interface Option {
  id: number
  title: string
  theme: string
}

const BoardListSelect = () => {
  const setId = useSetRecoilState(currentBoardIdAtom)
  const boardList = useRecoilValue(boardListAtom)
  const { fetchBoardList } = useBoardListFetch()

  const handleChangeValue = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value
    setId(Number(value))
  }

  useEffect(() => {
    fetchBoardList()
  }, [])

  if (boardList.length === 0) return null

  return (
    <select onChange={handleChangeValue} css={selectContainer}>
      {boardList.length > 0 &&
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
  flex-shrink: 0;

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
