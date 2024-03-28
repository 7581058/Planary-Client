import { css } from '@emotion/react'
import { Theme } from '@emotion/react'
import { CgMenuGridO } from 'react-icons/cg'

import { Common } from '@/styles/common'
const HeaderMenu = () => {
  return (
    <div css={menuWrap}>
      <CgMenuGridO />
    </div>
  )
}

export default HeaderMenu

const menuWrap = (theme: Theme) => css`
  font-size: ${Common.fontSize.fs20};
  display: flex;
  align-items: center;
  color: ${theme.buttonText};
  cursor: pointer;
  &:hover {
    color: ${theme.secondary};
  }
`
