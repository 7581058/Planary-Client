export const convertDate = (date: string, type: string) => {
  let formattedDate
  const parsedDate = date.split('-')
  const year = parsedDate[0]
  const month = String(Number(parsedDate[1]))
  const day = parsedDate[2]

  const fullDate = new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`)
  const dayNames = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']

  switch (type) {
    case 'dot': {
      formattedDate = `${year}.${month.padStart(2, '0')}.${day.padStart(2, '0')}(${dayNames[fullDate.getDay()].slice(0, 1)})`
      break
    }
    case 'kor': {
      formattedDate = `${year}년 ${parseInt(month, 10)}월 ${parseInt(day, 10)}일 ${dayNames[fullDate.getDay()]}`
      break
    }
    case 'dash': {
      formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')} ${dayNames[fullDate.getDay()]}`
      break
    }
    default: {
      formattedDate = ''
      break
    }
  }

  return formattedDate
}
