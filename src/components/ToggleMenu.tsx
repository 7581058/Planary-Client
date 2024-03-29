import { css, useTheme } from '@emotion/react'
import { Theme } from '@emotion/react'

import { HeaderMenuItem, MenuWrapProps, ToggleMenuProps } from '@/types/common'

const ToggleMenu = ({ items, onItemClick, isOpen, toggleMenu, position }: ToggleMenuProps) => {
  const handleClickItem = (item: string) => {
    onItemClick(item)
    toggleMenu(false)
  }

  const theme = useTheme()
  return (
    <>
      {isOpen && (
        <div css={menuContainer} onClick={() => toggleMenu(false)}>
          <ul css={menuWrap(theme, position)}>
            {items.map((item: HeaderMenuItem, index: number) => (
              <li key={index} onClick={() => handleClickItem(item.event)}>
                <div css={menuIcon}>{item.icon}</div>
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
  width: 100%;
  height: 100%;
  background-color: transparent;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9;
`

const menuWrap = (theme: Theme, props: MenuWrapProps) => css`
  padding: 20px 0 20px 0;
  border-radius: 16px;
  margin: 0;
  background-color: ${theme.background};
  position: absolute;
  box-sizing: border-box;
  top: ${`${props[0]}px`};
  right: ${`${props[1]}px`};
  bottom: ${`${props[2]}px`};
  left: ${`${props[3]}px`};
  li {
    display: flex;
    gap: 10px;
    align-items: center;
    padding: 5px 30px 5px 30px;
    cursor: pointer;
    &:hover {
      background-color: ${theme.secondary};
    }
  }
`

const menuIcon = css`
  display: flex;
  justify-content: center;
  align-items: center;
`
