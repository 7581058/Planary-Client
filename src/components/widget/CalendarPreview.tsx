import { Theme } from '@emotion/react'
import { css } from '@emotion/react'
import { IoIosArrowBack } from 'react-icons/io'
import { IoIosArrowForward } from 'react-icons/io'

import { WidgetProps } from '@/constants/widget'
import { rgba } from '@/utils/convertRGBA'

const CalendarPreview = ({ w, h }: WidgetProps) => {
  const numSquares = 7 * 52

  const isInvalidResizingSize = (type: string, w: number, h: number) => {
    const monthlyInvalidSizes = [
      { w: 1, h: 1 },
      { w: 2, h: 2 },
      { w: 3, h: 2 },
      { w: 3, h: 3 },
      { w: 4, h: 3 },
    ]
    const noneInvalidSizes = [
      { w: 1, h: 3 },
      { w: 1, h: 2 },
      { w: 2, h: 3 },
      { w: 4, h: 2 },
    ]
    const invalidSizes = type === 'monthly' ? monthlyInvalidSizes : noneInvalidSizes
    return invalidSizes.some((size) => size.w === w && size.h === h)
  }

  return (
    <div css={container}>
      {isInvalidResizingSize('monthly', w, h) ? (
        <>
          <div css={topWrap}>
            <IoIosArrowBack />
            <span>0월</span>
            <IoIosArrowForward />
          </div>
          <div css={bottomWrap}>
            {Array.from({ length: 42 }, (_, index) => (
              <div css={gridItem} key={index}></div>
            ))}
          </div>
        </>
      ) : isInvalidResizingSize('none', w, h) ? (
        <></>
      ) : (
        <div css={yearGrid}>
          {Array.from({ length: numSquares }).map((_, index) => (
            <div css={yearGridItem} key={index}></div>
          ))}
        </div>
      )}
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

const yearGrid = () => css`
  overflow: hidden;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20px, 1fr));
  gap: 2px;
`

const yearGridItem = (theme: Theme) => css`
  width: 14px;
  height: 14px;
  background-color: ${theme.previewSubText};
`
