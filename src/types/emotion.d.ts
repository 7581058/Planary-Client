import '@emotion/react'

declare module '@emotion/react' {
  export interface Theme {
    background: string
    text: string
    button: string
    buttonText: string
    errorRed: string
    secondary: string
    gray: string
    darkGray: string
    point: string
  }
}
