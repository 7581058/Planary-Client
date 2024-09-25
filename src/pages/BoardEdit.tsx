import { css } from '@emotion/react'
import React, { useEffect } from 'react'
import { useRecoilValue } from 'recoil'

import BoardEditMenu from '@/components/editboard/BoardEditMenu'
import BoardPreview from '@/components/editboard/BoardPreview'
import WidgetList from '@/components/editboard/WidgetList'
import PageHeader from '@/components/header/PageHeader'
import { boardDirtyFlag, themeDirtyFlag } from '@/store/boardState'

const BoardEdit = () => {
  const boardIsDirty = useRecoilValue(boardDirtyFlag)
  const themeIsDirty = useRecoilValue(themeDirtyFlag)
  useEffect(() => {
    const handleWindowClose = (e: BeforeUnloadEvent) => {
      if (!boardIsDirty && !themeIsDirty) return

      e.preventDefault()
    }

    window.addEventListener('beforeunload', handleWindowClose)

    return () => {
      window.removeEventListener('beforeunload', handleWindowClose)
    }
  }, [boardIsDirty, themeIsDirty])

  return (
    <div css={pageContainer}>
      <PageHeader title="대시보드 편집" />
      <React.Suspense fallback={<></>}>
        <div css={innerContainer}>
          <WidgetList />
          <BoardPreview />
          <BoardEditMenu />
        </div>
      </React.Suspense>
    </div>
  )
}

export default BoardEdit

const pageContainer = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

const innerContainer = css`
  display: flex;
  width: 100%;
  height: calc(100% - 48px);
`
