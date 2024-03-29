export type MenuWrapProps = [number | string, number | string, number | string, number | string]

export interface HeaderMenuItem {
  event: string
  title: string
  icon: JSX.Element
}

export interface ToggleMenuProps {
  items: HeaderMenuItem[]
  onItemClick: (item: string) => void
  isOpen: boolean
  toggleMenu: (state: boolean) => void
  position: MenuWrapProps
}
