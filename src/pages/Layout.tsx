import { css, Global, ThemeProvider } from '@emotion/react'
import { Outlet } from 'react-router-dom'

import { globalStyles } from '@/styles/globalStyles'
import { themeDefault } from '@/styles/theme'

const Layout = () => {
  return (
    <ThemeProvider theme={themeDefault}>
      <Global styles={globalStyles} />
      <div css={container}>
        <Outlet />
      </div>
    </ThemeProvider>
  )
}

export default Layout

const container = css`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
`
