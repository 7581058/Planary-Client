export const convertDate = (date: string) => {
  const year = date.slice(0, 4)
  const month = date.slice(4, 6)
  const day = date.slice(6, 8)

  const fullDate = new Date(`${year}-${month}-${day}`)
  const dayNames = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']

  const formattedDate = `${year}년 ${parseInt(month, 10)}월 ${parseInt(day, 10)}일 ${dayNames[fullDate.getDay()]}`

  return formattedDate
}
