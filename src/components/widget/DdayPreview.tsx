import { Theme } from '@emotion/react'
import { css } from '@emotion/react'

import { Common } from '@/styles/common'

const DdayPreview = () => {
  return (
    <div css={container}>
      <span css={title}>시험</span>
      <span css={day}>2024.05.18(토)</span>
      <span css={dday}>D-48</span>
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
`

const title = (theme: Theme) => css`
  width: 100%;
  font-size: ${Common.fontSize.fs10};
  color: ${theme.previewPointText};
  text-align: center;
`

const dday = (theme: Theme) => css`
  width: 100%;

  font-size: ${Common.fontSize.title};
  font-weight: 700;
  color: ${theme.previewText};
  text-align: center;
`

const day = (theme: Theme) => css`
  width: 100%;
  margin-top: 5px;

  font-size: ${Common.fontSize.fs6};
  color: ${theme.previewText};
  text-align: center;
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

  &:first-child {
    background-color: ${theme.previewText};
  }
`
