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
    white02: '#edf0f6',
    black: '#000000',
    black02: '#28292E',
    blue01: '#edf0f6',
    blue02: '#7E93FF',
    red01: '#D43B3B',
    gray01: '#F7F8FA',
    gray02: '#C8CCD9',
    gray03: '#9A9BA1',
    gray04: '#F5F7FC',
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
    fs6: '0.6rem',
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
