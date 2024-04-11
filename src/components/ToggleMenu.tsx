import { css, useTheme } from '@emotion/react'
import { Theme } from '@emotion/react'

import { HeaderMenuItem, MenuWrapProps, ToggleMenuProps } from '@/types/common'
import { rgba } from '@/utils/convertRGBA'

const ToggleMenu = ({ items, onItemClick, isOpen, toggleMenu, position, radius = 0 }: ToggleMenuProps) => {
  const handleClickItem = (item: string) => {
    onItemClick(item)
    toggleMenu(false)
  }

  const theme = useTheme()

  return (
    <>
      {isOpen && (
        <div css={menuContainer} onClick={() => toggleMenu(false)}>
          <ul css={menuWrap(theme, position, radius)}>
            {items.map((item: HeaderMenuItem, index: number) => (
              <li key={index} onClick={() => handleClickItem(item.event)}>
                {item.icon && <div css={menuIcon}>{item.icon}</div>}
                {item.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}

export default ToggleMenu

const menuContainer = css`
  position: absolute;
  z-index: 9;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background-color: transparent;
`

const menuWrap = (theme: Theme, position: MenuWrapProps, radius: number) => css`
  position: absolute;

  box-sizing: border-box;
  margin: 0;

  background-color: ${theme.menuBackground};
  border-radius: ${radius}px;
  box-shadow: 0 4px 10px 0 rgb(46 52 136 / 10%);

  li {
    cursor: pointer;

    display: flex;
    gap: 5px;
    align-items: center;

    padding: 5px 20px;

    font-weight: 400;
    color: ${theme.menuText};

    &:hover {
      color: ${theme.hoverText};
      background-color: ${rgba(theme.button, 0.03)};
    }
  }
  /* stylelint-disable */
  top: ${`${position[0]}px`};
  right: ${`${position[1]}px`};
  bottom: ${`${position[2]}px`};
  left: ${`${position[3]}px`};
`

const menuIcon = (theme: Theme) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.icon};
`
