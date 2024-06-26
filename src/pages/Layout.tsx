import { css, Global, ThemeProvider } from '@emotion/react'
import { createPortal } from 'react-dom'
import { Outlet, useLocation } from 'react-router-dom'

import CustomAlert from '@/components/alert/CustomAlert'
import LayoutHeader from '@/components/header/LayoutHeader'
import MainNav from '@/components/MainNav'
import ModalBase from '@/components/modal/ModalBase'
import { LAYOUT_HEADER_PATHS } from '@/constants/paths'
import { globalStyles } from '@/styles/globalStyles'
import { themeDefault } from '@/styles/theme'

const Layout = () => {
  const location = useLocation()
  const modalEl = document.getElementById('modal')

  const isLayoutHeaderPath = LAYOUT_HEADER_PATHS.includes(location.pathname)

  return (
    <ThemeProvider theme={themeDefault}>
      <Global styles={globalStyles} />
      <div css={container}>
        {isLayoutHeaderPath ? (
          <div css={navContainer}>
            <MainNav />
            <div css={innerContainer}>
              <LayoutHeader />
              <Outlet />
            </div>
          </div>
        ) : (
          <Outlet />
        )}
        {modalEl && createPortal(<CustomAlert />, modalEl)}
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

const navContainer = css`
  display: flex;
  width: 100%;
  height: 100%;
`
