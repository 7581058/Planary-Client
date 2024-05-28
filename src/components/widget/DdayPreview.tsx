import { Theme } from '@emotion/react'
import { css } from '@emotion/react'

import { WidgetProps } from '@/constants/widget'
import { Common } from '@/styles/common'

const DdayPreview = ({ w, h }: WidgetProps) => {
  return (
    <div css={[container, responsiveContainer(w, h)]}>
      <span css={[title, responsiveTitle(w, h)]}>디데이</span>
      <span css={[day, responsiveDay(w, h)]}>2024.05.18(토)</span>
      <span css={[dday, responsiveDday(w, h)]}>D-48</span>
      <div css={pagenation}>
        <div css={dot}></div>
        <div css={dot}></div>
        <div css={dot}></div>
      </div>
    </div>
  )
}

export default DdayPreview

const container = css`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 4px;
`

const responsiveContainer = (w: number, h: number) => css`
  ${w === 0 && h === 0 && `padding-top: 30px;`}
`

const title = (theme: Theme) => css`
  width: 100%;
  font-size: ${Common.fontSize.fs10};
  color: ${theme.previewPointText};
  text-align: center;
`

const responsiveTitle = (w: number, h: number) => css`
  ${w === 2 && h === 2 && `font-size: ${Common.fontSize.fs12};`}
`

const dday = (theme: Theme) => css`
  width: 100%;

  font-size: ${Common.fontSize.title};
  font-weight: 700;
  color: ${theme.previewText};
  text-align: center;
`

const responsiveDday = (w: number, h: number) => css`
  ${w === 2 && h === 2 && `font-size: ${Common.fontSize.fs30};`}
`

const day = (theme: Theme) => css`
  width: 100%;
  margin-top: 5px;

  font-size: ${Common.fontSize.fs6};
  color: ${theme.previewText};
  text-align: center;
`

const responsiveDay = (w: number, h: number) => css`
  ${w === 2 && h === 2 && `font-size: ${Common.fontSize.fs10};`}
`

const pagenation = css`
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: center;

  width: 100%;
  margin-top: 20px;
`

const dot = (theme: Theme) => css`
  width: 6px;
  height: 6px;
  background-color: ${theme.previewSubText};
  border-radius: 50%;

  &:first-of-type {
    background-color: ${theme.previewText};
  }
`
