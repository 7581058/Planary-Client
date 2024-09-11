import { css, Theme } from '@emotion/react'
import React, { useState } from 'react'
import { useRecoilValue } from 'recoil'
import ModalCloseButton from './buttons/ModalCloseButton'

import { addDashboard } from '@/api'
import { DASHBOARD_ADD_FAILED_ALERT } from '@/constants/alert'
import { useAlert } from '@/hooks/useAlert'
import { useBoardListFetch } from '@/hooks/useBoardListFetch'
import { useModal } from '@/hooks/useModal'
import { currentUserQuery } from '@/store/userState'
import { Common } from '@/styles/common'

const DashboardAdd = () => {
  const [boardTitle, setBoardTitle] = useState('')
  const { openAlert } = useAlert()
  const { fetchBoardList } = useBoardListFetch()
  const { closeModal } = useModal()
  const currentUserData = useRecoilValue(currentUserQuery)

  const handleClickAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    const body = {
      title: boardTitle,
      theme: 'default',
      userId: currentUserData.userId,
    }

    try {
      const res = await addDashboard(body)
      if (res) {
        fetchBoardList()
        setBoardTitle('')
        closeModal()
      }
    } catch (error) {
      openAlert(DASHBOARD_ADD_FAILED_ALERT)
    }
  }

  return (
    <div css={container}>
      <span css={title}>새 대시보드 추가</span>
      <form onSubmit={handleClickAdd}>
        <span css={subTitle}>대시보드 이름</span>
        <input
          css={titleInput}
          autoFocus={true}
          onChange={(e) => setBoardTitle(e.target.value)}
          type="text"
          value={boardTitle}
        />
      </form>
      <div css={buttonWrap}>
        <ModalCloseButton isAbsolute={false} />
        <button css={addButton} onClick={handleClickAdd}>
          추가
        </button>
      </div>
    </div>
  )
}

export default DashboardAdd

const container = css`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const title = css`
  width: 100%;
  font-size: ${Common.fontSize.fs12};
  font-weight: 700;
  text-align: left;
`

const subTitle = (theme: Theme) => css`
  width: 100%;
  font-size: ${Common.fontSize.fs8};
  color: ${theme.previewText};
`

const titleInput = (theme: Theme) => css`
  width: 100%;
  height: 40px;
  border: 2px solid ${theme.border};
`

const buttonWrap = css`
  display: flex;
  gap: 10px;
  justify-content: end;
`

const addButton = (theme: Theme) => css`
  width: 50px;
  height: 30px;

  font-size: ${Common.fontSize.fs9};
  color: ${theme.buttonText};

  background-color: ${theme.button};
  border-radius: 8px;
`
