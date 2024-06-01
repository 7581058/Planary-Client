import { css, Theme } from '@emotion/react'
import { useEffect, useState } from 'react'

import { WidgetProps } from '@/constants/widget'
import { Common } from '@/styles/common'

const ClockWidget = ({ w, h, isPreview }: WidgetProps) => {
  const [hours, setHours] = useState(['0', '0'])
  const [minutes, setMinutes] = useState(['0', '0'])
  const [ampm, setAmPm] = useState(['a', 'm'])
  const [date, setDate] = useState(['년', '월', '일', '요일'])
  const [currentDate, setCurrentDate] = useState(new Date())

  useEffect(() => {
    const updateTime = () => {
      const date = new Date()
      const currentHours = String(date.getHours() % 12 || 12).padStart(2, '0')
      const currentMinutes = String(date.getMinutes()).padStart(2, '0')
      const currentAmPm = date.getHours() >= 12 ? 'PM' : 'AM'
      setHours([currentHours[0], currentHours[1]])
      setMinutes([currentMinutes[0], currentMinutes[1]])
      setAmPm([currentAmPm[0], currentAmPm[1]])

      if (date.getHours() === 0 && date.getMinutes() === 0 && date.getSeconds() === 0) {
        setCurrentDate(new Date())
      }
    }

    updateTime()
    const intervalId = setInterval(updateTime, 1000)

    return () => clearInterval(intervalId)
  }, [])

  useEffect(() => {
    const updateDate = () => {
      const year = String(currentDate.getFullYear())
      const month = String(currentDate.getMonth() + 1)
      const day = String(currentDate.getDate())
      const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][currentDate.getDay()]

      setDate([year, month, day, dayOfWeek])
    }

    updateDate()
  }, [currentDate])

  //w:1, h:2 위젯은 시계 세로 출력
  const isSmallWidget = w === 1 && h === 2

  const ampmContent = isPreview ? (
    'AM'
  ) : isSmallWidget ? (
    <div css={digitWrap}>
      <span>{ampm[0]}</span>
      <span>{ampm[1]}</span>
    </div>
  ) : (
    `${ampm[0]}${ampm[1]}`
  )
  const dayContent = isPreview
    ? '2024-01-01 월'
    : isSmallWidget
      ? `${date[1].padStart(1)}월 ${date[2]}일 ${date[3]}요일`
      : `${date[0]}-${date[1].padStart(2, '0')}-${date[2].padStart(2, '0')} ${date[3]}`
  const timeContent = isPreview ? (
    '00:00'
  ) : isSmallWidget ? (
    <>
      <div css={digitWrap}>
        <span>{hours[0]}</span>
        <span>{hours[1]}</span>
      </div>
      <div css={digitWrap}>
        <span>{minutes[0]}</span>
        <span>{minutes[1]}</span>
      </div>
    </>
  ) : (
    `${hours[0]}${hours[1]}:${minutes[0]}${minutes[1]}`
  )

  const timeElement = (
    <div css={[timeWrap, responsiveTimeWrap(w, h)]}>
      <span css={[time, responsiveTime(w, h)]}>{timeContent}</span>
      <span css={[daynight, responsiveDaynight(w, h)]}>{ampmContent}</span>
    </div>
  )

  const dayElement = <span css={[day, responsiveDay(w, h)]}>{dayContent}</span>

  return (
    <div css={container}>
      {isSmallWidget ? (
        <>
          {timeElement}
          {dayElement}
        </>
      ) : (
        <>
          {dayElement}
          {timeElement}
        </>
      )}
    </div>
  )
}

export default ClockWidget

const container = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
  padding: 10px;
`

const timeWrap = css`
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
`

const responsiveTimeWrap = (w: number, h: number) => css`
  ${w === 1 && h === 2 && `flex-direction: column;`}
`

const day = (theme: Theme) => css`
  font-size: ${Common.fontSize.fs12};
  color: ${theme.previewPointText};
  white-space: pre-line;
`

const responsiveDay = (w: number, h: number) => css`
  ${w === 0 && h === 0 && `font-size: ${Common.fontSize.fs8};`}
  ${w === 1 && h === 1 && `font-size: ${Common.fontSize.fs10};`}
  ${w === 1 && h === 2 && `font-size: ${Common.fontSize.fs10}; margin-top: 10px;`}
  ${w === 2 && h === 2 && `font-size: ${Common.fontSize.fs14};`}
`

const time = (theme: Theme) => css`
  display: flex;

  font-size: ${Common.fontSize.fs26};
  font-weight: 700;
  color: ${theme.previewText};
  white-space: pre-line;
`

const responsiveTime = (w: number, h: number) => css`
  ${w === 0 && h === 0 && `font-size: ${Common.fontSize.fs16};`}
  ${w === 1 && h === 1 && `font-size: ${Common.fontSize.fs16};`}
  ${w === 1 && h === 2 && `font-size: ${Common.fontSize.fs35};flex-direction: column;`}
  ${w === 2 && h === 2 && `font-size: ${Common.fontSize.fs40};`}
`

const digitWrap = css`
  display: flex;

  span {
    display: flex;
    justify-content: center;
    width: 50px;
  }
`

const daynight = (theme: Theme) => css`
  font-size: ${Common.fontSize.fs26};
  font-weight: 700;
  color: ${theme.previewText};
`

const responsiveDaynight = (w: number, h: number) => css`
  ${w === 0 && h === 0 && `font-size: ${Common.fontSize.fs14};`}
  ${w === 1 && h === 1 && `font-size: ${Common.fontSize.fs16};`}
  ${w === 1 && h === 2 && `font-size: ${Common.fontSize.fs30};`}
  ${w === 2 && h === 2 && `font-size: ${Common.fontSize.fs40};`}
`
