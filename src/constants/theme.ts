import { Theme } from '@emotion/react'

import { Common } from '@/styles/common'
import { themePink } from '@/styles/pinkTheme'
import { themeDefault } from '@/styles/theme'

interface themeStylesType {
  name: string
  theme: Theme
  color: string
}
export const themeStyles: { [key: number]: themeStylesType } = {
  0: { name: 'default', theme: themeDefault, color: Common.colors.blue02 },
  1: { name: 'pink', theme: themePink, color: Common.colors.pink01 },
}
