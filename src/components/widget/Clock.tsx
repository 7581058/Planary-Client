import { css, Theme } from '@emotion/react'
import { useEffect, useState } from 'react'

import { Common } from '@/styles/common'

const Clock = () => {
  const [hours, setHours] = useState('')
  const [minutes, setMinutes] = useState('')
  const [seconds, setSeconds] = useState('')
  const [ampm, setAmPm] = useState('')
  const [date, setDate] = useState('')
  const [currentDate, setCurrentDate] = useState(new Date())

  useEffect(() => {
    const updateTime = () => {
      const date = new Date()
      const currentHours = String(date.getHours() % 12 || 12).padStart(2, '0')
      const currentMinutes = String(date.getMinutes()).padStart(2, '0')
      const currentSeconds = String(date.getSeconds()).padStart(2, '0')
      const currentAmPm = date.getHours() >= 12 ? 'PM' : 'AM'
      setHours(currentHours)
      setMinutes(currentMinutes)
      setSeconds(currentSeconds)
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

  return (
    <div css={clockContainer}>
      <div css={dateWrap}>{date}</div>
      <div css={timeWrap}>
        <div>{hours}</div>
        <span>:</span>
        <div>{minutes}</div>
        <span>:</span>
        <div>{seconds}</div>
        <div>{ampm}</div>
      </div>
    </div>
  )
}

export default Clock

const clockContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
`

const dateWrap = (theme: Theme) => css`
  font-size: ${Common.fontSize.fs16};
  font-weight: 400;
  color: ${theme.dateText};
`

const timeWrap = (theme: Theme) => css`
  display: flex;
  gap: 5px;

  font-size: ${Common.fontSize.fs30};
  font-weight: 700;
  color: ${theme.clockText};

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;

    &:last-child {
      margin-left: 5px;
      font-size: ${Common.fontSize.title};
    }
  }

  span {
    padding-bottom: 10px;
  }
`
