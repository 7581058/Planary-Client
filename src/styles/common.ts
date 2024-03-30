import { css } from '@emotion/react'
interface Colors {
  colors: {
    [key: string]: string
  }
  fontSize: {
    [key: string]: string
  }
}

export const Common: Colors = {
  colors: {
    primary: '#87C5FB',
    secondary: '#B2D9FB',
    point: '#FBF9C2',
    white: '#F8F8F8',
    black: '#222222',
    gray: '#EDEDED',
    gray02: '#555555',
    red01: '#D60404',
  },
  fontSize: {
    title: '2.4rem',
    fs20: '2rem',
    fs18: '1.8rem',
    fs16: '1.6rem',
    fs14: '1.4rem',
    fs12: '1.2rem',
    fs10: '1rem',
    fs8: '0.875rem',
    fs7: '0.75rem',
  },
}

export const glassPanel = css`
  background-color: rgba(255, 255, 255, 0.25);
  //box-shadow: 0 8px 16px 0 rgba(46, 52, 136, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.18);
`

export const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`
