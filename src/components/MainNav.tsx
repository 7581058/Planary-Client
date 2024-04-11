import { Theme } from '@emotion/react'
import { css } from '@emotion/react'
import { FaRegCalendarAlt } from 'react-icons/fa'
import { GrPlan } from 'react-icons/gr'
import { MdOutlineStorefront } from 'react-icons/md'
import { RiDashboardFill } from 'react-icons/ri'
import { SlNotebook } from 'react-icons/sl'
import { NavLink } from 'react-router-dom'

import { Common } from '@/styles/common'
import { rgba } from '@/utils/convertRGBA'

const MainNav = () => {
  return (
    <div css={navContainer}>
      <div css={menuWrap}>
        {NAV_MENU.map((item, index: number) => (
          <NavLink key={index} css={menuItem} to={item.path} className={({ isActive }) => (isActive ? 'active' : '')}>
            <div css={menuIcon}>{item.icon}</div>
          </NavLink>
        ))}
      </div>
    </div>
  )
}

export default MainNav

const navContainer = (theme: Theme) => css`
  display: flex;
  flex-shrink: 0;
  height: 100%;
  background-color: ${rgba(theme.background, 0.5)};
`

const menuWrap = css`
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-top: 50px;
`

const menuItem = (theme: Theme) => css`
  cursor: pointer;

  display: flex;
  align-items: center;

  width: 100%;
  height: 32px;
  padding: 0 30px;

  font-size: ${Common.fontSize.fs16};
  color: ${theme.text};

  &:hover {
    scale: 1.05;
  }

  &.active {
    color: ${theme.button};
  }
`

const menuIcon = css`
  display: flex;
  align-items: center;
  justify-content: center;
`

const NAV_MENU = [
  {
    path: '/board',
    title: '대시보드',
    icon: <RiDashboardFill />,
  },
  {
    path: '/calendar',
    title: '캘린더',
    icon: <FaRegCalendarAlt />,
  },
  {
    path: '/planner',
    title: '플래너',
    icon: <GrPlan />,
  },
  {
    path: '/note',
    title: '노트',
    icon: <SlNotebook />,
  },
  {
    path: '/store',
    title: '스토어',
    icon: <MdOutlineStorefront />,
  },
]
