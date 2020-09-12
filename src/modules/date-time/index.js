export function isPast(testDate) {
  const currentTime = new Date().getTime()
  return testDate.getTime() < currentTime
}

export function getDaysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate()
}

export function getFirstDayOfMonth(month, year) {
  return new Date(year, month, 1).getDay()
}

export function checkIfPastMonth(month, year) {
  const currentDate = new Date()

  return (
    year < currentDate.getFullYear() ||
    (year === currentDate.getFullYear() && month < currentDate.getMonth())
  )
}

export function checkIfCurrentMonth(month, year) {
  const currentDate = new Date()

  return month === currentDate.getMonth() && year === currentDate.getFullYear()
}
