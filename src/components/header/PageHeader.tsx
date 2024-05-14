import { css } from '@emotion/react'
import { Theme } from '@emotion/react'
import { FaAngleLeft } from 'react-icons/fa6'
import { NavLink } from 'react-router-dom'

import { Common } from '@/styles/common'

interface PageHeaderProps {
  title?: string
}

const PageHeader = ({ title }: PageHeaderProps) => {
  return (
    <div css={headerContainer}>
      <NavLink to="#" onClick={() => window.history.back()} css={prevButton}>
        <FaAngleLeft />
      </NavLink>
      {title && <span css={titleWrap}>{title}</span>}
    </div>
  )
}

export default PageHeader

const headerContainer = (theme: Theme) => css`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 48px;

  background-color: ${theme.headerBackground};
  border-bottom: 3px solid ${theme.border};
`

const prevButton = (theme: Theme) => css`
  position: absolute;
  top: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 48px;
  height: 48px;

  font-size: ${Common.fontSize.fs16};
  color: ${theme.headerButtons};
`

const titleWrap = css`
  width: 100%;
  font-size: ${Common.fontSize.fs10};
  font-weight: 700;
  text-align: center;
`
