import { css } from '@emotion/react'
import { Theme } from '@emotion/react'
import { useState } from 'react'
import { BsPersonCircle } from 'react-icons/bs'
import { CgMenuGridO } from 'react-icons/cg'
import { PiPaintBrushHouseholdFill } from 'react-icons/pi'
import { RiLogoutBoxRLine } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import ToggleMenu from '../ToggleMenu'

import { Common } from '@/styles/common'

const HeaderMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const toggleMenu = (state: boolean) => {
    setIsOpen(state)
  }

  const handleItemClick = (event: string) => {
    setIsOpen(false)
    navigate(event)
  }

  return (
    <div css={menuContainer}>
      <div css={menuButton} onClick={() => toggleMenu(!isOpen)}>
        <CgMenuGridO />
      </div>
      <ToggleMenu
        isOpen={isOpen}
        items={HEADER_MENU}
        onItemClick={handleItemClick}
        toggleMenu={toggleMenu}
        position={[48, 0, '', '']}
      />
    </div>
  )
}

export default HeaderMenu

const menuContainer = css`
  display: flex;
`
const menuButton = (theme: Theme) => css`
  font-size: ${Common.fontSize.fs20};
  display: flex;
  align-items: center;
  color: ${theme.buttonText};
  cursor: pointer;
  &:hover {
    color: ${theme.secondary};
  }
`
const HEADER_MENU = [
  {
    event: '/profile',
    title: '내 계정',
    icon: <BsPersonCircle />,
  },
  {
    event: '/theme',
    title: '테마 설정',
    icon: <PiPaintBrushHouseholdFill />,
  },
  {
    event: '/',
    title: '로그아웃',
    icon: <RiLogoutBoxRLine />,
  },
]
