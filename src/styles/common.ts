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
    white: '#ffffff',
    white02: '#F9F9F9',
    black: '#000000',
    black02: '#181718',
    blue01: '#A7DFFF',
    blue02: '#55C2FF',
    blue03: '#3C64B1',
    pink01: '#FFEBEC',
    purple01: '#F8E7FF',
    purple02: '#E2DCFB',
    purple03: '#CE52FF',
    red01: '#D43B3B',
    gray01: '#F8F8F8',
    gray02: '#F2F2F2',
    gray03: '#8a8a8a',
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
