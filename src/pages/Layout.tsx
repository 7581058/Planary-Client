import { css, Global, ThemeProvider } from '@emotion/react'
import { createPortal } from 'react-dom'
import { Outlet, useLocation } from 'react-router-dom'

import CustomAlert from '@/components/alert/CustomAlert'
import LayoutHeader from '@/components/header/LayoutHeader'
import MainNav from '@/components/MainNav'
import ModalBase from '@/components/modal/ModalBase'
import { DASHBOARD_EDIT_PATH } from '@/constants/paths'
import { globalStyles } from '@/styles/globalStyles'
import { themeDefault } from '@/styles/theme'

const Layout = () => {
  const location = useLocation()
  const isLoginPage = location.pathname === '/'
  const isDashboardEditPage = location.pathname === DASHBOARD_EDIT_PATH
  const modalEl = document.getElementById('modal')
  return (
    <ThemeProvider theme={themeDefault}>
      <Global styles={globalStyles} />
      <div css={container}>
        {isLoginPage || isDashboardEditPage ? (
          <div css={container}>
            <Outlet />
          </div>
        ) : (
          <div css={container}>
            <MainNav />
            <div css={innerContainer}>
              <LayoutHeader />
              <Outlet />
            </div>
          </div>
        )}
        <CustomAlert />
        {modalEl && createPortal(<ModalBase />, modalEl)}
      </div>
    </ThemeProvider>
  )
}

export default Layout

const container = css`
  position: absolute;
  top: 0;
  left: 0;

  display: flex;

  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
`

const innerContainer = css`
  overflow: hidden;
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
`
