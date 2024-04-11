import { Theme } from '@emotion/react'
import { css } from '@emotion/react'
import { FaRegCalendarAlt } from 'react-icons/fa'
import { GrPlan } from 'react-icons/gr'
import { MdOutlineStorefront } from 'react-icons/md'
import { MdOutlineSpaceDashboard } from 'react-icons/md'
import { SlNotebook } from 'react-icons/sl'
import { NavLink } from 'react-router-dom'

import { Common } from '@/styles/common'

const MainNav = () => {
  return (
    <div css={navContainer}>
      <div css={menuWrap}>
        <div css={logoWrap}>
          <img src="/src/assets/favicon.svg" alt="planary" />
          <div css={logoText}>
            <p css={title}>Planary</p>
            <p css={sub}>Organize Life</p>
          </div>
        </div>
        {NAV_MENU.map((item, index: number) => (
          <NavLink key={index} css={menuItem} to={item.path} className={({ isActive }) => (isActive ? 'active' : '')}>
            <div css={menuIcon}>{item.icon}</div>
            {item.title}
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

  background-color: ${theme.navBackground};
  border-right: 3px solid ${theme.border};
`

const menuWrap = css`
  display: flex;
  flex-direction: column;
  gap: 10px;

  width: 100%;
  padding: 0 20px;
`

const logoWrap = (theme: Theme) => css`
  display: flex;
  gap: 5px;

  width: 100%;
  margin-bottom: 20px;
  padding-top: 30px;
  padding-bottom: 30px;

  border-bottom: 3px solid ${theme.border};

  img {
    width: 32px;
    height: 32px;
  }
`

const logoText = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const title = css`
  margin: 0;
  font-size: ${Common.fontSize.fs10};
  font-weight: 700;
`

const sub = (theme: Theme) => css`
  margin: 0;
  font-size: ${Common.fontSize.fs7};
  color: ${theme.subText};
`

const menuItem = (theme: Theme) => css`
  cursor: pointer;

  display: flex;
  gap: 10px;
  align-items: center;

  box-sizing: border-box;
  width: 100%;
  padding: 10px;

  font-size: ${Common.fontSize.fs8};
  font-weight: 700;
  color: ${theme.navText};

  border-radius: 4px;

  &:hover {
    scale: 1.05;
  }

  &.active {
    color: ${theme.navActiveText};
    background-color: ${theme.navActiveBackground};

    div {
      color: ${theme.iconActive};
    }
  }
`

const menuIcon = (theme: Theme) => css`
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: ${Common.fontSize.fs12};
  color: ${theme.icon};
`

const NAV_MENU = [
  {
    path: '/board',
    title: 'Dashboard',
    icon: <MdOutlineSpaceDashboard />,
  },
  {
    path: '/calendar',
    title: 'Calendar',
    icon: <FaRegCalendarAlt />,
  },
  {
    path: '/planner',
    title: 'Planner',
    icon: <GrPlan />,
  },
  {
    path: '/note',
    title: 'Note',
    icon: <SlNotebook />,
  },
  {
    path: '/store',
    title: 'Store',
    icon: <MdOutlineStorefront />,
  },
]
