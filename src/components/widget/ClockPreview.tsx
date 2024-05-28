import { Theme } from '@emotion/react'
import { css } from '@emotion/react'

import { WidgetProps } from '@/constants/widget'
import { Common } from '@/styles/common'

const ClockPreview = ({ w, h }: WidgetProps) => {
  return (
    <div css={container}>
      {w === 1 && h === 2 ? (
        <>
          <span css={[time, responsiveTime(w, h)]}>{`0 1\n0 3\n`}</span>
          <span css={daynight}>A M</span>
          <span css={[day, responsiveDay(w, h)]}>4월 24일 수요일</span>
        </>
      ) : (
        <>
          <span css={[day, responsiveDay(w, h)]}>2024-04-24 수</span>
          <span css={[time, responsiveTime(w, h)]}>01:03:43 AM</span>
        </>
      )}
    </div>
  )
}

export default ClockPreview

const container = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
  padding: 10px;
`

const day = (theme: Theme) => css`
  font-size: ${Common.fontSize.fs10};
  color: ${theme.previewPointText};
  white-space: pre-line;
`

const responsiveDay = (w: number, h: number) => css`
  ${w === 0 && h === 0 && `font-size: ${Common.fontSize.fs8};`}
  ${w === 1 && h === 1 && `font-size: ${Common.fontSize.fs8};`}
  ${w === 1 && h === 2 && `font-size: ${Common.fontSize.fs7}; margin-top: 10px;`}
  ${w === 2 && h === 2 && `font-size: ${Common.fontSize.fs14};`}
`

const time = (theme: Theme) => css`
  font-size: ${Common.fontSize.fs18};
  font-weight: 700;
  color: ${theme.previewText};
  white-space: pre-line;
`

const daynight = (theme: Theme) => css`
  font-size: ${Common.fontSize.fs26};
  font-weight: 700;
  color: ${theme.previewText};
`
const responsiveTime = (w: number, h: number) => css`
  ${w === 0 && h === 0 && `font-size: ${Common.fontSize.fs16};`}
  ${w === 1 && h === 1 && `font-size: ${Common.fontSize.fs9};`}
  ${w === 1 && h === 2 && `font-size: ${Common.fontSize.fs30};`}
  ${w === 2 && h === 2 && `font-size: ${Common.fontSize.title};`}
`
