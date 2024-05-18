import { Theme } from '@emotion/react'
import { css } from '@emotion/react'
import { IoIosArrowBack } from 'react-icons/io'
import { IoIosArrowForward } from 'react-icons/io'

import { rgba } from '@/utils/convertRGBA'

const CalendarPreview = () => {
  return (
    <div css={container}>
      <div css={topWrap}>
        <IoIosArrowBack />
        <span>월</span>
        <IoIosArrowForward />
      </div>
      <div css={bottomWrap}>
        {Array.from({ length: 42 }, (_, index) => (
          <div css={gridItem} key={index}></div>
        ))}
      </div>
    </div>
  )
}

export default CalendarPreview

const container = css`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
  padding: 4px;
`

const topWrap = (theme: Theme) => css`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 30px;

  color: ${theme.previewText};
`

const bottomWrap = css`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, 1fr);
  gap: 5px;

  width: 100%;
  height: 100%;
`

const gridItem = (theme: Theme) => css`
  background-color: ${rgba(theme.previewSubText, 0.3)};
`
