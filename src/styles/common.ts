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
    black: '#181718',
    black02: '#28292E',
    blue01: '#edf0f6',
    blue02: '#7E93FF',
    blue03: '#2197ff',
    red01: '#e30000',
    gray01: '#F7F8FA',
    gray02: '#C8CCD9',
    gray03: '#9A9BA1',
    gray04: '#F5F7FC',
    gray05: '#f4f4f4',
    green01: '#02d147',
    yellow01: '#fcc203',
    pink01: '#ffc9c9',
  },
  fontSize: {
    fs40: '4rem',
    fs35: '3.5rem',
    fs30: '3rem',
    fs26: '2.6rem',
    title: '2.4rem',
    fs20: '2rem',
    fs18: '1.8rem',
    fs16: '1.6rem',
    fs14: '1.4rem',
    fs12: '1.2rem',
    fs10: '1rem',
    fs9: '0.9375rem',
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

export const noDrag = css`
  user-select: none; /* 나머지 브라우저 */
  -webkit-user-select: none; /* 사파리 */
  -moz-user-select: none; /* 파이어폭스 */
  -ms-user-select: none; /* 익스플로러,엣지 */
`
