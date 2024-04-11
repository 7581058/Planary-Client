import { css } from '@emotion/react'
import { Theme } from '@emotion/react'
import HeaderMenu from './HeaderMenu'

import { rgba } from '@/utils/convertRGBA'

const LayoutHeader = () => {
  return (
    <div css={headerContainer}>
      <HeaderMenu />
    </div>
  )
}

export default LayoutHeader

const headerContainer = (theme: Theme) => css`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: end;

  width: 100%;
  height: 48px;
  padding: 10px;

  background-color: ${rgba(theme.background, 0.2)};
`
