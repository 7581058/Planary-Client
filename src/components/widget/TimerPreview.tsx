import { Theme } from '@emotion/react'
import { css } from '@emotion/react'
import { SlArrowDown } from 'react-icons/sl'

import { WidgetProps } from '@/constants/widget'
import { Common } from '@/styles/common'

const TimerPreview = ({ w, h }: WidgetProps) => {
  return (
    <div css={container}>
      {(w === 2 && h === 1) || (w === 0 && h === 0) ? (
        <>
          <div css={stopWatch}>00:00:00</div>
          <div css={buttonWrap}>
            <div css={startButton}>시작</div>
            <div css={saveButton}>저장</div>
          </div>
        </>
      ) : (
        <>
          <div css={selectWrap}>
            <span css={selectValue}>뽀모도로 45분/15분</span>
            <div css={downArrow}>
              <SlArrowDown />
            </div>
          </div>
          <div css={[timerWrap, responsiveTimerWrap(w, h)]}>
            <div css={[timerBackground, responsiveTimerBackground(w, h)]}></div>
            <div css={[timer, responsiveTimer(w, h)]}>{`45:00\n START`}</div>
          </div>
        </>
      )}
    </div>
  )
}

export default TimerPreview

const container = css`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
`
const selectWrap = (theme: Theme) => css`
  display: flex;
  justify-content: space-between;

  box-sizing: border-box;
  width: 80%;

  font-size: ${Common.fontSize.fs8};

  border: 2px solid ${theme.previewPanelBorder};
`

const selectValue = css`
  overflow: hidden;
  padding: 4px;
  text-overflow: elipsis;
  white-space: nowrap;
`

const downArrow = (theme: Theme) => css`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100%;
  padding: 2px;

  font-size: ${Common.fontSize.fs8};

  border-left: 2px solid ${theme.previewPanelBorder};
`

const timerWrap = css`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 5px;
`

const responsiveTimerWrap = (w: number, h: number) => css`
  ${w === 1 && h === 2 && `height: fit-content;margin-top: 10px;`}
`

const timerBackground = (theme: Theme) => css`
  width: 200px;
  height: 200px;
  background-color: ${theme.previewSubText};
  border-radius: 50%;
`

const responsiveTimerBackground = (w: number, h: number) => css`
  ${w === 1 && h === 1 && `width: 80px;height: 80px;`}
  ${w === 1 && h === 2 && `width: 110px;height: 110px;`}
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
  white-space: pre-wrap;

  background-color: ${theme.previewSubText2};
  border-radius: 50%;
`

const responsiveTimer = (w: number, h: number) => css`
  ${w === 1 &&
  h === 1 &&
  `width: 60px;height: 60px;margin-top: -30px;
  margin-left: -30px;font-size:${Common.fontSize.fs8}`}
`

const buttonWrap = css`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`

const startButton = (theme: Theme) => css`
  padding: 5px 10px;
  color: ${theme.buttonText};
  background-color: ${theme.previewPointText};
  border-radius: 8px;
`

const saveButton = (theme: Theme) => css`
  padding: 5px 10px;
  color: ${theme.previewText};
  background-color: ${theme.previewSubText};
  border-radius: 8px;
`

const stopWatch = (theme: Theme) => css`
  font-size: ${Common.fontSize.title};
  color: ${theme.previewText};
`
