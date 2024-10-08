/* eslint-disable prettier/prettier */
import { Theme } from '@emotion/react'
import { css } from '@emotion/react'
import { useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import Carousel from '../carousel/Carousel'

import { DDAY_ICONS } from '@/constants/icons'
import { WidgetProps } from '@/constants/widget'
import { currentDdayQuery, currentDdayWidgetId } from '@/store/ddayState'
import { Common } from '@/styles/common'
import { calculateDday } from '@/utils/calculateDday'
import { convertDate } from '@/utils/convertDate'

interface DdayItem {
  icon: number
  title: string
  date: string
}

const DdayWidget = ({ w, h, isPreview, isCovered, widgetId }: WidgetProps) => {
  const setDdayWidgetId = useSetRecoilState(currentDdayWidgetId)
  const ddayData = useRecoilValue(currentDdayQuery)

  useEffect(() => {
    if (widgetId) {
      setDdayWidgetId(widgetId)
    }
  }, [widgetId, setDdayWidgetId])

  const ddayItems =
    ddayData.ddayList.length > 0
      ? ddayData.ddayList.map((item: DdayItem) => (
          <div css={itemWrap} key={item.date}>
            <div css={[title, responsiveTitle(w, h)]}>
              {DDAY_ICONS[item.icon]}
              {item.title}
            </div>
            <div css={[day, responsiveDay(w, h)]}>{convertDate(item.date, 'kor')}</div>
            <div css={[dday, responsiveDday(w, h)]}>{calculateDday(item.date)}</div>
          </div>
        ))
      : [
          <div css={[noData]} key="noData">
            등록된 디데이가 없습니다.
          </div>,
        ]

  const previewDdayItems = (
    <div css={itemWrap}>
      <div css={[title, responsiveTitle(w, h)]}>{DDAY_ICONS[0]}Title</div>
      <div css={[day, responsiveDay(w, h)]}>{convertDate('2024-01-01', 'kor')}</div>
      <div css={[dday, responsiveDday(w, h)]}>{calculateDday('2024-01-01')}</div>
    </div>
  )

  return (
    <div css={[container, responsiveContainer(w, h)]}>
      {isPreview ? (
        previewDdayItems
      ) : (
        <Carousel
          auto={isPreview ? !isPreview : Number(ddayData.isAuto) === 0 ? false : true}
          items={ddayItems}
          control={isPreview ? !isPreview : !isCovered}
        />
      )}
    </div>
  )
}

export default DdayWidget

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
  /*   ${w === 0 && h === 0 && `padding-top: 30px;`}
 */
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

  font-size: ${Common.fontSize.fs7};
  color: ${theme.previewText};
  text-align: center;
`

const responsiveDay = (w: number, h: number) => css`
  ${w === 2 && h === 2 && `font-size: ${Common.fontSize.fs10};`}
`

const itemWrap = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
`

const noData = (theme: Theme) => css`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  color: ${theme.previewSubText};
`
