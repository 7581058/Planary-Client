import { LuTrash2 } from 'react-icons/lu'
import { useRecoilState, useSetRecoilState } from 'recoil'

import { deleteDashboard } from '@/api'
import {
  DASHBOARD_DELETE_COMFIRM_ALERT,
  DASHBOARD_DELETE_FAIL_ALERT,
  DASHBOARD_DELETE_SUCCESS_ALERT,
} from '@/constants/alert'
import { useAlert } from '@/hooks/useAlert'
import { boardListAtom, currentBoardIdAtom } from '@/store/boardState'

interface BoardDeleteButtonProps {
  listId: number
}

const BoardDeleteButton = ({ listId }: BoardDeleteButtonProps) => {
  const { openAlert } = useAlert()
  const [boardListData, setBoardList] = useRecoilState(boardListAtom)
  const setCurrentBoardId = useSetRecoilState(currentBoardIdAtom)

  const deleteBoard = async (listId: number) => {
    try {
      const res = await deleteDashboard(listId)
      if (res) {
        openAlert(DASHBOARD_DELETE_SUCCESS_ALERT)
        setBoardList((prevList) => prevList.filter((board) => board.id !== listId))

        setCurrentBoardId((prevBoardId) => {
          const newBoardList = boardListData.filter((board) => board.id !== listId)
          if (prevBoardId === listId && newBoardList.length > 0) {
            return newBoardList[0].id
          }
          return prevBoardId
        })
      }
    } catch (error) {
      openAlert(DASHBOARD_DELETE_FAIL_ALERT)
    }
  }

  const handleClickDelete = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, listId: number) => {
    e.stopPropagation()
    openAlert({ ...DASHBOARD_DELETE_COMFIRM_ALERT, buttonTitle: '삭제', callback: () => deleteBoard(listId) })
  }

  return (
    <div onClick={(e) => handleClickDelete(e, listId)}>
      <LuTrash2 />
    </div>
  )
}

export default BoardDeleteButton
