import { css } from '@emotion/react'
import { Theme } from '@emotion/react'
import { useLocation } from 'react-router-dom'
import BoardListSelect from '../board/BoardListSelect'
import HeaderMenu from './HeaderMenu'

import { DASHBOARD_PATH } from '@/constants/paths'

const LayoutHeader = () => {
  const location = useLocation()
  const isDashboardPage = location.pathname === DASHBOARD_PATH
  return (
    <div css={headerContainer}>
      {isDashboardPage && <BoardListSelect />}
      <HeaderMenu />
    </div>
  )
}

export default LayoutHeader

const headerContainer = (theme: Theme) => css`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 48px;
  padding: 10px;

  background-color: ${theme.panel};
  border-bottom: 3px solid ${theme.border};
`
