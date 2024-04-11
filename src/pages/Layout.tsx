import { css, Global, ThemeProvider } from '@emotion/react'
import { Outlet, useLocation } from 'react-router-dom'

import LayoutHeader from '@/components/header/LayoutHeader'
import MainNav from '@/components/MainNav'
import { globalStyles } from '@/styles/globalStyles'
import { themeDefault } from '@/styles/theme'

const Layout = () => {
  const location = useLocation()
  const isSigninPage = location.pathname === '/'

  return (
    <ThemeProvider theme={themeDefault}>
      <Global styles={globalStyles} />
      <div css={container}>
        {isSigninPage ? (
          <Outlet />
        ) : (
          <div css={[container, imageContainer]}>
            <MainNav />
            <div css={innerContainer}>
              <LayoutHeader />
              <Outlet />
            </div>
          </div>
        )}
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

const imageContainer = css`
  background-image: url('/src/assets/background.webp');
`

const innerContainer = css`
  overflow: hidden;
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
`
