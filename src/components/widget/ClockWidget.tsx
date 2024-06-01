import { css, Theme } from '@emotion/react'
import { useEffect, useState } from 'react'

import { WidgetProps } from '@/constants/widget'
import { Common } from '@/styles/common'

const ClockWidget = ({ w, h, isPreview }: WidgetProps) => {
  const [hours, setHours] = useState('')
  const [minutes, setMinutes] = useState('')
  const [ampm, setAmPm] = useState('')
  const [date, setDate] = useState('')
  const [currentDate, setCurrentDate] = useState(new Date())

  useEffect(() => {
    const updateTime = () => {
      const date = new Date()
      const currentHours = String(date.getHours() % 12 || 12).padStart(2, '0')
      const currentMinutes = String(date.getMinutes()).padStart(2, '0')
      const currentAmPm = date.getHours() >= 12 ? 'PM' : 'AM'
      setHours(currentHours)
      setMinutes(currentMinutes)
      setAmPm(currentAmPm)

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
      const year = currentDate.getFullYear()
      const month = String(currentDate.getMonth() + 1).padStart(2, '0')
      const day = String(currentDate.getDate()).padStart(2, '0')
      const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][currentDate.getDay()]

      setDate(`${year}-${month}-${day} ${dayOfWeek}`)
    }

    updateDate()
  }, [currentDate])

  //w:1, h:2 위젯은 시계 세로 출력
  const isSmallWidget = w === 1 && h === 2

  const ampmContent = isPreview ? 'AM' : ampm
  const dayContent = isPreview ? '2000-01-01 수' : date
  const timeContent = isPreview ? '00:00' : isSmallWidget ? `${hours}\n${minutes}\n` : `${hours}:${minutes}`
  return (
    <div css={container}>
      <div css={[timeWrap, responsiveTimeWrap(w, h)]}>
        <span css={[time, responsiveTime(w, h)]}>{timeContent}</span>
        <span css={[daynight, responsiveDaynight(w, h)]}>{ampmContent}</span>
      </div>
      <span css={[day, responsiveDay(w, h)]}>{dayContent}</span>
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
  font-size: ${Common.fontSize.fs10};
  color: ${theme.previewPointText};
  white-space: pre-line;
`

const responsiveDay = (w: number, h: number) => css`
  ${w === 0 && h === 0 && `font-size: ${Common.fontSize.fs8};`}
  ${w === 1 && h === 1 && `font-size: ${Common.fontSize.fs10};`}
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
  font-size: ${Common.fontSize.fs18};
  font-weight: 700;
  color: ${theme.previewText};
`

const responsiveDaynight = (w: number, h: number) => css`
  ${w === 0 && h === 0 && `font-size: ${Common.fontSize.fs14};`}
  ${w === 1 && h === 1 && `font-size: ${Common.fontSize.fs16};`}
  ${w === 1 && h === 2 && `font-size: ${Common.fontSize.fs26};`}
  ${w === 2 && h === 2 && `font-size: ${Common.fontSize.title};`}
`

const responsiveTime = (w: number, h: number) => css`
  ${w === 0 && h === 0 && `font-size: ${Common.fontSize.fs16};`}
  ${w === 1 && h === 1 && `font-size: ${Common.fontSize.fs16};`}
  ${w === 1 && h === 2 && `font-size: ${Common.fontSize.fs30};`}
  ${w === 2 && h === 2 && `font-size: ${Common.fontSize.title};`}
`
