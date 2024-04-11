import '@emotion/react'

import { themeDefault } from '@/styles/theme'

type ExtendedTheme = typeof themeDefault
declare module '@emotion/react' {
  interface Theme extends ExtendedTheme { }
}
