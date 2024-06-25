import { css, Global, ThemeProvider } from '@emotion/react'
import { createPortal } from 'react-dom'
import { Outlet, useLocation } from 'react-router-dom'

import CustomAlert from '@/components/alert/CustomAlert'
import LayoutHeader from '@/components/header/LayoutHeader'
import PageHeader from '@/components/header/PageHeader'
import MainNav from '@/components/MainNav'
import ModalBase from '@/components/modal/ModalBase'
import { LAYOUT_HEADER_PATHS, PAGE_HEADER_PATHS } from '@/constants/paths'
import { globalStyles } from '@/styles/globalStyles'
import { themeDefault } from '@/styles/theme'

const Layout = () => {
  const location = useLocation()
  const isPageHeaderPath = PAGE_HEADER_PATHS.find((item) => item.path === location.pathname)
  const isLayoutHeaderPath = LAYOUT_HEADER_PATHS.includes(location.pathname)

  const modalEl = document.getElementById('modal')
  return (
    <ThemeProvider theme={themeDefault}>
      <Global styles={globalStyles} />
      <div css={container}>
        {isPageHeaderPath ? (
          <div css={innerContainer}>
            <PageHeader title={isPageHeaderPath.title} />
            <Outlet />
          </div>
        ) : isLayoutHeaderPath ? (
          <div css={container}>
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
