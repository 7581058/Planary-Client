import { Theme } from '@emotion/react'
import { css } from '@emotion/react'

import { Common } from '@/styles/common'

const ClockPreview = () => {
  return (
    <div css={container}>
      <span css={day}>2024-04-24 수</span>
      <span css={time}>01:03:43 AM</span>
    </div>
  )
}

export default ClockPreview

const container = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
  padding: 10px;

  background-color: ${theme.previewPanelBackground};
  border-radius: 16px;
`

const day = (theme: Theme) => css`
  font-size: ${Common.fontSize.fs10};
  color: ${theme.previewPointText};
`

const time = (theme: Theme) => css`
  font-size: ${Common.fontSize.fs18};
  font-weight: 700;
  color: ${theme.previewText};
`
