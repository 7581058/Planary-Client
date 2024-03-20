import { css, Theme } from '@emotion/react'

export const globalStyles = (theme: Theme) => css`
  @font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  }
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
    font-family: 'Pretendard-Regular';
  }
  button,
  input {
    border: none;
    outline: none;
    font-family: 'Pretendard-Regular';
  }
`
