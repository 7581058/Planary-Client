import { Theme } from '@emotion/react'
import { css } from '@emotion/react'
import { useEffect, useState } from 'react'
import Carousel from '../carousel/Carousel'

import { getDdayList } from '@/api'
import { DDAY_GET_ERROR } from '@/constants/alert'
import { WidgetProps } from '@/constants/widget'
import { useAlert } from '@/hooks/useAlert'
import { Common } from '@/styles/common'

interface DdayItem {
  title: string
  date: string
}

const DdayWidget = ({ w, h, isPreview, isCovered }: WidgetProps) => {
  const [ddayList, setDdayList] = useState([])
  const { openAlert } = useAlert()

  const getList = async () => {
    try {
      const res = await getDdayList()
      if (res) {
        setDdayList(res)
      }
    } catch (error) {
      openAlert(DDAY_GET_ERROR)
    }
  }

  useEffect(() => {
    getList()
  }, [])

  const ddayItems = ddayList.map((item: DdayItem) => {
    return (
      <div css={itemWrap}>
        <div css={[title, responsiveTitle(w, h)]}>{item.title}</div>
        <div css={[day, responsiveDay(w, h)]}>{item.date}</div>
        <div css={[dday, responsiveDday(w, h)]}>D-48</div>
      </div>
    )
  })

  return (
    <div css={[container, responsiveContainer(w, h)]}>
      {ddayList && <Carousel auto={isPreview ? !isPreview : !isCovered} items={ddayItems} />}
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

const itemWrap = css`
  width: 100%;
  height: 100%;
`
