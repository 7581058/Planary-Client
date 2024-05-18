import { Theme } from '@emotion/react'
import { css } from '@emotion/react'

const TimerPreview = () => {
  return (
    <div css={container}>
      <div css={timerWrap}>
        <div css={timerBackground}></div>
        <div css={timer}>45:00 START</div>
      </div>
    </div>
  )
}

export default TimerPreview

const container = css`
  width: 100%;
  height: 100%;
`

const timerWrap = css`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
  padding: 5px;
`

const timerBackground = (theme: Theme) => css`
  width: 80%;
  height: 80%;
  background-color: ${theme.previewSubText};
  border-radius: 50%;
`

const timer = (theme: Theme) => css`
  position: absolute;
  top: 50%;
  left: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 80px;
  height: 80px;
  margin-top: -40px;
  margin-left: -40px;

  text-align: center;

  background-color: ${theme.previewSubText2};
  border-radius: 50%;
`
