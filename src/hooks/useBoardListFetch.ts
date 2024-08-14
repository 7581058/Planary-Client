import { useSetRecoilState } from 'recoil'
import { useAlert } from './useAlert'

import { getBoardList } from '@/api'
import { DASHBOARD_GET_ERROR } from '@/constants/alert'
import { boardListState, currentBoardId } from '@/store/boardState'

export const useBoardListFetch = () => {
  const setBoardList = useSetRecoilState(boardListState)
  const setBoardId = useSetRecoilState(currentBoardId)
  const { openAlert } = useAlert()

  const fetchBoardList = async () => {
    try {
      const res = await getBoardList()
      if (res) {
        setBoardList(res.boardList)
        setBoardId(res.boardList[0].id)
      }
    } catch (error) {
      openAlert(DASHBOARD_GET_ERROR)
    }
  }

  return { fetchBoardList }
}
