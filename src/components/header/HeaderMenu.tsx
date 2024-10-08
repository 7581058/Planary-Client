import { css } from '@emotion/react'
import { Theme } from '@emotion/react'
import { useState } from 'react'
import { IoMenu } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import ToggleMenu from '../ToggleMenu'

import { DASHBOARD_EDIT_PATH, LOGIN_PATH } from '@/constants/paths'
import { Common } from '@/styles/common'

const HeaderMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const toggleMenu = (state: boolean) => {
    setIsOpen(state)
  }

  const handleItemClick = (event: string) => {
    setIsOpen(false)
    if (event === LOGIN_PATH) {
      localStorage.removeItem('accessToken')
    }
    navigate(event)
  }

  return (
    <div css={menuContainer}>
      <div css={menuButton} onClick={() => toggleMenu(!isOpen)}>
        <IoMenu />
      </div>
      <ToggleMenu
        isOpen={isOpen}
        items={HEADER_MENU}
        onItemClick={handleItemClick}
        toggleMenu={toggleMenu}
        position={[48, 15, '', '']}
      />
    </div>
  )
}

export default HeaderMenu

const menuContainer = css`
  display: flex;
`
const menuButton = (theme: Theme) => css`
  cursor: pointer;

  display: flex;
  align-items: center;

  font-size: ${Common.fontSize.fs20};
  color: ${theme.menuButton};

  &:hover {
    scale: 1.05;
  }
`
const HEADER_MENU = [
  {
    event: '/profile',
    title: 'My',
  },
  {
    event: DASHBOARD_EDIT_PATH,
    title: 'Board Settings',
  },
  {
    event: LOGIN_PATH,
    title: 'Logout',
  },
]
