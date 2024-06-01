import { Theme } from '@emotion/react'
import { css } from '@emotion/react'
import { IoIosArrowBack } from 'react-icons/io'
import { IoIosArrowForward } from 'react-icons/io'

import { WidgetProps } from '@/constants/widget'
import { Common } from '@/styles/common'
import { rgba } from '@/utils/convertRGBA'

const CalendarWidget = ({ w, h }: WidgetProps) => {
  const numSquares = 7 * 52
  const getMonthAbbreviations = (locale = 'en-US') => {
    const formatter = new Intl.DateTimeFormat(locale, { month: 'short' })
    return Array.from({ length: 12 }, (_, i) => formatter.format(new Date(0, i)))
  }

  const months = getMonthAbbreviations()

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
    <div css={[container, responsiveContainer(w, h)]}>
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
        <div css={gridWrap}>
          <div css={month}>
            {months.map((month, index) => (
              <div key={index}>{month}</div>
            ))}
          </div>
          <div css={yearGrid}>
            {Array.from({ length: numSquares }).map((_, index) => (
              <div css={yearGridItem} key={index}></div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default CalendarWidget

const container = css`
  overflow: hidden;
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
`

const responsiveContainer = (w: number, h: number) => css`
  ${w === 0 && h === 0 && `padding: 5px;`}
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

const gridWrap = css`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  justify-content: center;

  width: 100%;
  height: 100%;
`

const gridItem = (theme: Theme) => css`
  background-color: ${rgba(theme.previewSubText, 0.3)};
`

const yearGrid = () => css`
  overflow: hidden;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12px, 1fr));
  grid-template-rows: repeat(7, 1fr);
  gap: 2px;

  width: 100%;
  height: 96px;
`

const yearGridItem = (theme: Theme) => css`
  width: 12px;
  height: 12px;
  background-color: ${theme.previewSubText};
`

const month = css`
  overflow: hidden;
  display: flex;
  flex-shrink: 0;
  gap: 50px;

  margin-bottom: 5px;
  padding-left: calc(14 * 2px);

  font-size: ${Common.fontSize.fs7};
`
