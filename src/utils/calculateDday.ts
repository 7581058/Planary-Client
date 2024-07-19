//date : yyyy-mm-dd
export const calculateDday = (date: string) => {
  const parsedDate = date.split('-')
  const year = Number(parsedDate[0])
  const month = Number(parsedDate[1]) - 1
  const day = Number(parsedDate[2])
  const targetDate = new Date(year, month, day)

  const today = new Date()

  today.setHours(0, 0, 0, 0)

  const differenceInMillis = targetDate.getTime() - today.getTime()

  const differenceInDays = Math.ceil(differenceInMillis / (1000 * 60 * 60 * 24))

  if (differenceInDays > 0) {
    return `D-${differenceInDays}`
  } else if (differenceInDays < 0) {
    return `D+${-differenceInDays + 1}`
  } else {
    return 'Today'
  }
}
