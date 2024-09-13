import { css, useTheme } from '@emotion/react'
import { Theme } from '@emotion/react'
import { useEffect } from 'react'
import { FaArrowDownLong, FaArrowUp } from 'react-icons/fa6'
import { useRecoilState, useRecoilValue } from 'recoil'
import BoardAddButton from './BoardAddButton'
import BoardDeleteButton from './BoardDeleteButton'

import { useBoardListFetch } from '@/hooks/useBoardListFetch'
import { boardListAtom, currentBoardIdAtom } from '@/store/boardState'

const BoardList = () => {
  const [currentBoardId, setCurrentBoardId] = useRecoilState(currentBoardIdAtom)
  const { fetchBoardList } = useBoardListFetch()
  const boardListData = useRecoilValue(boardListAtom)
  const theme = useTheme()

  useEffect(() => {
    fetchBoardList()
  }, [])

  const isCurrentBoard = (atom: number | null, itemId: number) => {
    if (atom === itemId) return true
  }

  const handleClickItem = (boardId: number) => {
    setCurrentBoardId(boardId)
  }

  return (
    <div css={container}>
      <div css={leftWrap}>
        <div css={topWrap}>
          <span>대시보드 목록</span>
          <BoardAddButton />
        </div>
        <div css={listWrap}>
          {boardListData.map((item, index) => (
            <div
              key={index}
              onClick={() => handleClickItem(item.id)}
              css={listItem(theme, isCurrentBoard(currentBoardId, item.id))}
            >
              <div>{item.title}</div>
              <BoardDeleteButton listId={item.id} />
            </div>
          ))}
        </div>
      </div>
      <div css={buttonWrap}>
        <button css={moveButton}>
          <FaArrowUp />
        </button>
        <button css={moveButton}>
          <FaArrowDownLong />
        </button>
      </div>
    </div>
  )
}

export default BoardList

const container = css`
  display: flex;
  gap: 5px;
  width: 100%;
  height: 150px;
`
const topWrap = css`
  display: flex;
  justify-content: space-between;
`

const leftWrap = css`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const listWrap = (theme: Theme) => css`
  overflow-y: auto;

  width: 100%;
  height: 100%;

  background-color: ${theme.lightBackground};
  border: 2px solid ${theme.border};
`

const listItem = (theme: Theme, isCurrentBoard: boolean | undefined) => css`
  cursor: pointer;

  display: flex;
  justify-content: space-between;

  width: 100%;
  padding: 4px;
  ${isCurrentBoard && `background-color: ${theme.mainBackground}; color: ${theme.buttonText}`}
`

const buttonWrap = css`
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;

  height: 100%;
`

const moveButton = (theme: Theme) => css`
  width: 24px;
  height: 24px;

  color: ${theme.subButtonText};

  background-color: ${theme.lightButton};
  border-radius: 6px;
`
