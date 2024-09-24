import { css, Global, ThemeProvider } from '@emotion/react'
import { createPortal } from 'react-dom'
import { Outlet, useLocation } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

import CustomAlert from '@/components/alert/CustomAlert'
import LayoutHeader from '@/components/header/LayoutHeader'
import MainNav from '@/components/MainNav'
import ModalBase from '@/components/modal/ModalBase'
import { LAYOUT_HEADER_PATHS } from '@/constants/paths'
import { themeStyles } from '@/constants/theme'
import { currentThemeAtom } from '@/store/themeState'
import { globalStyles } from '@/styles/globalStyles'

const Layout = () => {
  const location = useLocation()
  const modalEl = document.getElementById('modal')
  const currentTheme = useRecoilValue(currentThemeAtom)

  const isLayoutHeaderPath = LAYOUT_HEADER_PATHS.includes(location.pathname)

  return (
    <ThemeProvider theme={themeStyles[currentTheme].theme}>
      <Global
        styles={(theme) => css`
          ${globalStyles(theme)}
        `}
      />
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
