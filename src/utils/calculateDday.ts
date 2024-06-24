export const calculateDday = (date: string) => {
  const year = Number(date.slice(0, 4))
  const month = Number(date.slice(4, 6)) - 1
  const day = Number(date.slice(6, 8))
  const targetDate = new Date(year, month, day)

  const today = new Date()

  const differenceInMillis = Number(targetDate) - Number(today)

  const differenceInDays = Math.ceil(differenceInMillis / (1000 * 60 * 60 * 24))

  if (differenceInDays > 0) {
    return `D-${differenceInDays}`
  } else if (differenceInDays < 0) {
    return `D+${-differenceInDays + 1}`
  } else {
    return 'Today'
  }
}
