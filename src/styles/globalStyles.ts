import { css, Theme } from '@emotion/react'

export const globalStyles = (theme: Theme) => css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  a {
    text-decoration: none;
    color: ${theme.text};
  }
  ul {
    list-style: none;
    padding: 0;
  }
  html,
  body {
    background-color: ${theme.background};
    color: ${theme.text};
  }
`
