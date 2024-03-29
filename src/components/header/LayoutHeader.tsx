import { css } from '@emotion/react'
import { Theme } from '@emotion/react'
import HeaderMenu from './HeaderMenu'
import HeaderProfile from './HeaderProfile'

import { rgba } from '@/utils/convertRGBA'

const LayoutHeader = () => {
  return (
    <div css={headerContainer}>
      <HeaderProfile />
      <HeaderMenu />
    </div>
  )
}

export default LayoutHeader

const headerContainer = (theme: Theme) => css`
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 10px;
  gap: 10px;
  background-color: ${rgba(theme.button, 0.2)};
`
